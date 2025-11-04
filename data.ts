import { Tour, NewsArticle, TeamMember, Project, EducationProgram } from './types';

export const initialTours: Tour[] = [
    { 
        id: 1, title: 'Bwindi Gorilla Trek', region: 'Western Uganda', activity: 'Wildlife', duration: 3, difficulty: 'Challenging', price: 2800000, imageUrl: 'https://picsum.photos/seed/ugtour1/600/400', 
        description: 'Embark on a once-in-a-lifetime journey into the heart of Bwindi Impenetrable Forest to witness a family of mountain gorillas in their natural habitat. This profound experience supports the conservation of this critically endangered species and benefits local communities.', 
        itinerary: [
            { day: 1, title: 'Transfer to Bwindi', description: 'Depart from Kampala/Entebbe and travel southwest to the edge of the Bwindi Impenetrable Forest, enjoying scenic views of the Ugandan countryside.' },
            { day: 2, title: 'The Gorilla Trek', description: 'After a briefing from UWA rangers, venture into the dense forest. The trek can take several hours, but the reward is an unforgettable hour spent observing the gorillas.' },
            { day: 3, title: 'Community Walk & Return Journey', description: 'Visit a local Batwa community to learn about their culture before starting your journey back to Kampala, filled with incredible memories.' }
        ], 
        sustainabilityFeatures: ['Gorilla permits fund national park conservation', 'Employment of local guides and porters', 'Support for local community schools and clinics', 'Eco-lodge accommodations with minimal footprint'], 
        guide: { name: 'Amos Wambede', bio: 'Amos was born and raised near Bwindi and has been a certified UWA guide for over 15 years. His passion for wildlife conservation is infectious, and he has an incredible talent for tracking gorilla families.', imageUrl: 'https://picsum.photos/seed/ugguide1/300/300' }
    },
    { 
        id: 2, title: 'Rwenzori Mountain Climb', region: 'Western Uganda', activity: 'Hiking', duration: 9, difficulty: 'Challenging', price: 4500000, imageUrl: 'https://picsum.photos/seed/ugtour2/600/400', 
        description: 'Conquer the legendary "Mountains of the Moon." This challenging trek takes you through diverse ecosystems, from lush montane forests to alpine meadows, culminating in breathtaking views from Margherita Peak.',
        itinerary: [
            { day: 1, title: 'Arrival and Briefing', description: 'Arrive at the base camp in Kasese for a full briefing and equipment check.' },
            { day: 2-8, title: 'The Ascent & Descent', description: 'Trek through various camps (Nyabitaba, John Matte, Bujuku, Elena, Kitandara), acclimatizing and enjoying the unique flora and fauna. Summit Margherita peak on day 7.' },
            { day: 9, title: 'Final Descent & Departure', description: 'Complete the final leg of your descent and transfer back to Kasese.' }
        ],
        sustainabilityFeatures: ['All waste is carried out', 'Strictly follow designated trails', 'Supports the local Bakonzo community guides and porters'],
        guide: { name: 'Esther Biira', bio: 'Esther is one of the few female lead guides in the Rwenzoris. Her knowledge of the mountain\'s geology and unique vegetation is unparalleled.', imageUrl: 'https://picsum.photos/seed/ugguide2/300/300' }
    },
    { 
        id: 3, title: 'Mabamba Swamp Shoebill Tour', region: 'Central Uganda', activity: 'Birdwatching', duration: 1, difficulty: 'Easy', price: 700000, imageUrl: 'https://picsum.photos/seed/ugtour3/600/400', 
        description: 'Take a traditional canoe through the papyrus reeds of Mabamba Swamp on Lake Victoria to find the elusive and prehistoric-looking shoebill stork, one of the most sought-after birds in Africa.',
        itinerary: [
            { day: 1, title: 'Canoe Expedition', description: 'An early morning start from Entebbe to the Mabamba landing site. Spend 3-4 hours navigating the swamp channels with an expert local guide, spotting the shoebill and hundreds of other bird species.' }
        ],
        sustainabilityFeatures: ['Empowers local canoe guides', 'Tour fees contribute to the conservation of the wetland', 'Promotes non-invasive wildlife observation'],
        guide: { name: 'John Okello', bio: 'John has been paddling these waters since he was a boy. His sharp eyes can spot a shoebill from a remarkable distance, and he knows the name of every bird you\'ll see.', imageUrl: 'https://picsum.photos/seed/ugguide3/300/300' }
    },
    { id: 4, title: 'Murchison Falls Safari', region: 'Northern Uganda', activity: 'Wildlife', duration: 4, difficulty: 'Moderate', price: 3500000, imageUrl: 'https://picsum.photos/seed/ugtour4/600/400', description: 'Experience the world\'s most powerful waterfall and diverse wildlife.', itinerary: [], sustainabilityFeatures: [], guide: { name: 'Guide Name', bio: 'Guide Bio', imageUrl: 'https://picsum.photos/seed/guide4/300/300' }},
    { id: 5, title: 'Sipi Falls Wellness Retreat', region: 'Eastern Uganda', activity: 'Wellness', duration: 3, difficulty: 'Easy', price: 1800000, imageUrl: 'https://picsum.photos/seed/ugtour5/600/400', description: 'Yoga and meditation by stunning waterfalls.', itinerary: [], sustainabilityFeatures: [], guide: { name: 'Guide Name', bio: 'Guide Bio', imageUrl: 'https://picsum.photos/seed/guide5/300/300' }},
    { id: 6, title: 'Queen Elizabeth Park Discovery', region: 'Western Uganda', activity: 'Wildlife', duration: 5, difficulty: 'Moderate', price: 4000000, imageUrl: 'https://picsum.photos/seed/ugtour6/600/400', description: 'Home to tree-climbing lions and the Kazinga Channel.', itinerary: [], sustainabilityFeatures: [], guide: { name: 'Guide Name', bio: 'Guide Bio', imageUrl: 'https://picsum.photos/seed/guide6/300/300' }},
];


