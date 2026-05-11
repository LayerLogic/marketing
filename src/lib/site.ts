export const site = {
  name: "LayerLogic",
  url: "https://layerlogic.se",
  title: "LayerLogic — Pathogens, detected in minutes. Not days.",
  description:
    "LayerLogic builds a handheld biosensor based on graphene field-effect transistors — bringing PCR-grade pathogen detection out of the lab and onto the production line.",
  region: "SE · GBG",
  version: "v1.0",
  email: "hello@layerlogic.se",
  address: {
    street: "Medicinaregatan 8A",
    postal: "413 90 Göteborg",
    country: "Sverige",
  },
  coords: { lat: "57.6878° N", lng: "11.9682° E", tz: "CET" },
  social: {
    linkedin: "#",
    x: "#",
  },
} as const;

export const navItems = [
  { href: "#technology", label: "Technology" },
  { href: "#science", label: "Science" },
  { href: "#company", label: "Company" },
  { href: "#investors", label: "Investors" },
] as const;

export const investors = [
  { name: "Scientifica VC", location: "London · UK" },
  { name: "Chalmers Ventures", location: "Gothenburg · SE" },
  { name: "EIT Food", location: "EU programme" },
  { name: "MassChallenge", location: "Boston · US" },
  { name: "Yeos Ventures", location: "Singapore" },
  { name: "SIO Grafen", location: "SE programme" },
] as const;

export const founders = [
  {
    name: "Founder 01",
    role: "CEO",
    affil: "PhD, Physics — Chalmers",
    angle: 45,
  },
  {
    name: "Founder 02",
    role: "CTO",
    affil: "PhD, Graphene electronics — Chalmers",
    angle: 135,
  },
  {
    name: "Founder 03",
    role: "Chief Scientist",
    affil: "Prof., Microbiology — Chalmers",
    angle: 90,
  },
  {
    name: "Founder 04",
    role: "Head of Hardware",
    affil: "MSc, Electrical Eng. — Chalmers",
    angle: 45,
  },
  {
    name: "Founder 05",
    role: "Head of Biochemistry",
    affil: "PhD, Biochemistry — GU",
    angle: 135,
  },
  {
    name: "Founder 06",
    role: "Head of Operations",
    affil: "MSc, Industrial Eng. — Chalmers",
    angle: 90,
  },
] as const;

export const research = [
  {
    name: "Researcher 01",
    affil: "PhD candidate, Surface chem.",
    angle: 45,
  },
  { name: "Researcher 02", affil: "Postdoc, Microbiology", angle: 135 },
] as const;

export const engineering = [
  {
    name: "Engineer 01",
    affil: "Firmware & signal processing",
    angle: 90,
  },
  {
    name: "Engineer 02",
    affil: "Mechanical & cartridge design",
    angle: 45,
  },
] as const;

