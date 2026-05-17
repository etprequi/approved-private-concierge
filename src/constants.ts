import { Vehicle, Addon, SecurityPackage } from './types';

export const ADDONS: Addon[] = [
  { id: "a1", name: "Chauffeur", price: 400, unit: "per_day" },
  { id: "a2", name: "Delivery to Location", price: 150, unit: "flat" },
  { id: "a3", name: "Insurance Waiver", price: 200, unit: "flat" },
  { id: "a4", name: "Fuel Package", price: 100, unit: "flat" },
  { id: "a5", name: "Red Carpet Setup", price: 250, unit: "flat" },
];

export const SECURITY_PACKAGES: SecurityPackage[] = [
  {
    id: "s1",
    name: "Standard Protection",
    tier: "Standard",
    description: "Discrete personal protection for low-profile transit.",
    price: "Inquire",
    features: ["1 Armed Bodyguard", "Strategic Planning", "Secure Transport Coordination"]
  },
  {
    id: "s2",
    name: "Premium Protection",
    tier: "Premium",
    description: "Enhanced security for high-profile individuals and public appearances.",
    price: "Inquire",
    features: ["2 Armed Bodyguards", "Counter-Surveillance", "Advanced Route Planning", "Medical First Responder"]
  },
  {
    id: "s3",
    name: "Presidential Protection",
    tier: "Presidential",
    description: "Maximum security ensemble for ultra-high-net-worth clients and public figures.",
    price: "Inquire",
    features: ["3 Armed Bodyguards", "Lead & Chase Vehicle Coordination", "Full Perimeter Control", "24/7 Rapid Response"]
  },
  {
    id: "s4",
    name: "Presidential Escort",
    tier: "Escort",
    description: "A black luxury truck escort/security convoy service.",
    price: "Inquire",
    features: ["Black Luxury SUV Convoy", "Tactical Support Team", "Government-Level Coordination", "Full Discretion"]
  }
];

