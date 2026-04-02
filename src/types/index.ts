// User type definition
import type { LucideIcon } from 'lucide-react';
export interface User {
  id: string;
  name: string;
  email: string;
  position: string;
  office: string;
  age: number;
  startDate: string;
  salary: number;
  status: 'ACTIVE' | 'AWAY' | 'SUSPENDED';
  avatar?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// Stats type
export interface DashboardStats {
  totalCurators: number;
  activeNow: number;
  newRegistrations: number;
  pendingReviews: number;
}


export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon; // This expects the Icon component itself
  subItems?: MenuItem[];
}