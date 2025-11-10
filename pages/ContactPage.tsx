import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { COLLECTIONS } from '../services/dataService';
import ContactForm from '../components/ContactForm';

interface ContactInfo {
  bookingEmail: string;
  generalEmail: string;
  address: string;
  imageUrl: string;
}

const ContactPage: React.FC = () => {
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const docRef = doc(db, COLLECTIONS.CONTACT_INFO, 'main');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Fetched contact info:", docSnap.data());
                    setContactInfo(docSnap.data() as ContactInfo);
                } else {
                    // Default values if no document exists
                    setContactInfo({
                        bookingEmail: 'bookings@greenvours.org',
                        generalEmail: 'info@greenvours.org',
                        address: 'HM Plaza <br/>Kawempe, Kampala<br/>Uganda',
                        imageUrl: 'https://picsum.photos/seed/ugmap/600/300',
                    });
                }
            } catch (err) {
                console.error("Error fetching contact info:", err);
                // Fallback to default values on error
                setContactInfo({
                    bookingEmail: 'bookings@greenvours.org',
                    generalEmail: 'info@greenvours.org',
                    address: 'HM Plaza <br/>Kawempe, Kampala<br/>Uganda',
                    imageUrl: 'https://picsum.photos/seed/ugmap/600/300',
                });
            }
        };
        fetchContactInfo();
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question, a suggestion, or want to partner with us, please get in touch.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-gray-800 p-8 rounded-lg">
                       <ContactForm />
                    </div>

                    {contactInfo && (
                        <div className="space-y-8">
                             <div>
                                <h3 className="text-xl font-bold text-white mb-2">Booking Inquiries</h3>
                                <p className="text-gray-300">For questions about our tours or to request a custom trip:</p>
                                <a href={`mailto:${contactInfo.bookingEmail}`} className="text-brand-accent font-semibold hover:text-yellow-300">{contactInfo.bookingEmail}</a>
                            </div>
                             <div>
                                <h3 className="text-xl font-bold text-white mb-2">General Inquiries</h3>
                                <p className="text-gray-300">For all other questions:</p>
                                 <a href={`mailto:${contactInfo.generalEmail}`} className="text-brand-accent font-semibold hover:text-yellow-300">{contactInfo.generalEmail}</a>
                            </div>
                             <div>
                                <h3 className="text-xl font-bold text-white mb-2">Our Address</h3>
                                <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: contactInfo.address }}></p>
                            </div>
                            <div>
                                 <img src={contactInfo.imageUrl} alt="Map" className="rounded-lg shadow-md w-full h-48 object-cover"/>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ContactPage;