export const AVIATION_FLEET: Vehicle[] = [
  {
    id: "j1",
    make: "Learjet",
    model: "45",
    year: 2023,
    category: "JET",
    color: "Pearl White",
    colorHex: "#F5F5F5",
    dailyRate: 0,
    deposit: 0,
    seats: 8,
    status: "available",
    features: ["8 Seater", "Two Honeywell TFE731-20AR TurboFan Engines", "Private Cabin", "High-Speed Cruise"],
    photo: "/images/Learjet_45.jpg",
    photos: ["/images/Learjet_45.jpg", "/images/Learjet_45_In.jpg"],
    description: "The Learjet 45 offers sleek performance and eight-seat comfort, powered by twin Honeywell TFE731-20AR turbofan engines."
  },
  {
    id: "j2",
    make: "Bombardier",
    model: "Challenger 350",
    year: 2023,
    category: "JET",
    color: "Obsidian Black",
    colorHex: "#000000",
    dailyRate: 0,
    deposit: 0,
    seats: 10,
    status: "available",
    features: ["10 Seater", "Two Honeywell HTF7350 Turbofan Engines", "Global Range", "Executive Cabin"],
    photo: "/images/Bombardier Challenger.webp",
    photos: ["/images/Bombardier Challenger.webp", "/images/Challenger_In.webp"],
    description: "The Challenger 350 is a ten-seat super-midsize jet powered by twin Honeywell HTF7350 turbofan engines for premium intercontinental travel."
  }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  ...AVIATION_FLEET,
  {
    id: "v1",
    make: "Lamborghini",
    model: "Urus",
    year: 2024,
    category: "CARS",
    color: "Yellow",
    colorHex: "#FFD700",
    colorOptions: [
      { label: 'Yellow', hex: '#FFD700', photo: '/images/Lambo_Urus_Yellow.jpg' },
      { label: 'White', hex: '#FFFFFF', photo: '/images/Lambo_Urus_White.jpg' }
    ],
    dailyRate: 1200,
    deposit: 2000,
    seats: 4,
    status: "available",
    features: ["AWD", "Carbon Fiber Package", "Bang & Olufsen Sound", "Panoramic Roof"],
    photo: "/images/Lambo_Urus_Yellow.jpg",
    description: "The world's first Super SUV. Raw power meets everyday usability in the most aggressive Lamborghini ever built."
  },
  {
    id: "v2",
    make: "Lamborghini",
    model: "Huracan",
    year: 2023,
    category: "CARS",
    color: "Red",
    colorHex: "#C40000",
    colorOptions: [
      { label: 'Red', hex: '#C40000', photo: '/images/Lambco_Huracan_Red.jpg' },
      { label: 'Black', hex: '#000000', photo: '/images/Lambco_Huracan_Black.jpg' },
      { label: 'White', hex: '#FFFFFF', photo: '/images/Lambco_Huracan_White.jpg' }
    ],
    dailyRate: 1500,
    deposit: 2000,
    seats: 2,
    status: "available",
    features: ["V10 Engine", "Magnetic Suspension", "Carbon Ceramic Brakes"],
    photo: "/images/Lambco_Huracan_Red.jpg",
    description: "A razor-sharp supercar delivering uncompromised performance and handling."
  },
  {
    id: "v3",
    make: "Rolls-Royce",
    model: "Cullinan",
    year: 2024,
    category: "CARS",
    color: "Black",
    colorHex: "#000000",
    colorOptions: [
      { label: 'Black', hex: '#000000', photo: '/images/Rolls_Royce_Cullinan_Black.jpg' },
      { label: 'White', hex: '#FFFFFF', photo: '/images/Rolls_Royce_Cullinan_White.jpg' }
    ],
    dailyRate: 1500,
    deposit: 3000,
    seats: 5,
    status: "available",
    features: ["V12 Engine", "Luxury Interior", "Rear Theatre"],
    photo: "/images/Rolls_Royce_Cullinan_Black.jpg",
    description: "A statement of ultimate presence and comfort; the Cullinan is the SUV for the most discerning clients."
  },
  {
    id: "v4",
    make: "McLaren",
    model: "720S",
    year: 2024,
    category: "CARS",
    color: "White",
    colorHex: "#FFFFFF",
    colorOptions: [
      { label: 'White', hex: '#FFFFFF', photo: '/images/McLaren_White.jpg' },
      { label: 'Red', hex: '#C40000', photo: '/images/McLaren_Red.jpg' },
      { label: 'Black', hex: '#000000', photo: '/images/McLaren_Black.jpg' }
    ],
    dailyRate: 1800,
    deposit: 2500,
    seats: 2,
    status: "available",
    features: ["Twin-Turbo V8", "720HP", "Carbon Fiber Monocoque", "Active Dynamics"],
    photo: "/images/McLaren_White.jpg",
    description: "The McLaren 720S is a masterpiece of engineering — 720 horsepower of pure British performance wrapped in stunning aerodynamic design."
  },
  {
    id: "y1",
    make: "Sea Ray",
    model: "65ft Epic",
    year: 2023,
    category: "YACHT",
    color: "White",
    colorHex: "#F8F8F8",
    dailyRate: 0,
    deposit: 0,
    seats: 12,
    status: "available",
    features: ["Full Crew", "Master Suite", "Outdoor Deck", "Premium Sound System"],
    photo: "/images/Sea_Ray.jpg",
    photos: ["/images/Sea_Ray.jpg", "/images/Sea_Ray_In.jpg"],
    description: "The Sea Ray 65ft Epic delivers an unparalleled on-water experience with full crew, a master suite, and open-ocean capability for up to 12 guests."
  },
  {
    id: "y2",
    make: "Azimut",
    model: "85ft Flybridge",
    year: 2023,
    category: "YACHT",
    color: "White",
    colorHex: "#F8F8F8",
    dailyRate: 0,
    deposit: 0,
    seats: 14,
    status: "available",
    features: ["Full Crew", "Jacuzzi", "Flybridge Deck", "Master Suite", "Water Toys"],
    photo: "/images/Azimut_85.webp",
    photos: ["/images/Azimut_85.webp", "/images/Azimut85_In.webp"],
    description: "The Azimut 85ft Flybridge is the pinnacle of open-sea luxury — featuring a jacuzzi, full crew, and a stunning flybridge deck for up to 14 guests."
  },
  {
    id: "y3",
    make: "Azimut",
    model: "100ft Grande",
    year: 2024,
    category: "YACHT",
    color: "White",
    colorHex: "#F8F8F8",
    dailyRate: 0,
    deposit: 0,
    seats: 16,
    status: "available",
    features: ["Full Crew", "Master Suite", "Multiple Cabins", "Jacuzzi", "Water Toys", "Gourmet Kitchen"],
    photo: "/images/Azimut_100.webp",
    photos: ["/images/Azimut_100.webp", "/images/Azimut100_In.webp"],
    description: "The Azimut 100ft Grande is our flagship superyacht — an extraordinary vessel delivering world-class luxury for up to 16 guests with full crew and every amenity."
  }
];