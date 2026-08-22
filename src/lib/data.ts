import heroPortrait from "@/assets/hero-portrait.jpg";
import heroPerformance from "@/assets/hero-performance.jpg";
import heroInstrument from "@/assets/hero-instrument.jpg";
import heroAudience from "@/assets/hero-audience.jpg";
import artistMeera from "@/assets/artist-meera.jpg";
import artistArindam from "@/assets/artist-arindam.jpg";
import artistKavya from "@/assets/artist-kavya.jpg";
import artistRavi from "@/assets/artist-ravi.jpg";
import artistFarah from "@/assets/artist-farah.jpg";
import artistDev from "@/assets/artist-dev.jpg";
import artistAnanya from "@/assets/artist-ananya.jpg";
import artistManoj from "@/assets/artist-manoj.jpg";
import eventCourtyard from "@/assets/event-courtyard.jpg";
import eventFestival from "@/assets/event-festival.jpg";
import eventWorkshop from "@/assets/event-workshop.jpg";
import storyTrain from "@/assets/story-train.jpg";
import storyPuppets from "@/assets/story-puppets.jpg";
import storyDance from "@/assets/story-dance.jpg";
import storyArchive from "@/assets/story-archive.jpg";

export const images = {
  heroPortrait,
  heroPerformance,
  heroInstrument,
  heroAudience,
  eventCourtyard,
  eventFestival,
  eventWorkshop,
  storyTrain,
  storyPuppets,
  storyDance,
  storyArchive,
};

/* ---------------- Artists ---------------- */

export interface Review {
  name: string;
  role: string;
  quote: string;
}

export interface Artist {
  slug: string;
  name: string;
  artForm: string;
  categories: string[];
  city: string;
  state: string;
  region: string;
  image: string;
  tagline: string;
  bio: string;
  story: string[];
  price: string;
  priceNote: string;
  available: boolean;
  availabilityNote: string;
  availableDays: number[]; // days of current month available
  rating: number;
  reviewCount: number;
  experienceYears: number;
  languages: string[];
  availableFor: string[];
  formats: string[];
  portfolio: string[];
  reviews: Review[];
  featured?: boolean;
  quote?: string;
}

