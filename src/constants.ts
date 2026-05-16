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
  // STANDARD JETS
  { id: "j1", make: "Hawker", model: "400 XP", year: 2022, category: "JET", color: "Arctic White", colorHex: "#ffffff", dailyRate: 0, deposit: 0, seats: 7, status: "available", features: ["Standard Jet", "Range: 1,500nm", "Quiet Cabin"], photo: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=80", description: "The Hawker 400XP is the product of years of refinement by Beechcraft." },
  { id: "j2", make: "Dassault", model: "Falcon 10", year: 2021, category: "JET", color: "Silver", colorHex: "#C0C0C0", dailyRate: 0, deposit: 0, seats: 6, status: "available", features: ["Standard Jet", "High Speed", "Versatile"], photo: "https://images.unsplash.com/photo-1583663848850-47af132dc08e?w=1200&q=80", description: "Compact power and efficiency for short-to-mid range missions." },
  // MID-TIER JETS
  { id: "j3", make: "Bombardier", model: "Challenger 350", year: 2023, category: "JET", color: "Obsidian Black", colorHex: "#000000", dailyRate: 0, deposit: 0, seats: 10, status: "available", features: ["Mid-Tier", "Global Range", "Elite Interior"], photo: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=1200&q=80", description: "The best-selling business jet of the last decade. Luxury without compromise." },
  { id: "j4", make: "Gulfstream", model: "G280", year: 2024, category: "JET", color: "Platinum", colorHex: "#E5E4E2", dailyRate: 0, deposit: 0, seats: 10, status: "available", features: ["Mid-Tier", "Speed Record Holder", "Quiet Performance"], photo: "https://images.unsplash.com/photo-1626244844391-744040974edb?w=1200&q=80", description: "Unrivaled performance in the super-midsize category." },
  // PRESIDENTIAL
  { id: "j5", make: "Boeing", model: "Business Jet BBJ", year: 2024, category: "JET", color: "White/Gold", colorHex: "#f0f0f0", dailyRate: 0, deposit: 0, seats: 19, status: "available", features: ["Presidential", "Apartment-Style Cabin", "Master Bedroom", "Global Connectivity"], photo: "https://images.unsplash.com/photo-1520437358207-323b43b50729?w=1200&q=80", description: "The ultimate airborne office and luxury residence. True global reach." }
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
    color: "Nero (Black)",
    colorHex: "#1a1a1a",
    colorOptions: [
      { label: 'Yellow', hex: '#FFD700' },
      { label: 'White', hex: '#FFFFFF' }
    ],
    dailyRate: 1200,
    deposit: 2000,
    seats: 4,
    status: "available",
    features: ["AWD", "Carbon Fiber Package", "Bang & Olufsen Sound", "Panoramic Roof"],
    photo: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=80",
    description: "The world's first Super SUV. Raw power meets everyday usability in the most aggressive Lamborghini ever built."
  },
  // Lamborghini Huracan
  {
    id: "v2",
    make: "Lamborghini",
    model: "Huracan",
    year: 2023,
    category: "CARS",
    color: "Rosso (Red)",
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
    photo: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=80",
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
    photo: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=80",
    description: "A statement of ultimate presence and comfort; the Cullinan is the SUV for the most discerning clients."
  }
];
