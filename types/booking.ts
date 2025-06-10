export interface Booking {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service: string;
  date: string; // ISO date string
  status: 'pending' | 'confirmed' | 'cancelled' | string;
  created_at: string; // ISO date string
  [key: string]: any; // For any additional dynamic fields
}