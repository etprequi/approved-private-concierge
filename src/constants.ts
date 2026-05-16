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
  { id: "j1", make: "Learjet", model: "45", year: 2023, category: "JET", color: "Pearl White", colorHex: "#F5F5F5", dailyRate: 0, deposit: 0, seats: 8, status: "available", features: ["8 Seater", "Two Honeywell TFE731-20AR TurboFan Engines", "Private Cabin", "High-Speed Cruise"], photo: "/images/Learjet 45.jpg", description: "The Learjet 45 offers sleek performance and eight-seat comfort, powered by twin Honeywell TFE731-20AR turbofan engines." },
  { id: "j2", make: "Bombardier", model: "Challenger 350", year: 2023, category: "JET", color: "Obsidian Black", colorHex: "#000000", dailyRate: 0, deposit: 0, seats: 10, status: "available", features: ["10 Seater", "Two Honeywell HTF7350 Turbofan Engines", "Global Range", "Executive Cabin"], photo: "/images/Bombardier Challenger.jpg", description: "The Challenger 350 is a ten-seat super-midsize jet powered by twin Honeywell HTF7350 turbofan engines for premium intercontinental travel." }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  // include aviation fleet first
  ...AVIATION_FLEET,
  // Lamborghini Urus
  {
    id: "v1",
    make: "Lamborghini",
    model: "Urus",
    year: 2024,
    category: "CARS",
    color: "Yellow",
    colorHex: "#FFD700",
    colorOptions: [
      { label: 'Yellow', hex: '#FFD700' },
      { label: 'White', hex: '#FFFFFF' }
    ],
    dailyRate: 1200,
    deposit: 2000,
    seats: 4,
    status: "available",
    features: ["AWD", "Carbon Fiber Package", "Bang & Olufsen Sound", "Panoramic Roof"],
    photo: "/images/Lambo_Urus_Yellow.jpg",
    description: "The world's first Super SUV. Raw power meets everyday usability in the most aggressive Lamborghini ever built."
  },
  // Lamborghini Huracan
  {
    id: "v2",
    make: "Lamborghini",
    model: "Huracan",
    year: 2023,
    category: "CARS",
    color: "Red",
    colorHex: "#C40000",
    colorOptions: [
      { label: 'Red', hex: '#C40000' },
      { label: 'Black', hex: '#000000' },
      { label: 'White', hex: '#FFFFFF' }
    ],
    dailyRate: 1500,
    deposit: 2000,
    seats: 2,
    status: "available",
    features: ["V10 Engine", "Magnetic Suspension", "Carbon Ceramic Brakes"],
    photo: "/images/Lambco_Huracan_Red.jpg",
    description: "A razor-sharp supercar delivering uncompromised performance and handling."
  },
  // Rolls-Royce Cullinan
  {
    id: "v3",
    make: "Rolls-Royce",
    model: "Cullinan",
    year: 2024,
    category: "CARS",
    color: "Black",
    colorHex: "#000000",
    colorOptions: [
      { label: 'Black', hex: '#000000' },
      { label: 'White', hex: '#FFFFFF' }
    ],
    dailyRate: 1500,
    deposit: 3000,
    seats: 5,
    status: "available",
    features: ["V12 Engine", "Luxury Interior", "Rear Theatre"],
    photo: "/images/Rolls_Royce_Cullinan_Black.jpg",
    description: "A statement of ultimate presence and comfort; the Cullinan is the SUV for the most discerning clients."
  }
];
