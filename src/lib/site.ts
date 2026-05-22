export const site = {
  name: "LayerLogic",
  url: "https://layerlogic.se",
  title: "LayerLogic",
  description:
    "LayerLogic builds a handheld sensor that finds Listeria on the production line in fifteen minutes. No lab, no shipping, no waiting two days for an answer.",
  region: "SE · GBG",
  email: "hello@layerlogic.se",
  address: {
    street: "Medicinaregatan 8A",
    postal: "413 90 Göteborg",
    country: "Sverige",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/layerlogic-ab",
  },
} as const;

export const navItems = [
  { href: "#technology", label: "Technology" },
  { href: "#science", label: "Science" },
  { href: "#investors", label: "Investors" },
  { href: "#company", label: "Company" },
] as const;

export const investors = [
  {
    name: "Scientifica VC",
    location: "London · UK",
    logo: "/assets/partners/scientifica.svg",
    blurb:
      "London-based venture fund backing science-led startups — advanced materials, deep biology and graphene technology.",
  },
  {
    name: "Chalmers Ventures",
    location: "Gothenburg · SE",
    logo: "/assets/partners/chalmers-ventures.svg",
    blurb:
      "The innovation and investment arm of Chalmers University of Technology, where our graphene research originated.",
  },
  {
    name: "EIT Food",
    location: "EU programme",
    logo: "/assets/partners/eit-food.svg",
    blurb:
      "Europe's largest food innovation community, supported by the European Institute of Innovation and Technology.",
  },
  {
    name: "MassChallenge",
    location: "Boston · US",
    logo: "/assets/partners/masschallenge.svg",
    blurb:
      "Global accelerator network that helps early-stage, high-impact startups scale into industry leaders.",
  },
  {
    name: "Yeos Ventures",
    location: "Singapore",
    logo: "/assets/partners/yeos-ventures.svg",
    blurb:
      "Singapore-based corporate venture arm investing across food, agritech and consumer markets in Asia.",
  },
  {
    name: "SIO Grafen",
    location: "SE programme",
    logo: "/assets/partners/sio-grafen.svg",
    blurb:
      "Sweden's national strategic innovation programme for graphene applications and commercialization.",
  },
] as const;

export const recognitions = [
  {
    name: "MassChallenge",
    detail: "Global accelerator cohort",
    logo: "/assets/recognitions/masschallenge.svg",
    blurb:
      "Selected into the MassChallenge cohort — a global accelerator that has helped over 3,000 startups raise more than $9B.",
  },
  {
    name: "Forbes 30 Under 30",
    detail: "Europe · Science",
    logo: "/assets/recognitions/forbes-30u30.svg",
    blurb:
      "Featured in Forbes' annual list of young innovators reshaping their industries — Europe edition, Science category.",
  },
  {
    name: "EIT Food",
    detail: "RisingFoodStars alumni",
    logo: "/assets/recognitions/eit-food.svg",
    blurb:
      "Member of EIT Food's RisingFoodStars — a select group of high-potential food-tech scaleups across Europe.",
  },
  {
    name: "SIO Grafen",
    detail: "Strategic innovation programme",
    logo: "/assets/recognitions/sio-grafen.svg",
    blurb:
      "Recognized and funded by Sweden's national graphene programme for our work on field-effect biosensors.",
  },
] as const;

export interface TeamMember {
  name: string;
  role: string;
  education: string;
  email: string;
  photo: string;
  photoStyle?: string;
}

export const founders: TeamMember[] = [
  {
    name: "André Persson",
    role: "CEO & Founder",
    education: "MSc, Industrial Management & Production Engineering",
    email: "andre.persson@layerlogic.se",
    photo: "assets/team_members/Andre.JPG",
  },
  {
    name: "Sebastian Samuelsson",
    role: "CFO & Founder",
    education: "MSc, Industrial Management & Production Engineering",
    email: "sebastian.samuelsson@layerlogic.se",
    photo: "assets/team_members/Sebastian.JPG",
  },
  {
    name: "Ebba Sandbecker",
    role: "CCO & Founder",
    education: "MSc, Industrial Management & Production Engineering",
    email: "ebba.sandbecker@layerlogic.se",
    photo: "assets/team_members/Ebba.JPG",
  },
  {
    name: "Avgust Yurgens",
    role: "Founder & Professor",
    education: "PhD, Quantum Device Physics",
    email: "avgust.yurgens@layerlogic.se",
    photo: "assets/team_members/Avgust.JPG",
  },
  {
    name: "Santosh Pandit",
    role: "Founder & Senior Researcher",
    education: "PhD, Microbiology",
    email: "santosh.pandit@layerlogic.se",
    photo: "assets/team_members/Santosh.JPG",
  },
  {
    name: "Munis Khan",
    role: "Founder & Doctoral Researcher",
    education: "PhD, Nanoelectronics",
    email: "munis.khan@layerlogic.se",
    photo: "assets/team_members/Kopia.png",
  },
];

export const engineering: TeamMember[] = [
  {
    name: "Mohammed Agha",
    role: "Head of Software Engineering",
    education: "MSc, Software Engineering & Technology",
    email: "mohammed.agha@layerlogic.se",
    photo: "assets/team_members/Mohammed.JPG",
  },
  {
    name: "Elnaz Danesh",
    role: "Chemical Engineer",
    education: "MSc, Chemical Engineering",
    email: "elnaz.danesh@layerlogic.se",
    photo: "assets/team_members/Elnaz.jpeg",
    photoStyle: "transform: scale(1.2); transform-origin: center 30%;",
  },
];
