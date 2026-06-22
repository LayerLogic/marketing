export const site = {
  name: "LayerLogic",
  url: "https://layerlogic.se",
  title: "LayerLogic",
  description:
    "LayerLogic builds a portable sensor that detects Listeria on the production line in fifteen minutes. No lab, no shipping, no waiting two days for an answer.",
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

export interface Backer {
  name: string;
  location: string;
  logo: string;
  blurb: string;
  /** Override the default cream-plate logo treatment (e.g. dark avatars). */
  logoClass?: string;
}

export const investors: Backer[] = [
  {
    name: "Chalmers Ventures",
    location: "Gothenburg · SE",
    logo: "assets/partners/chalmers-ventures.png",
    blurb:
      "The innovation and investment arm of Chalmers University of Technology, where our graphene research originated.",
  },
  {
    name: "Scientifica VC",
    location: "Rome · IT",
    logo: "assets/partners/scientifica.svg",
    blurb:
      "Italy-based venture fund backing science-led startups across advanced materials, deep biology and graphene technology.",
  },
  {
    name: "EIT Food",
    location: "EU programme",
    logo: "assets/partners/eit-food.png",
    blurb:
      "Europe's largest food innovation community, supported by the European Institute of Innovation and Technology.",
  },
  {
    name: "Yeos Ventures",
    location: "Stockholm · SE",
    logo: "assets/partners/yeos-ventures.png",
    logoClass: "logo-avatar",
    blurb:
      "An investment collective of 120+ Swedish entrepreneurs from Young Entrepreneurs of Sweden (YEoS), backing early-stage companies with capital and their networks.",
  },
  {
    name: "X&Y Invest",
    location: "Gothenburg · SE",
    logo: "assets/partners/xy-invest.png",
    blurb:
      "Gothenburg based family office investing in exceptional founders building the future.",
  },
  {
    name: "Business Angels",
    location: "Europe",
    logo: "assets/partners/business-angels.svg",
    blurb:
      "A cohort of qualified business angels across Europe backing early-stage deep-tech.",
  },
];

export interface Recognition {
  name: string;
  detail: string;
  logo: string;
  blurb: string;
  /** Override the default cream-plate logo treatment (e.g. dark badges). */
  logoClass?: string;
}

export const recognitions: Recognition[] = [
  {
    name: "MassChallenge",
    detail: "Global accelerator cohort",
    logo: "assets/recognitions/masschallenge.png",
    blurb:
      "Selected into the MassChallenge cohort — a global accelerator that has helped over 3,000 startups raise more than $9B.",
  },
  {
    name: "Forbes 30 Under 30",
    detail: "Europe · Manufacturing & Industry",
    logo: "assets/recognitions/forbes-30u30.png",
    logoClass: "logo-avatar",
    blurb:
      "Featured in Forbes' annual list of young innovators reshaping their industries — Europe edition, Manufacturing & Industry category.",
  },
  {
    name: "EIT Food",
    detail: "FAN accelerator",
    logo: "assets/recognitions/eit-food.png",
    blurb:
      "Selected into the EIT Food Accelerator Network (FAN) — Europe's leading accelerator for high-potential food-tech startups.",
  },
  {
    name: "SIO Grafen",
    detail: "Strategic innovation programme",
    logo: "assets/recognitions/sio-grafen.png",
    blurb:
      "Recognized and funded by Sweden's national graphene programme for our work on field-effect biosensors.",
  },
  {
    name: "Formas",
    detail: "Swedish research council",
    logo: "assets/recognitions/formas.png",
    blurb:
      "Backed by Formas, the Swedish government research council funding sustainable development, food and agriculture.",
  },
];

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
    education: "MSc Business Development & BSc Mechanical Engineering",
    email: "andre.persson@layerlogic.se",
    photo: "assets/team_members/Andre.JPG",
  },
  {
    name: "Sebastian Samuelsson",
    role: "CFO & Founder",
    education: "MSc Business Development & BSc Industrial Engineering and Management",
    email: "sebastian.samuelsson@layerlogic.se",
    photo: "assets/team_members/Sebastian.JPG",
  },
  {
    name: "Ebba Sandbecker",
    role: "CCO & Founder",
    education: "MSc Business Development & BSc Industrial Management & Production Engineering",
    email: "ebba.sandbecker@layerlogic.se",
    photo: "assets/team_members/Ebba.JPG",
  },
  {
    name: "Avgust Yurgens",
    role: "Founder & Professor",
    education: "Prof., Microtechnology & Nanoscience",
    email: "avgust.yurgens@layerlogic.se",
    photo: "assets/team_members/Avgust.JPG",
  },
  {
    name: "Santosh Pandit",
    role: "Founder & Senior Researcher",
    education: "PhD, Systems & Microbiology",
    email: "santosh.pandit@layerlogic.se",
    photo: "assets/team_members/Santosh.JPG",
  },
  {
    name: "Munis Khan",
    role: "Founder & Doctoral Researcher",
    education: "PhD, Microtechnology & Nanoscience",
    email: "munis.khan@layerlogic.se",
    photo: "assets/team_members/Munis.JPG",
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
  },
];
