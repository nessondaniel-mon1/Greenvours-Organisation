import React, { useState } from 'react';
import { sendNotificationEmail } from '../services/dataService';

type Tab = 'donate' | 'volunteer' | 'partner';

const DonateForm: React.FC = () => {
    const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
    const [showPaymentMethods, setShowPaymentMethods] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

    const amounts = ['50000', '100000', '250000', '500000'];
    const currentAmount = selectedAmount || customAmount;
    const isAmountSelected = !!currentAmount && parseFloat(currentAmount) > 0;

    const handleAmountClick = (amount: string) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setCustomAmount(value);
        setSelectedAmount(null);
    };
    
    const handleProceed = () => {
        if (isAmountSelected) {
            setShowPaymentMethods(true);
        }
    };

    const handlePayment = async (method: 'Mobile Money' | 'Card') => {
        if (!currentAmount) return;
        setPaymentStatus('processing');
        try {
            const subject = `New Donation: UGX ${parseFloat(currentAmount).toLocaleString()}`;
            const htmlBody = `
                <h1>🎉 New Donation Received!</h1>
                <p>Details of the donation:</p>
                <ul>
                    <li><strong>Amount:</strong> UGX ${parseFloat(currentAmount).toLocaleString()}</li>
                    <li><strong>Frequency:</strong> ${frequency}</li>
                    <li><strong>Payment Method:</strong> ${method}</li>
                </ul>
                <p>Please verify the transaction in the payment processor's dashboard.</p>
            `;
            await sendNotificationEmail({ subject, htmlBody });
            setPaymentStatus('success');
        } catch (error) {
            console.error('Failed to send donation notification:', error);
            alert('There was a problem processing your donation. Please try again.');
            setPaymentStatus('idle');
        }
    };

    if (paymentStatus === 'success') {
        return (
            <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-accent mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h2 className="text-2xl font-bold text-white mb-4">Thank You For Your Generosity!</h2>
                <p className="text-gray-300 mb-6">Your donation of UGX {parseFloat(currentAmount!).toLocaleString()} has been received. You are making a real difference.</p>
                <button
                    onClick={() => {
                        setShowPaymentMethods(false);
                        setPaymentStatus('idle');
                        setSelectedAmount(null);
                        setCustomAmount('');
                    }}
                    className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-light-green transition text-lg"
                >
                    Make Another Donation
                </button>
            </div>
        );
    }

    if (showPaymentMethods) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">Complete Your Donation</h3>
                    <button onClick={() => setShowPaymentMethods(false)} className="text-sm text-gray-400 hover:text-white">&larr; Back</button>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <p className="text-gray-300">You are donating</p>
                    <p className="text-3xl font-bold text-brand-accent my-1">
                        UGX {parseFloat(currentAmount!).toLocaleString()}
                    </p>
                    <p className="text-gray-300 capitalize">{frequency.replace('-', ' ')}</p>
                </div>

                <div>
                    <label className="block text-lg font-semibold text-gray-200 mb-3">Choose Payment Method</label>
                    <div className="space-y-4">
                        <button 
                            onClick={() => handlePayment('Mobile Money')}
                            disabled={paymentStatus === 'processing'}
                            className="w-full flex items-center justify-center p-4 border border-gray-600 rounded-lg text-center font-bold text-lg text-white hover:bg-brand-light-green hover:border-brand-light-green transition disabled:opacity-50 disabled:cursor-wait">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            {paymentStatus === 'processing' ? 'Processing...' : 'Mobile Money'}
                        </button>
                         <button 
                            onClick={() => handlePayment('Card')}
                            disabled={paymentStatus === 'processing'}
                            className="w-full flex items-center justify-center p-4 border border-gray-600 rounded-lg text-center font-bold text-lg text-white hover:bg-brand-light-green hover:border-brand-light-green transition disabled:opacity-50 disabled:cursor-wait">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H4a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                            {paymentStatus === 'processing' ? 'Processing...' : 'Credit / Debit Card'}
                        </button>
                    </div>
                </div>
                <p className="text-xs text-center text-gray-400">Secure payments processed by our partners.</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">Choose Amount</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {amounts.map(amount => {
                        const isSelected = selectedAmount === amount;
                        return (
                             <button 
                                key={amount} 
                                onClick={() => handleAmountClick(amount)}
                                className={`p-4 border rounded-lg text-center font-bold text-lg transition ${
                                    isSelected 
                                        ? 'bg-brand-accent border-brand-accent text-brand-green' 
                                        : 'border-gray-600 text-white hover:bg-gray-700'
                                }`}
                            >
                                UGX {parseInt(amount).toLocaleString()}
                            </button>
                        )
                    })}
                </div>
            </div>
            <div>
                <label htmlFor="custom-amount" className="block text-base font-medium text-gray-200 mb-2">Or Enter a Custom Amount</label>
                <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-lg font-semibold">UGX</span>
                    </div>
                    <input 
                        type="text"
                        inputMode="numeric"
                        id="custom-amount" 
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="focus:ring-brand-accent focus:border-brand-accent block w-full pl-16 pr-4 py-3 text-lg font-bold text-white bg-gray-700 border-gray-600 rounded-lg" 
                        placeholder="e.g., 20000"
                    />
                </div>
            </div>
            <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">Donation Frequency</label>
                <div className="flex gap-4">
                     <button 
                        onClick={() => setFrequency('one-time')}
                        className={`flex-1 p-3 border rounded-lg text-center font-semibold transition ${
                            frequency === 'one-time' 
                                ? 'bg-brand-accent border-brand-accent text-brand-green' 
                                : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                        }`}
                     >
                        One-Time
                     </button>
                     <button 
                        onClick={() => setFrequency('monthly')}
                        className={`flex-1 p-3 border rounded-lg text-center font-semibold transition ${
                            frequency === 'monthly' 
                                ? 'bg-brand-accent border-brand-accent text-brand-green' 
                                : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                        }`}
                     >
                        Monthly
                    </button>
                </div>
            </div>
            <button 
                onClick={handleProceed}
                disabled={!isAmountSelected}
                className="w-full bg-brand-green text-white font-bold py-4 px-4 rounded-lg hover:bg-brand-light-green transition text-xl disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                Proceed to Payment
            </button>
            <p className="text-xs text-center text-gray-400">100% of your donation goes to our programs.</p>
        </div>
    );
};

