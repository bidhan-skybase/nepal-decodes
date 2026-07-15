export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string; // Tailwind-like color class or initial
  bio: string;
  twitter?: string;
  linkedin?: string;
}

export interface ContentBlock {
  type: 'paragraph' | 'subheading' | 'pullquote' | 'image' | 'embed';
  value: string;
  caption?: string; // For images or embeds
}

export interface Article {
  id: string;
  title: string;
  deck: string; // Subtitle / short summary
  category: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  image: string; // Path to public folder image
  content: ContentBlock[];
  featured?: boolean;
  trending?: boolean;
  editorsPick?: boolean;
  views: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  { id: 'politics', name: 'Politics', description: 'Deciphering power, governance, and civic movements in Nepal.' },
  { id: 'society', name: 'Society', description: 'Stories of communities, struggles, and progress in daily Nepalese life.' },
  { id: 'economy', name: 'Economy', description: 'Analyzing trade, infrastructure, and financial currents shaping Nepal\'s future.' },
  { id: 'technology', name: 'Technology', description: 'Tracking digitization, start-ups, and technology policy in the Himalayan republic.' },
  { id: 'culture', name: 'Culture', description: 'Unraveling heritage, history, and arts in the valley and beyond.' },
  { id: 'opinion', name: 'Opinion', description: 'Thoughtful commentary and analytical perspectives on current affairs and human experiences.' },
  { id: 'explainers', name: 'Explainers', description: 'Context, history, and structural breakdowns of complex national stories.' }
];

export const authors: Author[] = [
  {
    id: 'anjana-shrestha',
    name: 'Anjana Shrestha',
    role: 'Senior Investigative Journalist',
    avatar: 'AS',
    bio: 'Anjana Shrestha has spent over a decade reporting on governance, civic rights, and public policy in Nepal. Previously she wrote for leading national dailies.',
    twitter: 'https://twitter.com/anjana_shrestha',
    linkedin: 'https://linkedin.com/in/anjana-shrestha'
  },
  {
    id: 'kiran-adhikari',
    name: 'Kiran Adhikari',
    role: 'Editorial Lead',
    avatar: 'KA',
    bio: 'Kiran Adhikari oversees the editorial direction of Nepal Decodes. He specializes in political economy and long-form narrative non-fiction.',
    twitter: 'https://twitter.com/kiran_adhikari',
    linkedin: 'https://linkedin.com/in/kiran-adhikari'
  },
  {
    id: 'pradeep-thapa',
    name: 'Pradeep Thapa',
    role: 'Technology & Culture Writer',
    avatar: 'PT',
    bio: 'Pradeep Thapa reports on the intersections of technology, culture, and society. He is particularly interested in how digitization is changing rural livelihoods.',
    twitter: 'https://twitter.com/pradeep_thapa',
    linkedin: 'https://linkedin.com/in/pradeep-thapa'
  }
];