export const artists: Artist[] = [
  {
    slug: "meera-rathore",
    name: "Meera Rathore",
    artForm: "Rajasthani Folk Music",
    categories: ["Music", "Folk Arts"],
    city: "Jaipur",
    state: "Rajasthan",
    region: "Rajasthan",
    image: artistMeera,
    tagline: "Fourth-generation Manganiyar singer carrying the desert's songbook.",
    bio: "Meera learned her first ragas from her grandmother in a village outside Jaisalmer. Today she leads a five-member ensemble performing Manganiyar folk, Sufi kalam, and wedding repertoires across Rajasthan and beyond.",
    story: [
      "I was seven when my grandmother first sat me down beside her on the charpai and told me to listen — not to her voice, but to the space between the notes. That silence, she said, is where the desert lives.",
      "For years we sang at weddings and village gatherings, and people loved us in the moment and forgot us by morning. Street Symphony changed that. People had been listening to us for years — now they know where to find us.",
      "Every song I sing carries my grandmother's name. When a young audience asks for the story behind a raga, I know the tradition will outlive me.",
    ],
    price: "From ₹18,000",
    priceNote: "Ensemble of 3–5, 90-minute performance",
    available: true,
    availabilityNote: "Available for bookings",
    availableDays: [3, 7, 8, 14, 15, 21, 22, 28],
    rating: 4.9,
    reviewCount: 34,
    experienceYears: 22,
    languages: ["Hindi", "Marwari", "Urdu"],
    availableFor: ["Weddings", "Festivals", "Cultural programmes", "Corporate events", "Private events"],
    formats: ["Solo", "Ensemble (3–5)", "With amplification", "Acoustic courtyard set"],
    portfolio: [artistMeera, heroPerformance, heroInstrument, eventCourtyard],
    reviews: [
      { name: "Sana Kapoor", role: "Wedding client, Udaipur", quote: "Meera ji didn't perform at our wedding — she transformed it. Guests are still talking about the final kalam." },
      { name: "Heritage Hotels Group", role: "Corporate client", quote: "Professional, punctual, and utterly spellbinding. We have booked her ensemble four times." },
    ],
    featured: true,
    quote: "People had been listening to us for years. Now they know where to find us.",
  },
  {
    slug: "arindam-das",
    name: "Arindam Das",
    artForm: "Baul Music",
    categories: ["Music", "Storytelling"],
    city: "Kolkata",
    state: "West Bengal",
    region: "West Bengal",
    image: artistArindam,
    tagline: "Baul philosopher-singer with an ektara and a question for every audience.",
    bio: "Arindam left a banking job in 2011 to wander with Baul fakirs in Shantiniketan. His performances weave mystic poetry, humour, and audience conversation into an evening nobody forgets.",
    story: [
      "The ektara has one string. People ask me — only one? I tell them: one string, one breath, one life. The Baul tradition is about stripping away everything extra.",
      "My guru never wrote a song down. 'If a song is true,' he said, 'the wind will carry it to whoever needs it.' I write them down now, because the wind is getting noisy.",
    ],
    price: "From ₹12,000",
    priceNote: "Solo or duo, 60–90 minutes",
    available: true,
    availabilityNote: "Available from next week",
    availableDays: [5, 6, 12, 13, 19, 20, 26, 27],
    rating: 4.8,
    reviewCount: 27,
    experienceYears: 14,
    languages: ["Bengali", "Hindi", "English"],
    availableFor: ["Festivals", "Cafés", "Cultural programmes", "Schools", "Private events"],
    formats: ["Solo with ektara", "Duo with percussion", "Unplugged"],
    portfolio: [artistArindam, storyTrain, eventFestival, heroAudience],
    reviews: [
      { name: "Prithvi Banerjee", role: "Festival director, Kolkata", quote: "He had 3,000 people singing along to a 200-year-old mystic poem. Extraordinary." },
      { name: "Café Mondegar", role: "Café partner, Mumbai", quote: "Our quietest Tuesday became our busiest night. His audience follows him everywhere." },
    ],
    featured: true,
  },
  {
    slug: "kavya-nair",
    name: "Kavya Nair",
    artForm: "Mohiniyattam & Traditional Dance",
    categories: ["Dance"],
    city: "Kochi",
    state: "Kerala",
    region: "Kerala",
    image: artistKavya,
    tagline: "Mohiniyattam dancer bringing temple grace to contemporary stages.",
    bio: "Trained under Kalamandalam masters, Kavya performs classical Mohiniyattam and curated folk fusions. She runs weekend intensives for young dancers in Kochi.",
    story: [
      "Mohiniyattam taught me that stillness can hold an audience more completely than movement. The pause is the performance.",
      "My students are daughters of fishermen and bank managers alike. The dance does not care where you come from — only that you arrive with honesty.",
    ],
    price: "From ₹22,000",
    priceNote: "Solo classical, 60-minute repertoire",
    available: false,
    availabilityNote: "Next available: late October",
    availableDays: [24, 25, 26, 30, 31],
    rating: 5.0,
    reviewCount: 19,
    experienceYears: 18,
    languages: ["Malayalam", "English", "Hindi"],
    availableFor: ["Festivals", "Cultural programmes", "Corporate events", "Workshops"],
    formats: ["Solo classical", "Lecture-demonstration", "Workshop (half-day)"],
    portfolio: [artistKavya, storyDance, heroPerformance, eventCourtyard],
    reviews: [
      { name: "Kerala Arts Council", role: "Institutional partner", quote: "A custodian of the form with the rare gift of making it legible to first-time audiences." },
    ],
    featured: true,
  },
  {
    slug: "ravi-pawar",
    name: "Ravi Pawar",
    artForm: "Percussion & Folk Music",
    categories: ["Music", "Street Performance"],
    city: "Pune",
    state: "Maharashtra",
    region: "Maharashtra",
    image: artistRavi,
    tagline: "Dhol-tasha powerhouse who turns any gathering into a procession.",
    bio: "Ravi grew up in Pune's Ganpati procession circuit and now leads a 12-member dhol-tasha pathak. He performs, teaches rhythm workshops, and builds percussion programmes for schools.",
    story: [
      "In Pune you learn the dhol before you learn to ride a bicycle. The rhythm of Ganpati visarjan is the rhythm of my childhood.",
      "When I teach children, I don't start with technique. I start with joy. Technique follows joy like a shadow.",
    ],
    price: "From ₹15,000",
    priceNote: "Pathak of 6–12 drummers",
    available: true,
    availabilityNote: "Available for bookings",
    availableDays: [2, 6, 9, 13, 16, 20, 23, 27, 30],
    rating: 4.9,
    reviewCount: 41,
    experienceYears: 16,
    languages: ["Marathi", "Hindi", "English"],
    availableFor: ["Festivals", "Weddings", "Schools", "Corporate events", "Workshops"],
    formats: ["Procession set", "Stage show", "Rhythm workshop", "Flash-mob style"],
    portfolio: [artistRavi, eventWorkshop, heroInstrument, eventFestival],
    reviews: [
      { name: "Vidya Mandir School", role: "School partner, Pune", quote: "Two hundred children, forty minutes, zero boredom. Teachers still talk about it." },
      { name: "Nikhil & Priya", role: "Wedding clients", quote: "The baraat stopped traffic and started a second party. Worth every rupee." },
    ],
    featured: true,
  },
  {
    slug: "farah-khan",
    name: "Farah Khan",
    artForm: "Street Theatre (Nukkad Natak)",
    categories: ["Theatre", "Street Performance"],
    city: "New Delhi",
    state: "Delhi",
    region: "Delhi",
    image: artistFarah,
    tagline: "Nukkad natak director staging urgent stories at busy intersections.",
    bio: "Farah's troupe performs hard-hitting street theatre on civic themes — sanitation, education, road safety — for municipalities, NGOs, and festivals across North India.",
    story: [
      "Street theatre needs no ticket, no hall, no permission from silence. The audience is already there, waiting at the red light.",
      "We once performed a play about open defecation in a village where nobody would discuss it. By the third performance, the sarpanch was discussing it on stage with us.",
    ],
    price: "Quote available",
    priceNote: "Troupe of 6–10, customised scripts",
    available: true,
    availabilityNote: "Available for bookings",
    availableDays: [4, 10, 11, 17, 18, 24, 25],
    rating: 4.7,
    reviewCount: 22,
    experienceYears: 11,
    languages: ["Hindi", "Urdu", "English"],
    availableFor: ["NGOs", "Schools", "Festivals", "Corporate events", "Cultural programmes"],
    formats: ["20-min nukkad", "Full-length street play", "Issue-based custom script"],
    portfolio: [artistFarah, heroAudience, storyTrain, heroPerformance],
    reviews: [
      { name: "Swachh Mission, Delhi", role: "NGO partner", quote: "Her troupe did more for our campaign in one afternoon than our posters did in a year." },
    ],
  },
  {
    slug: "dev-joshi",
    name: "Dev Joshi",
    artForm: "Kathputli Puppetry",
    categories: ["Puppetry", "Storytelling"],
    city: "Ahmedabad",
    state: "Gujarat",
    region: "Gujarat",
    image: artistDev,
    tagline: "Kathputli puppeteer — wood, cloth, string, and forty years of practice.",
    bio: "Dev inherited his puppets from his father, who inherited them from his. His shows mix classic Rajasthani tales with sharp contemporary humour that lands with children and CEOs alike.",
    story: [
      "My father made every puppet I perform with. When I hold the strings, three generations are on stage.",
      "Children today have screens that show them everything. But a puppet — a puppet makes them lean forward. That lean is worth protecting.",
    ],
    price: "From ₹9,000",
    priceNote: "45-minute show + puppet demo",
    available: true,
    availabilityNote: "Available from tomorrow",
    availableDays: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30],
    rating: 4.9,
    reviewCount: 38,
    experienceYears: 40,
    languages: ["Gujarati", "Hindi"],
    availableFor: ["Schools", "Festivals", "Private events", "Cultural programmes", "Workshops"],
    formats: ["Classic kathputli show", "Puppet-making workshop", "Roaming characters"],
    portfolio: [artistDev, storyPuppets, heroAudience, eventWorkshop],
    reviews: [
      { name: "Riverfront School", role: "School partner, Ahmedabad", quote: "The children made their own puppets after the show. Six months later they still perform them." },
    ],
    featured: true,
  },
  {
    slug: "ananya-sen",
    name: "Ananya Sen",
    artForm: "Storytelling & Dastangoi",
    categories: ["Storytelling", "Theatre"],
    city: "Lucknow",
    state: "Uttar Pradesh",
    region: "Uttar Pradesh",
    image: artistAnanya,
    tagline: "Dastango reviving Lucknow's lost art of epic oral storytelling.",
    bio: "Ananya trained in the revived Dastangoi tradition and now performs Urdu-Hindi epics, folk tales, and commissioned biographical dastans for festivals, schools, and intimate baithaks.",
    story: [
      "Dastangoi died in 1928 with its last great master, and was reborn in 2005. I am a student of that rebirth.",
      "A dastan can run for hours. People ask who has the patience. I say: people binge sixteen episodes. They have patience — we forgot how to begin the story.",
    ],
    price: "From ₹11,000",
    priceNote: "60–90 min dastan, solo or duo",
    available: false,
    availabilityNote: "Next available: mid October",
    availableDays: [18, 19, 25, 26],
    rating: 4.8,
    reviewCount: 16,
    experienceYears: 9,
    languages: ["Urdu", "Hindi", "English"],
    availableFor: ["Festivals", "Cafés", "Schools", "Cultural programmes", "Private events"],
    formats: ["Full dastan", "Folk tale set", "Commissioned biography"],
    portfolio: [artistAnanya, storyArchive, heroAudience, storyTrain],
    reviews: [
      { name: "Lucknow Literature Festival", role: "Festival partner", quote: "She held a restless evening crowd in complete silence for ninety minutes. Rare, rare craft." },
    ],
  },
  {
    slug: "manoj-gowda",
    name: "Manoj Gowda",
    artForm: "Yakshagana Folk Performance",
    categories: ["Folk Arts", "Theatre", "Dance"],
    city: "Mysuru",
    state: "Karnataka",
    region: "Karnataka",
    image: artistManoj,
    tagline: "Yakshagana performer carrying a coastal night-tradition to city stages.",
    bio: "Manoj performs condensed Yakshagana episodes with live percussion and explains the form as he goes — part performance, part living museum. He tours schools and cultural festivals across the South.",
    story: [
      "In my village, Yakshagana begins at nine at night and ends when the sun rises. The whole village stays. That is the audience I measure every stage against.",
      "The costume takes two hours. The makeup another hour. People see forty minutes. But without those three hours, the forty minutes are nothing.",
    ],
    price: "From ₹14,000",
    priceNote: "Solo episode + troupe options",
    available: true,
    availabilityNote: "Available for bookings",
    availableDays: [3, 4, 10, 11, 17, 18, 24, 31],
    rating: 4.8,
    reviewCount: 24,
    experienceYears: 26,
    languages: ["Kannada", "English", "Hindi"],
    availableFor: ["Festivals", "Schools", "Cultural programmes", "Corporate events"],
    formats: ["Condensed episode (45 min)", "Full troupe night show", "Costume & makeup demo"],
    portfolio: [artistManoj, eventFestival, storyDance, heroPerformance],
    reviews: [
      { name: "South India Culture Fest", role: "Festival director", quote: "Audiences arrived curious and left converted. His makeup demo alone is worth the booking." },
    ],
  },
];

