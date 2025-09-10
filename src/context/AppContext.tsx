import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Request, Employee, Product, FoodItem, CartItem } from '../types';
import { mockRequests, mockEmployees, products, foodItems } from '../data/mockData';

interface AppContextType {
  // Requests
  requests: Request[];
  addRequest: (request: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRequestStatus: (id: string, status: Request['status']) => void;
  assignEmployee: (requestId: string, employeeId: string) => void;
  
  // Employees
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  
  // Products & Food
  productList: Product[];
  foodList: FoodItem[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  addFoodItem: (item: Omit<FoodItem, 'id'>) => void;
  updateFoodItem: (id: string, updates: Partial<FoodItem>) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  
  // Admin
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  
  // UI State
  selectedRequest: Request | null;
  setSelectedRequest: (request: Request | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [productList, setProductList] = useState<Product[]>(products);
  const [foodList, setFoodList] = useState<FoodItem[]>(foodItems);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const addRequest = (requestData: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRequest: Request = {
      ...requestData,
      id: `ER-2025-${String(requests.length + 1).padStart(3, '0')}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setRequests(prev => [newRequest, ...prev]);
  };

  const updateRequestStatus = (id: string, status: Request['status']) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status, updatedAt: new Date() } : req
    ));
  };

  const assignEmployee = (requestId: string, employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, assignedEmployee: employee.name, status: 'assigned', updatedAt: new Date() }
          : req
      ));
      // Simulate notification
      alert(`Task assigned to ${employee.name}! They will receive the job details instantly.`);
    }
  };

  const addEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: String(employees.length + 1)
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, ...updates } : emp
    ));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: String(productList.length + 1)
    };
    setProductList(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProductList(prev => prev.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const addFoodItem = (itemData: Omit<FoodItem, 'id'>) => {
    const newItem: FoodItem = {
      ...itemData,
      id: String(foodList.length + 1)
    };
    setFoodList(prev => [...prev, newItem]);
  };

  const updateFoodItem = (id: string, updates: Partial<FoodItem>) => {
    setFoodList(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value: AppContextType = {
    requests,
    addRequest,
    updateRequestStatus,
    assignEmployee,
    employees,
    addEmployee,
    updateEmployee,
    productList,
    foodList,
    addProduct,
    updateProduct,
    addFoodItem,
    updateFoodItem,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    isAdmin,
    setIsAdmin,
    selectedRequest,
    setSelectedRequest
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};