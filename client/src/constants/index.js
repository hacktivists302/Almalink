import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo,yourlogo,yourlogo,yourlogo,yourlogo,yourlogo];

export const brainwaveServices = [
  "Generating Network",
  "Enhancing Career",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "AI Matchmaking",
    text: "Empower the matchmaking process with AI, enabling seamless voice command interactions for effortless, hands-free user experiences.",
    date: "Aug 2024",
    status: "In production",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Video Calls",
    text: "Introduce video call options, enabling real-time face-to-face interactions to enhance user engagement and build stronger connections.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },


];

export const collabText =
  "Empower your alumni network with seamless connectivity and robust engagement tools, creating lasting bonds and driving meaningful impact for future generations.";

export const collabContent = [
  {
    id: "0",
    title: "Tech Communities",
    text: collabText,
  },
  {
    id: "1",
    title: " Know actual market trends",
  },
  {
    id: "2",
    title: "Top-notch guidence",
  },
];



export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "personalized recommendations, Chat and Community",
    price: "0",
    features: [
      "AI chatbot offering personalized, accurate responses to queries.",
      "Tailored recommendations based on individual user preferences.",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced Chat, Premium community, Video Call",
    price: "999",
    features: [
    "Smart AI matchmaking for personalized alumni connections.",
    "Seamless video calls enhancing alumni-student engagement.",
    "Priority support ensures quick resolution of any issues.",
    ],
  },

];

export const benefits = [
  {
    id: "0",
    title: "Ask anything",
    text: "Lets Students quickly finnd right guidence",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
    {
    id: "1",
    title: "Connect everywhere",
    text: "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },

];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
