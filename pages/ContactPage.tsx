import React, { useState, FormEvent } from 'react';
import { GoogleGenAI } from "@google/genai";
import { sendNotificationEmail } from '../services/dataService';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [geminiResponse, setGeminiResponse] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const key = id.replace('contact-', '');
        setFormData(prev => ({...prev, [key]: value}));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmissionStatus('submitting');
        setGeminiResponse('');
        setErrorMessage('');
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const prompt = `You are a helpful and friendly customer service assistant for Greenvours Organisation, an eco-tourism and conservation group based in Uganda. A user has submitted a contact form. Please write a helpful and encouraging response to them.

            User's Name: ${formData.name}
            User's Email: ${formData.email}
            Subject: ${formData.subject}
            Message:
            ---
            ${formData.message}
            ---

            Based on their message, provide a direct and helpful answer or guide them on next steps. If it's a simple thank you, be warm and appreciative. If it's a question, answer it if possible using your knowledge of conservation and Ugandan tourism, or state that a specialist will get back to them soon via their provided email. Keep the tone positive and aligned with Greenvours' mission of conservation and community support. Sign off warmly from "The Greenvours Team".`;
            
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
            });

            setGeminiResponse(response.text);
            setSubmissionStatus('success');

            // Send notification email
            const subject = `New Contact Form Message: "${formData.subject}"`;
            const htmlBody = `
                <h1>New Message from Website Contact Form</h1>
                <p>You have received a new message from ${formData.name}.</p>
                <h2>Details:</h2>
                <ul>
                    <li><strong>Name:</strong> ${formData.name}</li>
                    <li><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></li>
                    <li><strong>Subject:</strong> ${formData.subject}</li>
                </ul>
                <h2>Message:</h2>
                <p style="white-space: pre-wrap; background-color: #f0f0f0; border-left: 3px solid #1a4731; padding: 15px; border-radius: 5px; color: #333;">${formData.message}</p>
            `;
            await sendNotificationEmail({ subject, htmlBody });

        } catch (error) {
            console.error("Gemini API error:", error);
            setErrorMessage("Sorry, we couldn't process your request at the moment. Please try again later or contact us directly at info@greenvours.org.");
            setSubmissionStatus('error');
        }
    };

    const handleResetForm = () => {
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
        setSubmissionStatus('idle');
        setGeminiResponse('');
        setErrorMessage('');
    }

    const renderSubmissionStatus = () => {
        switch (submissionStatus) {
            case 'success':
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-accent mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h2 className="text-2xl font-bold text-white mb-4">Message Received!</h2>
                        <p className="text-gray-300 mb-6">Thank you for reaching out. Here is an immediate response from our AI assistant:</p>
                        <div className="bg-gray-700 p-4 rounded-lg w-full text-left mb-6 whitespace-pre-wrap">
                            <p className="text-gray-200">{geminiResponse}</p>
                        </div>
                        <button
                            onClick={handleResetForm}
                            className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-light-green transition text-lg"
                        >
                            Send Another Message
                        </button>
                    </div>
                );
            case 'error':
                 return (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h2 className="text-2xl font-bold text-white mb-4">An Error Occurred</h2>
                        <p className="text-gray-300 mb-6">{errorMessage}</p>
                        <button
                            onClick={handleResetForm}
                            className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-light-green transition text-lg"
                        >
                            Try Again
                        </button>
                    </div>
                );
            default:
                return (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-200">Full Name</label>
                                <input type="text" id="contact-name" value={formData.name} onChange={handleChange} required className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-200">Email Address</label>
                                <input type="email" id="contact-email" value={formData.email} onChange={handleChange} required className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
                            </div>
                            <div>
                                <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-200">Subject</label>
                                <input type="text" id="contact-subject" value={formData.subject} onChange={handleChange} required className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-200">Message</label>
                                <textarea id="contact-message" rows={5} value={formData.message} onChange={handleChange} required className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent"></textarea>
                            </div>
                            <div>
                                <button 
                                    type="submit" 
                                    disabled={submissionStatus === 'submitting'}
                                    className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-light-green transition text-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
                                >
                                    {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </>
                );
        }
    }


    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question, a suggestion, or want to partner with us, please get in touch.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-gray-800 p-8 rounded-lg">
                       {renderSubmissionStatus()}
                    </div>

                    <div className="space-y-8">
                         <div>
                            <h3 className="text-xl font-bold text-white mb-2">Booking Inquiries</h3>
                            <p className="text-gray-300">For questions about our tours or to request a custom trip:</p>
                            <a href="mailto:bookings@greenvours.org" className="text-brand-accent font-semibold hover:text-yellow-300">bookings@greenvours.org</a>
                        </div>
                         <div>
                            <h3 className="text-xl font-bold text-white mb-2">General Inquiries</h3>
                            <p className="text-gray-300">For all other questions:</p>
                             <a href="mailto:info@greenvours.org" className="text-brand-accent font-semibold hover:text-yellow-300">info@greenvours.org</a>
                        </div>
                         <div>
                            <h3 className="text-xl font-bold text-white mb-2">Our Address</h3>
                            <p className="text-gray-300">HM Plaza <br/>Kawempe, Kampala<br/>Uganda</p>
                        </div>
                        <div>
                             <img src="https://picsum.photos/seed/ugmap/600/300" alt="Map" className="rounded-lg shadow-md w-full h-48 object-cover"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactPage;