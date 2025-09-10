export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  featured?: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

export interface Request {
  id: string;
  type: 'service' | 'product' | 'food';
  title: string;
  description: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  datePreference: string;
  timePreference: string;
  budget?: number;
  assignedEmployee?: string;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
  paymentStatus: 'pending' | 'paid' | 'verified' | 'rejected';
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'dispatcher' | 'rider' | 'driver' | 'service-provider';
  status: 'active' | 'inactive';
  completedJobs: number;
  rating: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'product' | 'food';
}