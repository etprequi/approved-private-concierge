export type Category = 'CARS' | 'YACHT' | 'JET' ;

export interface SecurityPackage {
  id: string;
  name: string;
  description: string;
  price: string; // Using string for "Inquire" or fixed price
  tier: 'Standard' | 'Premium' | 'Presidential' | 'Escort';
  features: string[];
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  category: Category;
  color: string;
  colorHex: string;
  colorOptions?: { label: string; hex: string }[];
  dailyRate: number;
  deposit: number;
  seats: number;
  status: 'available' | 'booked' | 'maintenance';
  features: string[];
  photo: string;
  description: string;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  unit: 'per_day' | 'flat';
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idVerified: boolean;
  vipStatus: boolean;
  notes: string;
  licenseNumber: string;
  licenseExpiry: string;
  lifetimeSpend?: number;
  bookingCount?: number;
}

export interface Booking {
  id: string;
  vehicleId: string;
  customerId: string;
  startDate: string;
  endDate: string;
  status: 'inquiry' | 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  pickupLocation: string;
  dropoffLocation: string;
  addOns: string[];
  depositPaid: boolean;
  paymentMethod: 'card' | 'cash';
  notes: string;
  createdAt: string;
  total?: number;
}

export type Role = 'Super Admin' | 'Manager' | 'Booking Agent' | 'Fleet Manager' | 'Concierge Staff';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface ActivityLog {
  id: string;
  adminId: string;
  action: string;
  timestamp: string;
  targetId?: string;
  targetType?: 'booking' | 'vehicle' | 'customer';
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: 'Routine' | 'Repair' | 'Inspection';
  status: 'Scheduled' | 'In Progress' | 'Completed';
  date: string;
  notes: string;
}