export const articles: Article[] = [
  {
    id: 'the-reshaping-of-nepals-federalism',
    title: 'The Reshaping of Nepal\'s Federalism: Promise vs. Reality',
    deck: 'Nearly a decade after the promulgation of the 2015 Constitution, the devolution of power to local governments remains a battleground of political will.',
    category: 'Politics',
    author: authors[1], // Kiran Adhikari
    publishedAt: 'July 12, 2026',
    updatedAt: 'July 14, 2026',
    readTime: '8 min read',
    image: '/images/politics_hero.png',
    featured: true,
    trending: true,
    editorsPick: true,
    views: 12450,
    content: [
      {
        type: 'paragraph',
        value: 'When Nepal adopted its federal constitution in 2015, it was heralded as a historic departure from a highly centralized unitary state to a three-tier government structure. The vision was clear: to bring government closer to the people, ensure equitable distribution of resources, and empower historically marginalized communities.'
      },
      {
        type: 'paragraph',
        value: 'Yet, nearly ten years into this grand experiment, the transition remains incomplete. While local municipalities have demonstrated remarkable agility—particularly in infrastructure delivery and localized crisis response—they continue to clash with federal bureaucracies over resources, legislation, and administrative autonomy.'
      },
      {
        type: 'subheading',
        value: 'The Constitutional Tug-of-War'
      },
      {
        type: 'paragraph',
        value: 'At the heart of the friction lies the division of concurrent powers. The constitution specifies exclusive and concurrent jurisdictions for federal, provincial, and local levels. However, federal ministries have been slow to draft enabling legislation. Key issues like local police integration, civil service management, and education administration remain bottlenecked at the federal level.'
      },
      {
        type: 'pullquote',
        value: 'Federalism was not just about changing administrative boundaries; it was about shifting the mindset of power from Kathmandu to the districts.'
      },
      {
        type: 'paragraph',
        value: 'Local leaders argue that Kathmandu continues to display a centralizing mindset. Budgetary allocations remain skewed, with conditional grants forming the bulk of federal transfers, thereby limiting the discretionary power of local governments. This financial dependency severely curbs the ability of municipalities to design custom local development projects.'
      },
      {
        type: 'subheading',
        value: 'Municipal Successes on the Ground'
      },
      {
        type: 'paragraph',
        value: 'Despite these limitations, the story of Nepalese federalism is far from a failure. In cities and villages across the country, local representatives have brought governance to citizen doorsteps. Municipal judicial committees have settled thousands of community disputes without clogging the formal courts. Rural health clinics have seen improved staffing, and local roads are built with closer civic oversight.'
      },
      {
        type: 'paragraph',
        value: 'Ultimately, the future of Nepal\'s federalism depends on political compromise. For the promises of the 2015 Constitution to be fully realized, federal authorities must step back, let go of administrative control, and allow local governments the room to fail, learn, and grow.'
      }
    ]
  },
  {
    id: 'the-last-weavers-of-kirtipur',
    title: 'The Last Weavers of Kirtipur: Threading Heritage in a Modern Economy',
    deck: 'In the ancient Newar town of Kirtipur, traditional handloom weavers struggle to keep their craft alive in the face of mass production and changing consumer tastes.',
    category: 'Society',
    author: authors[0], // Anjana Shrestha
    publishedAt: 'July 10, 2026',
    readTime: '6 min read',
    image: '/images/society_feature.png',
    featured: false,
    trending: true,
    editorsPick: true,
    views: 8940,
    content: [
      {
        type: 'paragraph',
        value: 'Walk through the narrow brick-paved alleys of Kirtipur in the early morning, and you will hear a rhythmic, metallic clatter echoing from ground-floor workshops. It is the sound of the wooden handlooms, once the heartbeat of this historic hilltop town. Today, however, that clatter is fading.'
      },
      {
        type: 'paragraph',
        value: 'For generations, Kirtipur was synonymous with high-quality handwoven textiles, particularly the distinct black-and-red Haku Patasi saris and soft cotton shawls. Weaving was not merely an economic activity; it was woven into the social fabric of the Newar community.'
      },
      {
        type: 'subheading',
        value: 'The Shadow of the Powerloom'
      },
      {
        type: 'paragraph',
        value: 'The decline began with the influx of cheap, machine-made polyester imports. Powerlooms can produce hundreds of meters of fabric in the time it takes a handloom weaver to finish a single sari. Unable to compete on price, many weavers abandoned their looms for safer, higher-paying jobs in tourism, retail, or labor migration.'
      },
      {
        type: 'pullquote',
        value: 'A handwoven sari carries the stories, breaths, and patience of its maker. You cannot replicate that in a machine.'
      },
      {
        type: 'paragraph',
        value: 'For the few weavers who remain, like 68-year-old Ram Maya Maharjan, the craft is a matter of pride rather than profit. She spends up to eight hours a day on her loom, earning barely enough to cover raw materials and basic meals. The younger generation, she laments, has little interest in learning a craft that promises low financial returns.'
      },
      {
        type: 'subheading',
        value: 'A Path Toward Revival'
      },
      {
        type: 'paragraph',
        value: 'However, there is a glimmer of hope. In recent years, local collectives and sustainable fashion startups have begun partnering with Kirtipur\'s weavers. By positioning handloom fabrics as premium, eco-friendly luxury goods, they are reaching urban consumers willing to pay a fair price for authentic heritage.'
      },
      {
        type: 'paragraph',
        value: 'Whether these initiatives can scale fast enough to save the craft remains to be seen. Without sustained support and training programs for youth, the clatter of Kirtipur\'s looms may soon belong only to history museums.'
      }
    ]
  },
  {
    id: 'hydro-power-dreams-and-environmental-realities',
    title: 'Hydropower Dreams and Environmental Realities in the Trishuli Basin',
    deck: 'As Nepal aims to export thousands of megawatts of clean energy to South Asia, local communities and ecologists warn of irreversible damage to river ecosystems.',
    category: 'Economy',
    author: authors[0], // Anjana Shrestha
    publishedAt: 'July 08, 2026',
    readTime: '9 min read',
    image: '/images/economy_feature.png',
    featured: false,
    trending: false,
    editorsPick: true,
    views: 5210,
    content: [
      {
        type: 'paragraph',
        value: 'Nepal is blessed with a vast network of glacier-fed rivers running down from the Himalayas. This steep topography creates an estimated technical hydropower potential of over 80,000 megawatts. In recent years, the government has moved aggressively to tap this potential, signing agreements with India and Bangladesh for long-term power trade.'
      },
      {
        type: 'paragraph',
        value: 'But along the Trishuli River, a major tributary of the Gandaki system, the scale of this boom is highly visible. Dozens of projects—completed, under construction, or planned—line the river basin. The rushing white waters are increasingly channeled into concrete tunnels and turbines, leaving sections of the natural riverbed dry.'
      },
      {
        type: 'subheading',
        value: 'The Ecological Cost of Clean Energy'
      },
      {
        type: 'paragraph',
        value: 'While hydropower is celebrated as a low-carbon alternative to fossil fuels, it is not without environmental consequences. Aquatic life, particularly migratory fish species like the Mahseer, has declined dramatically due to dams blocking their spawning routes. The constant blasting for tunnels has also destabilized the fragile mountain slopes, exacerbating landslides during monsoon seasons.'
      },
      {
        type: 'pullquote',
        value: 'We are killing our rivers to light up distant cities, ignoring the ecological debt we leave for our children.'
      },
      {
        type: 'paragraph',
        value: 'Local communities are also bearing the brunt of the changes. Water springs, the primary source of drinking water in the hills, have dried up above project tunnels. Fisherfolk families who have lived along the Trishuli for generations have seen their livelihoods collapse as fish stocks dwindle.'
      },
      {
        type: 'subheading',
        value: 'Balancing Development and Ecology'
      },
      {
        type: 'paragraph',
        value: 'Environmentalists argue that Nepal needs a more balanced approach. Instead of building cascade projects on every major river, the government should declare certain free-flowing rivers as protected zones. Implementing strict environmental flows—the minimum water required to sustain river life—and ensuring local ownership of projects could mitigate the worst impacts of the energy rush.'
      }
    ]
  },
  {
    id: 'nepals-silent-it-export-boom',
    title: 'Nepal\'s Silent IT Export Boom: The Rise of a New Digital Workforce',
    deck: 'With no physical borders and a growing pool of skilled engineering talent, tech startups in Lalitpur are quiet giants in international software exports.',
    category: 'Technology',
    author: authors[2], // Pradeep Thapa
    publishedAt: 'July 05, 2026',
    readTime: '7 min read',
    image: '/images/technology_feature.png',
    featured: false,
    trending: true,
    editorsPick: false,
    views: 11020,
    content: [
      {
        type: 'paragraph',
        value: 'For decades, Nepal\'s economy has relied heavily on two main pillars: tourism and remittances sent home by migrant workers in the Gulf and East Asia. However, in the offices of Lalitpur and Kathmandu, a third pillar has quietly emerged. Software engineering, data processing, and digital design have become some of the country\'s fastest-growing exports.'
      },
      {
        type: 'paragraph',
        value: 'According to a recent study by a local think tank, software exports from Nepal crossed hundreds of millions of dollars last year. Thousands of young developers, designers, and project managers now work for international clients ranging from Silicon Valley startups to European conglomerates.'
      },
      {
        type: 'subheading',
        value: 'Why Nepal? The Competitive Edge'
      },
      {
        type: 'paragraph',
        value: 'The rise of Nepal\'s IT sector is driven by a combination of English proficiency, competitive labor costs, and a surging interest in computer science among university graduates. Unlike traditional manufacturing, software requires no physical transit routes through landlocked borders, bypassing Nepal\'s historical trade bottlenecks.'
      },
      {
        type: 'pullquote',
        value: 'Code knows no borders. A developer in Lalitpur can build solutions for a user in London just as easily as someone in San Francisco.'
      },
      {
        type: 'paragraph',
        value: 'Yet, the sector faces structural challenges. Bureaucratic hurdles make it difficult for foreign clients to invest directly, and complex banking regulations restrict the inward flow of international payments. Furthermore, a lack of high-speed, reliable electricity in rural areas keeps the tech hub concentrated almost exclusively in the Kathmandu Valley.'
      },
      {
        type: 'subheading',
        value: 'Nurturing the Digital Ecosystem'
      },
      {
        type: 'paragraph',
        value: 'To sustain this momentum, industry leaders are calling for policy reforms. Easing capital controls, establishing modern IT parks, and reforming university curricula to focus on practical, industry-aligned skills are essential. With the right support, the digital economy could provide high-paying, creative jobs at home, slowing the brain drain of Nepal\'s youth.'
      }
    ]
  },
  {
    id: 'boudhanaths-prayer-flags-and-spiritual-heritage',
    title: 'Boudhanath\'s Prayer Flags: The Art and Philosophy of Spiritual Colors',
    deck: 'An exploration of the ancient traditions, craftsmanship, and profound Buddhist philosophy behind the iconic prayer flags of Kathmandu\'s largest stupa.',
    category: 'Culture',
    author: authors[2], // Pradeep Thapa
    publishedAt: 'July 01, 2026',
    readTime: '5 min read',
    image: '/images/culture_feature.png',
    featured: false,
    trending: false,
    editorsPick: false,
    views: 4320,
    content: [
      {
        type: 'paragraph',
        value: 'Standing at the center of a bustling urban square in Kathmandu, the Boudhanath Stupa is a sanctuary of calm. Its white dome, golden spire, and the watchful eyes of the Buddha have welcomed pilgrims for centuries. But it is the thousands of colorful prayer flags, stretching from the spire to the ground, that give the stupa its vibrant, kinetic energy.'
      },
      {
        type: 'paragraph',
        value: 'Known in Tibetan as "Lungta" (literally "Wind Horse"), these flags are far more than decorative ornaments. They are deeply rooted in Buddhist cosmology, philosophy, and local community craft.'
      },
      {
        type: 'subheading',
        value: 'The Five Elements of Life'
      },
      {
        type: 'paragraph',
        value: 'The colors of the flags are always arranged in a specific order, representing the five elements of the universe. Blue symbolizes space; white represents air and wind; red represents fire; green symbolizes water; and yellow represents earth. According to Buddhist tradition, maintaining balance among these elements is key to health, peace, and harmony.'
      },
      {
        type: 'pullquote',
        value: 'As the wind blows through the flags, it carries the printed prayers and blessings across the valley, bringing peace to all sentient beings.'
      },
      {
        type: 'paragraph',
        value: 'The prayers printed on the flags—usually mantras of compassion, strength, and wisdom—are not meant to reach a deity. Rather, the wind is believed to carry these spiritual vibrations into the surrounding atmosphere, purifying the environment and bringing goodwill to all who cross its path.'
      },
      {
        type: 'subheading',
        value: 'Preserving the Sacred Craft'
      },
      {
        type: 'paragraph',
        value: 'In the workshops surrounding Boudhanath, printers still use traditional wooden blocks to stamp mantras onto cotton cloth. While synthetic polyester flags have become common due to their durability, traditionalists prefer cotton because it biodegrades naturally, reflecting the Buddhist teaching of impermanence.'
      }
    ]
  },
  {
    id: 'the-art-of-chiya-and-nepali-conversation',
    title: 'The Art of Chiya: Brewing Conversation on Kathmandu\'s Streets',
    deck: 'From early morning debates to late-night deals, the traditional sweet milk tea remains the ultimate social catalyst of Nepalese civic life.',
    category: 'Opinion',
    author: authors[1], // Kiran Adhikari
    publishedAt: 'June 28, 2026',
    readTime: '5 min read',
    image: '/images/opinion_feature.png',
    featured: false,
    trending: true,
    editorsPick: true,
    views: 9540,
    content: [
      {
        type: 'paragraph',
        value: 'In Kathmandu, the day does not begin with an alarm; it begins with the hiss of steam from a milk pan. Long before the sun clears the eastern hills, local tea stalls open their shutters, welcoming their first customers with steaming glasses of sweet, spiced milk tea—simply known as chiya.'
      },
      {
        type: 'paragraph',
        value: 'Chiya in Nepal is not merely a beverage; it is a ritual, a social glue, and a democratic forum. At a tea stall, differences of class, age, and politics dissolve. A politician, a taxi driver, a student, and a merchant sit on the same wooden bench, debating everything from constitutional amendments to football scores.'
      },
      {
        type: 'subheading',
        value: 'The Geometry of the Tea Stall'
      },
      {
        type: 'paragraph',
        value: 'There is an understated art to the tea stall conversation. It requires no formal invitations, no reservations, and very little money. A few rupees buy you a hot glass of chiya and an unspoken license to join whatever debate is currently boiling over. It is where public opinion is tested, rumors are validated, and community relationships are maintained.'
      },
      {
        type: 'pullquote',
        value: 'Show me what a city talks about at its tea stalls, and I will show you the true state of the nation.'
      },
      {
        type: 'paragraph',
        value: 'In an era dominated by smartphone screens and digital echo chambers, the physical tea stall remains an indispensable civic space. It forces us to look at our neighbors, listen to opposing perspectives, and find common ground over cardamom and ginger. As Kathmandu modernizes, we must protect these humble street-level forums; they are the true incubators of our democracy.'
      }
    ]
  },
  {
    id: 'explaining-kathmandus-ancient-dhunge-dhara-water-system',
    title: 'Deconstructing Kathmandu\'s Ancient Dhunge Dhara Water System',
    deck: 'How the Lichchhavi-era stone water spouts and underground channels supplied water to the valley for over a thousand years—and why they are failing today.',
    category: 'Explainers',
    author: authors[0], // Anjana Shrestha
    publishedAt: 'June 25, 2026',
    readTime: '7 min read',
    image: '/images/culture_feature.png', // Fallback or reusing culture image
    featured: false,
    trending: false,
    editorsPick: false,
    views: 6530,
    content: [
      {
        type: 'paragraph',
        value: 'For centuries before the advent of modern piped water, the residents of the Kathmandu Valley relied on a sophisticated system of stone spouts (dhunge dhara) and underground canals (raj kulo) for their daily water needs. Engineered over 1,500 years ago during the Lichchhavi and Malla dynasties, this network represents a masterpiece of ancient hydro-engineering.'
      },
      {
        type: 'paragraph',
        value: 'Today, as the valley faces chronic water shortages, these ancient systems are gaining renewed attention from urban planners, conservationists, and engineers seeking sustainable solutions.'
      },
      {
        type: 'subheading',
        value: 'How the System Works'
      },
      {
        type: 'paragraph',
        value: 'The system relies on gravity and natural filtration. Water is channeled from natural springs in the surrounding hills or tapped from shallow aquifers. It is transported through underground terracotta pipelines (raj kulos) to stone spouts built below street level in recessed courtyards. The elevation drop provides the hydraulic head needed for water to flow continuously.'
      },
      {
        type: 'pullquote',
        value: 'The ancient engineers did not fight gravity; they worked with the natural slope of the valley to distribute water equitably.'
      },
      {
        type: 'paragraph',
        value: 'Additionally, many spouts are connected to traditional ponds (pokhari) that act as recharge basins, storing monsoon rainwater and replenishing the local groundwater table. This integrated design ensured that the spouts flowed even during dry winter months.'
      },
      {
        type: 'subheading',
        value: 'The Modern Breakdown'
      },
      {
        type: 'paragraph',
        value: 'The decline of the dhunge dharas began with rapid, unplanned urbanization. Many traditional ponds have been paved over or built upon, cutting off the groundwater recharge. Underground pipelines have been severed during road expansions or blocked by modern foundations. Today, of the hundreds of historical spouts in the valley, only a fraction remain functional.'
      },
      {
        type: 'paragraph',
        value: 'Reviving this ancient system requires restoring recharge ponds, protecting remaining spring sources, and incorporating traditional water wisdom into modern urban design.'
      }
    ]
  }
];