export const artForms = [
  "Music",
  "Dance",
  "Theatre",
  "Storytelling",
  "Puppetry",
  "Folk Arts",
  "Street Performance",
];

export const cities = [...new Set(artists.map((a) => a.city))];

/* ---------------- Regions ---------------- */

export const regions = [
  { name: "Rajasthan", artists: 62, specialty: "Manganiyar & Langa music" },
  { name: "West Bengal", artists: 48, specialty: "Baul & folk theatre" },
  { name: "Gujarat", artists: 35, specialty: "Kathputli & garba" },
  { name: "Maharashtra", artists: 57, specialty: "Dhol-tasha & lavani" },
  { name: "Delhi", artists: 41, specialty: "Nukkad natak & qawwali" },
  { name: "Karnataka", artists: 38, specialty: "Yakshagana & dollu kunitha" },
  { name: "Kerala", artists: 29, specialty: "Mohiniyattam & theyyam" },
  { name: "Uttar Pradesh", artists: 44, specialty: "Dastangoi & nautanki" },
  { name: "Tamil Nadu", artists: 33, specialty: "Therukoothu & villupattu" },
  { name: "Assam", artists: 18, specialty: "Bihu & bhaona" },
];

/* ---------------- Events ---------------- */

export interface EventItem {
  slug: string;
  name: string;
  date: string;
  day: string;
  month: string;
  venue: string;
  city: string;
  lineup: string[];
  category: string;
  image: string;
  blurb: string;
  past?: boolean;
}