const VolunteerForm: React.FC = () => (
    <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Join Our Team of Volunteers</h3>
        <p className="text-gray-300">Whether you can help in the field, at an event, or remotely with your professional skills, your time is invaluable to us. Fill out the form below to get started.</p>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200">Full Name</label>
                <input type="text" id="name" className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
            </div>
             <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email Address</label>
                <input type="email" id="email" className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
            </div>
            <div className="sm:col-span-2">
                 <label htmlFor="skills" className="block text-sm font-medium text-gray-200">Skills & Interests</label>
                 <textarea id="skills" rows={4} className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent" placeholder="e.g., medical training, photography, data analysis, fundraising..."></textarea>
            </div>
             <div className="sm:col-span-2">
                 <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-light-green transition text-lg">
                    Submit Application
                </button>
             </div>
        </form>
    </div>
);


const PartnershipsInfo: React.FC = () => (
    <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Partner With Us</h3>
        <p className="text-gray-300 leading-relaxed">Corporate and NGO partnerships are vital to scaling our impact. We collaborate with organizations that share our commitment to environmental and social responsibility. From corporate sponsorships and employee giving programs to in-kind donations and strategic alliances, there are many ways to work together.</p>
        <p className="text-gray-300 leading-relaxed">If your organization is interested in creating a better future, we'd love to explore how we can align our missions. Please reach out to our partnerships team to start the conversation.</p>
        <div className="bg-gray-700 p-6 rounded-lg">
             <p className="text-lg font-semibold text-white">Contact our partnerships team at:</p>
             <a href="mailto:partners@greenvours.org" className="text-xl text-brand-accent font-bold hover:text-yellow-300">partners@greenvours.org</a>
        </div>
    </div>
);


const GetInvolvedPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('donate');

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Get Involved</h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Your time, support, and passion can make a world of difference.</p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 border-b border-gray-700">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button onClick={() => setActiveTab('donate')} className={`py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'donate' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>
                                Donate
                            </button>
                            <button onClick={() => setActiveTab('volunteer')} className={`py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'volunteer' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>
                                Volunteer
                            </button>
                            <button onClick={() => setActiveTab('partner')} className={`py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'partner' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>
                                Partner
                            </button>
                        </nav>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                        {activeTab === 'donate' && <DonateForm />}
                        {activeTab === 'volunteer' && <VolunteerForm />}
                        {activeTab === 'partner' && <PartnershipsInfo />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetInvolvedPage;