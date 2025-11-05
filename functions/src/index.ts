import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import { HttpsError, onCall, CallableRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions";

setGlobalOptions({ maxInstances: 10 });

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail app password
  },
});

interface NotificationPayload {
  itemType: string;
  item: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  action: "added" | "updated";
}

const generateNotificationEmailContent = (
  itemType: string,
  item: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  action: "added" | "updated",
) => {
  let subject = "";
  let htmlBody = `<p>Dear Greenvours Member,</p><p>This is an automated notification from Greenvours.</p>`;

  switch (itemType) {
    case "NEWS":
      subject = `New Blog Post ${
        action === "added" ? "Published" : "Updated"
      }: ${item.title}`;
      htmlBody += `<p>Our blog has a new ${
        action === "added" ? "post" : "update"
      }! Check out: <strong>${item.title}</strong></p>
                   <p>Summary: ${item.excerpt}</p>
                   <p>Read more: <a href="[LINK_TO_BLOG_POST]">View Post</a></p>`;
      break;
    case "EDUCATION_PROGRAMS":
      subject = `New Education Program ${
        action === "added" ? "Launched" : "Updated"
      }: ${item.title}`;
      htmlBody += `<p>We've ${
        action === "added" ? "launched a new" : "updated an existing"
      } education program: <strong>${item.title}</strong></p>
                   <p>Description: ${item.description}</p>
                   <p>Learn more: <a href="[LINK_TO_PROGRAM]">View Program</a></p>`;
      break;
    case "TOURS":
      subject = `New Eco-Tour ${action === "added" ? "Available" : "Updated"}: ${item.title}`;
      htmlBody += `<p>Discover our ${action === "added" ? "new" : "updated"} eco-tour: <strong>${item.title}</strong></p>
                   <p>Region: ${item.region}</p>
                   <p>Find out more: <a href="[LINK_TO_TOUR]">View Tour</a></p>`;
      break;
    case "PROJECTS":
      subject = `New Conservation Project ${
        action === "added" ? "Started" : "Updated"
      }: ${item.name}`;
      htmlBody += `<p>A new conservation project has ${
        action === "added" ? "started" : "been updated"
      }: <strong>${item.name}</strong></p>
                   <p>Location: ${item.location}</p>
                   <p>Details: <a href="[LINK_TO_PROJECT]">View Project</a></p>`;
      break;
    default:
      return null;
  }
  htmlBody += `<p>Thank you for your continued support.</p><p>Sincerely,<br>The Greenvours Team</p>`;
  return { subject, htmlBody };
};

export const sendNotification = onCall(async (request: CallableRequest<NotificationPayload>) => {
  // Ensure the request is authenticated (optional, but recommended for admin actions)
  if (!request.auth) {
    throw new HttpsError(
      "unauthenticated",
      "The function must be called while authenticated.",
    );
  }

  const { itemType, item, action } = request.data;

  const notificationContent = generateNotificationEmailContent(itemType, item, action);

  if (!notificationContent) {
    console.log(`No notification content generated for itemType: ${itemType}`);
    return { success: true, message: "No notification sent for this item type." };
  }

  const { subject, htmlBody } = notificationContent;

  try {
    // Get all subscribers from Firestore
    const subscribersSnapshot = await admin.firestore().collection("subscribers").get();
    const subscriberEmails = subscribersSnapshot.docs.map((doc) => doc.data().email);

    if (subscriberEmails.length === 0) {
      console.log("No subscribers found.");
      return { success: true, message: "No subscribers found, no emails sent." };
    }

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: subscriberEmails.join(","), // List of receivers
      subject: subject,
      html: htmlBody,
    };

    await transporter.sendMail(mailOptions);
    console.log("Notification emails sent successfully to:", subscriberEmails);
    return { success: true, message: "Notification emails sent." };
  } catch (error) {
    console.error("Error sending notification email:", error);
    throw new HttpsError(
      "internal",
      "Unable to send notification email.",
      error,
    );
  }
});