export const events: EventItem[] = [
  {
    slug: "courtyard-sessions-jaipur",
    name: "Courtyard Sessions: Voices of the Desert",
    date: "12 Sep 2026",
    day: "12",
    month: "Sep",
    venue: "Amber Kila Courtyard",
    city: "Jaipur",
    lineup: ["Meera Rathore", "Ravi Pawar"],
    category: "Music",
    image: eventCourtyard,
    blurb: "An intimate lantern-lit evening of Manganiyar song and dhol rhythms under the fort walls.",
  },
  {
    slug: "rhythm-in-the-classroom",
    name: "Rhythm in the Classroom",
    date: "26 Sep 2026",
    day: "26",
    month: "Sep",
    venue: "Vidya Mandir School",
    city: "Pune",
    lineup: ["Ravi Pawar"],
    category: "Workshop",
    image: eventWorkshop,
    blurb: "A hands-on percussion morning where 200 students become a pathak for a day.",
  },
  {
    slug: "river-song-festival",
    name: "River Song Festival",
    date: "03 Oct 2026",
    day: "03",
    month: "Oct",
    venue: "Prinsep Ghat",
    city: "Kolkata",
    lineup: ["Arindam Das", "The Shantiniketan Collective"],
    category: "Festival",
    image: eventFestival,
    blurb: "Baul philosophy meets the Hooghly at twilight — a riverside celebration of wandering song.",
  },
  {
    slug: "strings-and-stories",
    name: "Strings & Stories",
    date: "08 Nov 2026",
    day: "08",
    month: "Nov",
    venue: "Literature Fest Lawns",
    city: "Ahmedabad",
    lineup: ["Dev Joshi", "Ananya Sen"],
    category: "Storytelling",
    image: storyPuppets,
    blurb: "Kathputli puppets and Dastangoi epics trade tales across one shared stage.",
  },
  {
    slug: "monsoon-ragas",
    name: "Monsoon Ragas",
    date: "19 Jul 2026",
    day: "19",
    month: "Jul",
    venue: "Horniman Circle",
    city: "Mumbai",
    lineup: ["Meera Rathore", "Kavya Nair"],
    category: "Music",
    image: eventFestival,
    blurb: "A rain-soaked, unforgettable open-air evening that ended with the crowd singing the final alaap.",
    past: true,
  },
  {
    slug: "the-dancing-courtyard",
    name: "The Dancing Courtyard",
    date: "30 May 2026",
    day: "30",
    month: "May",
    venue: "Bolgatty Palace Grounds",
    city: "Kochi",
    lineup: ["Kavya Nair"],
    category: "Dance",
    image: storyDance,
    blurb: "Mohiniyattam at golden hour, followed by a public rehearsal and open Q&A.",
    past: true,
  },
  {
    slug: "platform-no-9",
    name: "Platform No. 9",
    date: "14 Mar 2026",
    day: "14",
    month: "Mar",
    venue: "Old Delhi Junction",
    city: "New Delhi",
    lineup: ["Farah Khan", "Arindam Das"],
    category: "Street Performance",
    image: storyTrain,
    blurb: "Our travelling showcase of railway performers — staged, fittingly, on a real platform.",
    past: true,
  },
];

