import React, { useState } from 'react';

type Tab = 'donate' | 'volunteer' | 'partner';

const DonateForm: React.FC = () => (
    <div className="space-y-6">
        <div>
            <label className="block text-lg font-semibold text-gray-200 mb-2">Choose Amount</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['50,000', '100,000', '250,000', '500,000'].map(amount => (
                     <button key={amount} className="p-4 border border-gray-600 rounded-lg text-center font-bold text-lg text-white hover:bg-brand-accent hover:border-brand-accent hover:text-brand-green transition">UGX {amount}</button>
                ))}
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
                    inputMode="decimal"
                    id="custom-amount" 
                    className="focus:ring-brand-accent focus:border-brand-accent block w-full pl-16 pr-4 py-3 text-lg font-bold text-white bg-gray-700 border-gray-600 rounded-lg" 
                    placeholder="e.g., 20000"
                />
            </div>
        </div>
        <div>
            <label className="block text-lg font-semibold text-gray-200 mb-2">Donation Frequency</label>
            <div className="flex gap-4">
                 <button className="flex-1 p-3 border rounded-lg text-center font-semibold text-brand-green bg-brand-accent border-brand-accent">One-Time</button>
                 <button className="flex-1 p-3 border border-gray-600 rounded-lg text-center font-semibold text-gray-300 hover:bg-gray-700 transition">Monthly</button>
            </div>
        </div>
        <button className="w-full bg-brand-green text-white font-bold py-4 px-4 rounded-lg hover:bg-brand-light-green transition text-xl">
            Donate Now
        </button>
        <p className="text-xs text-center text-gray-400">Secure donation powered by Stripe. 100% of your donation goes to our programs.</p>
    </div>
);

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