import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import Stripe from 'stripe'; // Import Stripe
import { db } from './firebase'; // Assuming db is exported from firebase.ts
import { COLLECTIONS } from '../services/dataService';
import { addDoc, collection } from 'firebase/firestore';

admin.initializeApp();

const emailUser = functions.config().email?.user;
const emailPass = functions.config().email?.password;
const emailRecipient = functions.config().email?.recipient;

console.log("Email User:", emailUser ? "Loaded" : "Not Loaded");
console.log("Email Recipient:", emailRecipient ? "Loaded" : "Not Loaded");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

interface EmailData {
    subject: string;
    htmlBody: string;
}

export const sendNotificationEmail = functions.https.onCall(
  async (data: EmailData, context) => {
    console.log("Received email request:", data.subject);
    const { subject, htmlBody } = data;

    if (!emailUser || !emailPass || !emailRecipient) {
        console.error("Email configuration is missing.");
        throw new functions.https.HttpsError(
            "internal",
            "The server is not configured to send emails. Please contact an administrator."
        );
    }

    const mailOptions = {
      from: emailUser,
      to: emailRecipient,
      subject: subject,
      html: htmlBody,
    };

    try {
      console.log("Attempting to send email...");
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully.");
      return { success: true };
    } catch (error) {
      console.error("Error sending email:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to send email.",
        error
      );
    }
  }
);

const stripe = new Stripe(functions.config().stripe?.secret_key as string, {
    apiVersion: '2024-06-20', // Use your Stripe API version
});

interface CheckoutSessionData {
  amount: number; // in smallest currency unit (e.g., cents for USD)
  currency: string;
  productName: string;
  successUrl: string;
  cancelUrl: string;
}

export const createStripeCheckoutSession = functions.https.onCall(
  {
    cors: [
      "https://3000-firebase-greenvours-org-1762330613925.cluster-64pjnskmlbaxowh5lzq6i7v4ra.cloudworkstations.dev",
      "http://localhost:3000" // For local development
    ]
  },
  async (data: CheckoutSessionData, context) => {
    // Check if the user is authenticated (optional, but recommended for donations)
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'The function must be called while authenticated.'
      );
    }

    const { amount, currency, productName, successUrl, cancelUrl } = data;

    if (!amount || !currency || !productName || !successUrl || !cancelUrl) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required parameters: amount, currency, productName, successUrl, cancelUrl.'
      );
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency,
              product_data: {
                name: productName,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        // Optional: Include customer email for prefilling checkout
        customer_email: context.auth.token.email,
        metadata: {
            userId: context.auth.uid,
            productName: productName,
        }
      });

      return { sessionId: session.id };

    } catch (error: any) {
      console.error('Error creating Stripe checkout session:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Unable to create checkout session.',
        error.message
      );
    }
  }
);

export const stripeWebhook = functions.https.onRequest(async (request, response) => {
    const stripe = new Stripe(functions.config().stripe?.secret_key as string, {
        apiVersion: '2024-06-20',
    });

    const sig = request.headers['stripe-signature'];
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(request.rawBody, sig!, functions.config().stripe?.webhook_secret as string);
    } catch (err: any) {
        console.error('Webhook signature verification failed.', err.message);
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            console.log('Checkout session completed:', session.id);

            // Store payment information in Firestore
            try {
                await addDoc(collection(db, COLLECTIONS.PAYMENTS), {
                    sessionId: session.id,
                    userId: session.metadata?.userId || null,
                    amount: session.amount_total,
                    currency: session.currency,
                    productName: session.metadata?.productName || 'Donation',
                    status: 'completed',
                    timestamp: admin.firestore.FieldValue.serverTimestamp(),
                });
                console.log('Payment record saved to Firestore.');
            } catch (firestoreError) {
                console.error('Error saving payment record to Firestore:', firestoreError);
                // Consider logging this error to a monitoring system
            }
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    response.status(200).send();
});