/* ---------------- Stories ---------------- */

export interface Story {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  lede: string;
  body: string[];
  pullQuote: string;
  relatedArtist?: string;
}

export const stories: Story[] = [
  {
    slug: "platform-singers-howrah-mail",
    title: "The Platform Singers of the Howrah Mail",
    category: "Artist Stories",
    excerpt: "For thirty years, the musicians of Sealdah station have timed their ragas to departing trains. We spent a week listening.",
    readTime: "8 min read",
    author: "Ishita Rao",
    date: "Aug 2026",
    image: storyTrain,
    lede: "The 6:40 to Howrah waits for no one — except, it turns out, for the last verse of a Bhatiyali boat song.",
    body: [
      "Every evening at six, before the announcements begin, Ramakant unfolds a plastic stool beside Platform 4 and tunes an ektara older than the station's clock. He is not busking, exactly. He has a seniority here, a slot, an understanding with the porters that predates most of the CCTV cameras.",
      "The economics are precarious and the acoustics are terrible, and yet the platform produces something no concert hall manages: an audience that did not choose to be there, listening anyway. A man misses his train because the alaap is not finished. He does not seem to mind.",
      "Street Symphony began documenting the platform singers in 2024. Fourteen have since been booked for festivals, railway heritage events, and — in one glorious inversion — the inaugural performance at the station's own centenary.",
    ],
    pullQuote: "A man misses his train because the alaap is not finished. He does not seem to mind.",
    relatedArtist: "arindam-das",
  },
  {
    slug: "hands-that-hold-the-strings",
    title: "Hands That Hold the Strings",
    category: "Folk Traditions",
    excerpt: "Inside a Kathputli workshop in Ahmedabad, where a single puppet face takes three days and four generations of knowledge.",
    readTime: "6 min read",
    author: "Kabir Anand",
    date: "Jul 2026",
    image: storyPuppets,
    lede: "The puppet's eyes are painted last. 'Until then,' Dev Joshi says, 'it is only wood.'",
    body: [
      "The workshop smells of mango wood and poster paint. Puppets in every stage of becoming hang from the ceiling — heads without bodies, bodies without costumes, costumes waiting for the festival season. Dev's father carved here. His grandfather performed in the courts of Jaipur.",
      "Kathputli nearly vanished in the 1990s, squeezed out by television and shrinking patronage. What saved it was not nostalgia but adaptation: schools wanted workshops, festivals wanted heritage programming, and puppeteers like Dev learned to make a 500-year-old form speak to a 9-year-old with a smartphone.",
      "'A puppet makes children lean forward,' he says, sanding a cheek smooth. 'Screens make them lean back. That lean — that is my entire profession.'",
    ],
    pullQuote: "A puppet makes children lean forward. Screens make them lean back.",
    relatedArtist: "dev-joshi",
  },
  {
    slug: "rehearsing-400-year-old-dance",
    title: "Rehearsing a 400-Year-Old Dance in a Kochi Godown",
    category: "Dance",
    excerpt: "No mirrors, no stage lights, one ceiling fan. How a Mohiniyattam troupe prepares between temple seasons.",
    readTime: "7 min read",
    author: "Lakshmi Menon",
    date: "Jul 2026",
    image: storyDance,
    lede: "The godown rents by the hour. The tradition inside it does not know what an hour is.",
    body: [
      "Between performance seasons, Kavya Nair's troupe rehearses in a converted spice godown near Mattancherry. The floor is concrete, the mirror is a sheet of polished metal, and the jasmine is fresh every single morning — some things are not negotiable.",
      "Mohiniyattam is a form of controlled overflow: the torso sways like water, but the feet mark time with percussionist precision. Watching rehearsal is watching argument and agreement happen in the body, in real time.",
    ],
    pullQuote: "The godown rents by the hour. The tradition inside it does not know what an hour is.",
    relatedArtist: "kavya-nair",
  },
  {
    slug: "grandmothers-songbook-digitised",
    title: "A Grandmother's Songbook, Digitised",
    category: "Heritage",
    excerpt: "When Meera Rathore's family donated 200 handwritten song notebooks, our archive team spent a monsoon with them.",
    readTime: "5 min read",
    author: "Ishita Rao",
    date: "Jun 2026",
    image: storyArchive,
    lede: "The ink is fading faster than the songs. That is the entire problem, and the entire reason for the archive.",
    body: [
      "Two hundred notebooks, four languages, one lifetime of listening. Meera Rathore's grandmother wrote down every song she learned — lyrics, occasions, the names of singers she learned them from — in a hand that grows fainter every year.",
      "Our archivists photographed all 6,000 pages over one monsoon. The collection now lives in the open Street Symphony archive, searchable by raga, region, and ritual — a map of memory that belongs to everyone and no one.",
    ],
    pullQuote: "The ink is fading faster than the songs.",
    relatedArtist: "meera-rathore",
  },
  {
    slug: "one-night-jaipur-courtyard",
    title: "One Night in a Jaipur Courtyard",
    category: "Photo Essays",
    excerpt: "A photo essay from our first Courtyard Sessions — lanterns, sandstone, and a ghagra in perfect motion.",
    readTime: "4 min read",
    author: "Photographs by A. Qureshi",
    date: "May 2026",
    image: heroPerformance,
    lede: "Some evenings refuse to be described. This one insisted on being photographed.",
    body: [
      "The first Courtyard Session was supposed to host forty people. A hundred and twenty arrived. The neighbours complained, then climbed onto their own rooftops to watch, which we are choosing to count as attendance.",
      "These photographs record what the recordings could not: the light, the dust, the exact moment the dancer's skirt defied physics.",
    ],
    pullQuote: "The neighbours complained, then climbed onto their rooftops to watch.",
  },
  {
    slug: "where-the-audience-sits-cross-legged",
    title: "Where the Audience Sits Cross-Legged",
    category: "Success Stories",
    excerpt: "From a Delhi lane to forty paid bookings: how one street audience became a stage network.",
    readTime: "6 min read",
    author: "Kabir Anand",
    date: "Apr 2026",
    image: heroAudience,
    lede: "The best seat in Indian performance has always been the ground.",
    body: [
      "Farah Khan's troupe used to measure success in coins per hour. Now they measure it in rebookings. The lane performances continue — that is non-negotiable — but the platform routes the attention they generate toward paid stages: schools, festivals, municipal campaigns.",
      "'The street taught us everything,' Farah says. 'Street Symphony just taught the street to send invoices.' She is joking, mostly.",
    ],
    pullQuote: "The street taught us everything. Street Symphony just taught the street to send invoices.",
    relatedArtist: "farah-khan",
  },
];