export const initialNews: NewsArticle[] = [
    { id: 1, title: 'Major Reforestation Drive in Budongo Forest', excerpt: 'We planted over 10,000 native saplings this past quarter, protecting vital chimpanzee habitats.', imageUrl: 'https://picsum.photos/seed/ugnews1/600/400', category: 'Conservation', date: 'Oct 28, 2023' },
    { id: 2, title: 'Urgent Flood Relief in Kasese District', excerpt: 'Our team is on the ground providing essential supplies to families affected by the recent floods from River Nyamwamba.', imageUrl: 'https://picsum.photos/seed/ugnews2/600/400', category: 'Relief Update', date: 'Oct 25, 2023' },
    { id: 3, title: 'Discovering the Beauty of Sipi Falls', excerpt: 'A look back at our latest eco-tour, balancing adventure with responsible travel in Eastern Uganda.', imageUrl: 'https://picsum.photos/seed/ugnews3/600/400', category: 'Travel', date: 'Oct 22, 2023' },
    { id: 4, title: 'The Importance of Ranger Patrols', excerpt: 'Learn how our funding supports the brave rangers of Uganda Wildlife Authority who protect our national parks from poachers and illegal activity.', imageUrl: 'https://picsum.photos/seed/ugblog4/800/500', category: 'Conservation', date: 'October 15, 2023' },
    { id: 5, title: 'A Day in the Life of a Kampala Volunteer', excerpt: 'An interview with one of our dedicated volunteers, sharing their experience sorting supplies and coordinating logistics for our relief efforts.', imageUrl: 'https://picsum.photos/seed/ugblog5/800/500', category: 'Relief Update', date: 'October 10, 2023' },
];

export const initialTeamMembers: TeamMember[] = [
    { id: 1, name: 'Dr. Grace Nakato', role: 'Founder & Lead Conservationist', bio: 'With a Ph.D. in Environmental Science from Makerere University, Grace founded Greenvours to connect responsible tourism with tangible conservation in Uganda.', imageUrl: 'https://picsum.photos/seed/ugteam1/400/400' },
    { id: 2, name: 'David Mwesige', role: 'Head of Eco-Tours', bio: 'An experienced guide with 15+ years leading safaris, David ensures all our trips are safe, authentic, and respectful of Uganda\'s natural heritage.', imageUrl: 'https://picsum.photos/seed/ugteam2/400/400' },
    { id: 3, name: 'Sarah Achen', role: 'Director of Community Aid', bio: 'Sarah coordinates our relief efforts, working tirelessly with local leaders in regions like Karamoja to deliver aid where it\'s needed most.', imageUrl: 'https://picsum.photos/seed/ugteam3/400/400' },
];

