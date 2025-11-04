import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question, a suggestion, or want to partner with us, please get in touch.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-gray-800 p-8 rounded-lg">
                        <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-200">Full Name</label>
                                <input type="text" id="contact-name" className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-200">Email Address</label>
                                <input type="email" id="contact-email" className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
                            </div>
                             <div>
                                <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-200">Subject</label>
                                <input type="text" id="contact-subject" className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-200">Message</label>
                                <textarea id="contact-message" rows={5} className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-light-green transition text-lg">
                                    Submit
                                </button>
                            </div>
                        </form>
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
                            <p className="text-gray-300">123 Conservation Way<br/>Kololo, Kampala<br/>Uganda</p>
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