export const storyCategories = [
  "All",
  "Artist Stories",
  "Folk Traditions",
  "Music",
  "Dance",
  "Theatre",
  "Heritage",
  "Photo Essays",
  "Success Stories",
];

/* ---------------- Testimonials ---------------- */

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image?: string;
  tone: "cream" | "rose" | "peach";
}

export const testimonials: Testimonial[] = [
  {
    name: "Meera Rathore",
    role: "Rajasthani Folk Artist, Jaipur",
    quote: "For the first time in my family's four generations of singing, we have a diary full of stages instead of a hope full of maybes.",
    image: artistMeera,
    tone: "cream",
  },
  {
    name: "Vikram Mehta",
    role: "Event Organiser, Mumbai",
    quote: "I booked three artists in one afternoon. The portfolios told me exactly what I was getting — and the performances exceeded them.",
    tone: "rose",
  },
  {
    name: "Dr. Nandini Iyer",
    role: "Cultural Institution, Chennai",
    quote: "Street Symphony does what institutions struggle to do: it finds artists where they actually live and presents them with genuine dignity.",
    tone: "peach",
  },
  {
    name: "Sister Margaret D'Souza",
    role: "School Principal, Kochi",
    quote: "Kavya's workshop taught our students more about Kerala's heritage in one morning than a term of textbooks.",
    tone: "cream",
  },
  {
    name: "Rohan Chatterjee",
    role: "Audience Member, Kolkata",
    quote: "I came for a riverside concert and left knowing the names of songs my grandfather used to hum. I didn't know I was looking for that.",
    tone: "rose",
  },
];

