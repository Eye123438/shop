import { Service, Product, FoodItem, Request, Employee } from '../types';

export const services: Service[] = [
  { id: '1', name: 'Taxi Rides', icon: '🚖', description: 'Safe and reliable transportation' },
  { id: '2', name: 'Grocery Shopping & Delivery', icon: '🛒', description: 'Fresh groceries delivered to your door' },
  { id: '3', name: 'Laundry & Dry-Cleaning', icon: '👔', description: 'Professional cleaning services' },
  { id: '4', name: 'Gift & Parcel Delivery', icon: '📦', description: 'Same-day delivery service' },
  { id: '5', name: 'Utility & Bill Payments', icon: '💳', description: 'Pay your bills hassle-free' },
  { id: '6', name: 'Prescription Runs', icon: '💊', description: 'Medicine pickup and delivery' },
  { id: '7', name: 'School & Office Errands', icon: '🎒', description: 'Document collection and delivery' },
  { id: '8', name: 'Airport Pickups & Drop-offs', icon: '✈️', description: 'Reliable airport transfers' },
  { id: '9', name: 'Senior Support & Pet Care', icon: '🐕', description: 'Care services for seniors and pets' }
];

export const products: Product[] = [
  { id: '1', name: 'iPhone 15 Pro', price: 120000, category: 'Phones', image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', stock: 15, featured: true },
  { id: '2', name: 'Samsung Galaxy S24', price: 95000, category: 'Phones', image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg', stock: 20 },
  { id: '3', name: 'MacBook Pro M3', price: 185000, category: 'Computers', image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg', stock: 8, featured: true },
  { id: '4', name: 'Dell XPS 13', price: 135000, category: 'Computers', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg', stock: 12 },
  { id: '5', name: 'LG Double Door Fridge', price: 85000, category: 'Fridges', image: 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg', stock: 6 },
  { id: '6', name: 'Samsung Side-by-Side Fridge', price: 125000, category: 'Fridges', image: 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg', stock: 4, featured: true },
  { id: '7', name: 'Wireless Earbuds', price: 8500, category: 'Accessories', image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg', stock: 50 },
  { id: '8', name: 'Gaming Mouse', price: 3500, category: 'Accessories', image: 'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg', stock: 30 }
];

export const foodItems: FoodItem[] = [
  { id: '1', name: 'Chicken Burger', price: 650, category: 'Fast Food', image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg', available: true },
  { id: '2', name: 'Margherita Pizza', price: 1200, category: 'Fast Food', image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg', available: true },
  { id: '3', name: 'French Fries', price: 350, category: 'Fast Food', image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg', available: true },
  { id: '4', name: 'Coca Cola', price: 150, category: 'Drinks', image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg', available: true },
  { id: '5', name: 'Coffee', price: 200, category: 'Drinks', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg', available: true },
  { id: '6', name: 'Chocolate Cookies', price: 250, category: 'Snacks', image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg', available: true }
];

export const mockRequests: Request[] = [
  {
    id: 'ER-2025-001',
    type: 'service',
    title: 'Taxi Ride to Airport',
    description: 'Need pickup from Westlands to JKIA',
    status: 'in-progress',
    customerName: 'John Doe',
    customerPhone: '0712345678',
    customerEmail: 'john@email.com',
    pickupLocation: 'Westlands',
    dropoffLocation: 'JKIA',
    datePreference: '2025-01-20',
    timePreference: '08:00',
    assignedEmployee: 'James Driver',
    createdAt: new Date(),
    updatedAt: new Date(),
    paymentStatus: 'paid'
  },
  {
    id: 'ER-2025-002',
    type: 'product',
    title: 'iPhone 15 Pro Order',
    description: '1x iPhone 15 Pro - Space Black',
    status: 'pending',
    customerName: 'Jane Smith',
    customerPhone: '0723456789',
    customerEmail: 'jane@email.com',
    dropoffLocation: 'Karen',
    datePreference: '2025-01-21',
    timePreference: '14:00',
    createdAt: new Date(),
    updatedAt: new Date(),
    paymentStatus: 'pending'
  }
];

export const mockEmployees: Employee[] = [
  { id: '1', name: 'James Driver', email: 'james@quicklink.com', phone: '0701234567', role: 'driver', status: 'active', completedJobs: 45, rating: 4.8 },
  { id: '2', name: 'Mary Agent', email: 'mary@quicklink.com', phone: '0712345678', role: 'dispatcher', status: 'active', completedJobs: 120, rating: 4.9 },
  { id: '3', name: 'Peter Rider', email: 'peter@quicklink.com', phone: '0723456789', role: 'rider', status: 'active', completedJobs: 78, rating: 4.7 },
  { id: '4', name: 'Sarah Provider', email: 'sarah@quicklink.com', phone: '0734567890', role: 'service-provider', status: 'active', completedJobs: 32, rating: 4.6 }
];