export const initialProjects: Project[] = [
    { 
        id: 1, 
        name: 'Shoebill Stork Conservation', 
        location: 'Mabamba Bay, Lake Victoria', 
        description: 'Working with local fishing communities to protect the nesting sites of the iconic shoebill stork and reduce human-wildlife conflict.', 
        longDescription: 'The Mabamba Bay wetland is a critical habitat for the endangered shoebill stork. Our project focuses on a multi-pronged approach to conservation. We partner with local fishermen, training them as paid guides and site monitors. This creates an economic incentive for conservation and turns former potential threats into the species\' staunchest protectors. We also conduct regular population surveys, clear invasive plant species that threaten nesting areas, and run educational campaigns in nearby villages to highlight the importance of the wetland\'s biodiversity.',
        imageUrl: 'https://picsum.photos/seed/ugproject1/600/400',
        goals: [
            "Monitor and protect at least 15 active shoebill nests per season.",
            "Train and equip 20 local fishermen as conservation guides.",
            "Restore 5 hectares of native papyrus habitat.",
            "Reduce poaching and egg collection incidents by 90%."
        ],
        impactStats: [
            { value: '30+', label: 'Local Guides Trained' },
            { value: '85%', label: 'Increase in Shoebill Sightings' },
            { value: '12', label: 'Hectares of Wetland Restored' }
        ],
        galleryImages: [
            'https://picsum.photos/seed/proj1gal1/600/400',
            'https://picsum.photos/seed/proj1gal2/600/400',
            'https://picsum.photos/seed/proj1gal3/600/400',
            'https://picsum.photos/seed/proj1gal4/600/400'
        ]
    },
    { 
        id: 2, 
        name: 'Kibale Forest Reforestation', 
        location: 'Kibale, Western Uganda', 
        description: 'Establishing tree nurseries and reforesting degraded areas bordering Kibale National Park to expand the corridor for chimpanzees and other primates.', 
        longDescription: 'Kibale National Park is home to one of the highest concentrations of primates in Africa. However, deforestation on its borders threatens wildlife corridors. This project works with local landowners to reforest these critical buffer zones. We have established three community-managed tree nurseries that grow thousands of native saplings. By planting these trees, we are not only expanding the habitat for chimpanzees but also providing local communities with sustainable sources of firewood and medicinal plants, reducing their reliance on the protected forest.',
        imageUrl: 'https://picsum.photos/seed/ugproject2/600/400',
        goals: [
            "Plant 50,000 native trees annually.",
            "Establish 3 community-owned tree nurseries.",
            "Reforest 100 hectares of degraded land.",
            "Provide alternative livelihood training to 200 households."
        ],
        impactStats: [
            { value: '125,000+', label: 'Native Trees Planted' },
            { value: '250', label: 'Hectares Reforested' },
            { value: '500+', label: 'Households Benefitting' }
        ],
        galleryImages: [
            'https://picsum.photos/seed/proj2gal1/600/400',
            'https://picsum.photos/seed/proj2gal2/600/400',
            'https://picsum.photos/seed/proj2gal3/600/400',
            'https://picsum.photos/seed/proj2gal4/600/400'
        ]
    },
    { 
        id: 3, 
        name: 'Mountain Gorilla Habitat Protection', 
        location: 'Bwindi Impenetrable National Park', 
        description: 'Funding anti-poaching patrols and community education programs to ensure the long-term survival of the mountain gorilla population.', 
        longDescription: 'While the mountain gorilla population is slowly recovering, it remains under constant threat from poaching snares (often set for other animals) and human-wildlife conflict. This project directly supports the Uganda Wildlife Authority by funding ranger patrols. We provide essential equipment like GPS units, boots, and rations, enabling rangers to conduct longer, more effective patrols to remove snares and deter illegal activity. Furthermore, we run an intensive education program in schools and villages bordering the park to foster a sense of ownership and pride in protecting this incredible species.',
        imageUrl: 'https://picsum.photos/seed/ugproject3/600/400',
        goals: [
            "Fund 1,200 ranger patrol days per year.",
            "Remove 500+ poaching snares from the park annually.",
            "Conduct conservation education in 25 local schools.",
            "Mitigate human-gorilla conflict through community engagement."
        ],
        impactStats: [
            { value: '4,000+', label: 'Snares Removed to Date' },
            { value: '50+', label: 'Rangers Equipped' },
            { value: '10,000', label: 'Students Reached' }
        ],
        galleryImages: [
            'https://picsum.photos/seed/proj3gal1/600/400',
            'https://picsum.photos/seed/proj3gal2/600/400',
            'https://picsum.photos/seed/proj3gal3/600/400',
            'https://picsum.photos/seed/proj3gal4/600/400'
        ]
    },
];

