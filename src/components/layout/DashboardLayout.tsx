import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import type { MenuItem } from '../../types';import { LayoutDashboard, Users, Plus, TrendingUp, Grid3x3 } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  onSearch?: (query: string) => void;
}

// Default menu items
const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    id: 'users',
    label: 'User Management',
    path: '/users',
    icon: <Users className="w-5 h-5" />,
    subItems: [
      {
        id: 'user-directory',
        label: 'User Directory',
        path: '/users/directory',
        icon: <Users className="w-4 h-4" />,
      },
      {
        id: 'add-user',
        label: 'Add User',
        path: '/users/add',
        icon: <Plus className="w-4 h-4" />,
      },
    ],
  },
  {
    id: 'add-resource',
    label: 'Add Resource',
    path: '/resources/add',
    icon: <Plus className="w-5 h-5" />,
  },
  {
    id: 'competition',
    label: 'Competition Journey',
    path: '/competition',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: 'framework',
    label: 'Framework',
    path: '/framework',
    icon: <Grid3x3 className="w-5 h-5" />,
  },
];

export default function DashboardLayout({
  children,
  pageTitle = 'Dashboard',
  onSearch,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar menuItems={DEFAULT_MENU_ITEMS} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* TopBar */}
        <TopBar title={pageTitle} onSearch={onSearch} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pt-20 pb-8">
          <div className="px-8 py-8 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}