/* ---------------- Impact ---------------- */

export const impactStats = [
  { value: 500, suffix: "+", label: "Artists documented" },
  { value: 250, suffix: "+", label: "Paid bookings" },
  { value: 75, suffix: "+", label: "Performances organised" },
  { value: 40, suffix: "+", label: "Partner organisations" },
];

export const impactExtended = [
  { value: 28, suffix: "", label: "Cities reached" },
  { value: 120, suffix: "+", label: "Workshops delivered" },
  { value: 90, suffix: "k+", label: "Audience members reached" },
  { value: 14, suffix: "", label: "Art forms archived" },
];

/* ---------------- Booking ---------------- */

export type BookingStatus =
  | "Pending"
  | "Under Discussion"
  | "Accepted"
  | "Confirmed"
  | "Completed"
  | "Declined"
  | "Cancelled";

export interface BookingRequest {
  id: string;
  booker: string;
  event: string;
  date: string;
  location: string;
  budget: string;
  message: string;
  status: BookingStatus;
}

export const sampleRequests: BookingRequest[] = [
  {
    id: "BK-1042",
    booker: "Aisha Verma",
    event: "Wedding sangeet",
    date: "14 Nov 2026",
    location: "Udaipur",
    budget: "₹40,000–₹60,000",
    message: "We'd love a 90-minute Manganiyar set for our sangeet evening. Outdoor courtyard venue, ~150 guests.",
    status: "Pending",
  },
  {
    id: "BK-1038",
    booker: "Heritage Hotels Group",
    event: "Weekly courtyard residency",
    date: "Every Saturday, Oct–Dec",
    location: "Jaipur",
    budget: "₹25,000 per evening",
    message: "Exploring a recurring folk music residency for our property's courtyard. Can we discuss a season rate?",
    status: "Under Discussion",
  },
  {
    id: "BK-1021",
    booker: "TechSpark India",
    event: "Annual cultural evening",
    date: "20 Sep 2026",
    location: "Bengaluru",
    budget: "₹30,000–₹45,000",
    message: "Corporate Diwali celebration for 300 employees. Looking for a folk ensemble with high audience energy.",
    status: "Accepted",
  },
];

export const statusTone: Record<BookingStatus, string> = {
  Pending: "bg-peach text-cocoa",
  "Under Discussion": "bg-rose/40 text-cocoa",
  Accepted: "bg-sage/25 text-cocoa",
  Confirmed: "bg-sage text-cream",
  Completed: "bg-cocoa text-cream",
  Declined: "bg-muted text-muted-foreground",
  Cancelled: "bg-muted text-muted-foreground line-through",
};