export const initialEducationPrograms: EducationProgram[] = [
    {
        id: 1,
        title: 'Community Conservation Workshops',
        description: 'We run workshops for local communities on sustainable agriculture, waste management, and the economic benefits of conservation, providing them with the tools to protect their natural heritage.',
        longDescription: 'Our Community Conservation Workshops are hands-on, interactive sessions designed to empower local communities as the primary stewards of their environment. We cover topics ranging from soil conservation techniques and organic farming to creating small-scale eco-tourism enterprises. By linking environmental health directly to economic prosperity, we foster a sustainable model where both people and nature can thrive. These workshops are a cornerstone of our belief that conservation must be community-led to be effective.',
        callToAction: 'View Workshop Schedule →',
        imageUrl: 'https://picsum.photos/seed/ugedu1/600/400',
        targetAudience: 'Farmers, community leaders, and small business owners living near protected areas.',
        galleryImages: [
            'https://picsum.photos/seed/edugal1_1/600/400',
            'https://picsum.photos/seed/edugal1_2/600/400',
            'https://picsum.photos/seed/edugal1_3/600/400',
        ],
        schedule: [
            { date: 'Nov 15, 2023', topic: 'Intro to Permaculture', location: 'Kasese Town Hall' },
            { date: 'Dec 05, 2023', topic: 'Waste-to-Wealth: Composting & Briquettes', location: 'Fort Portal Youth Center' },
            { date: 'Jan 20, 2024', topic: 'Beekeeping for Biodiversity', location: 'Bwindi Community Center' },
        ],
    },
    {
        id: 2,
        title: 'Future Stewards School Program',
        description: 'Our team has developed educational materials for schools, offering free, downloadable lesson plans and occasionally visiting classrooms to inspire young minds about the wonders of the natural world.',
        longDescription: 'The Future Stewards School Program aims to ignite a passion for conservation in the next generation. We partner with primary and secondary schools across Uganda to provide engaging, curriculum-aligned resources that bring environmental science to life. Our program includes beautifully illustrated booklets, interactive classroom activities, and a "Ranger for a Day" experience where students can meet real wildlife rangers. We believe that by educating children today, we are investing in a greener, more hopeful future for Uganda.',
        callToAction: 'Access Free Resources →',
        imageUrl: 'https://picsum.photos/seed/ugedu2/600/400',
        targetAudience: 'Primary and secondary school students and teachers in Uganda.',
        galleryImages: [
            'https://picsum.photos/seed/edugal2_1/600/400',
            'https://picsum.photos/seed/edugal2_2/600/400',
            'https://picsum.photos/seed/edugal2_3/600/400',
        ],
        schedule: [
             { date: 'Ongoing', topic: 'Resource Pack Download', location: 'Online' },
             { date: 'Feb 10, 2024', topic: 'Live Q&A with a Wildlife Vet', location: 'Online Webinar' },
             { date: 'Mar 22, 2024', topic: 'National School Conservation Art Contest Begins', location: 'Nationwide' },
        ],
    }
];