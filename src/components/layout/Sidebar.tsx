import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { MenuItem } from '@/types';
interface SidebarProps {
  menuItems: MenuItem[];
  onLogout?: () => void;
}

export default function Sidebar({ menuItems, onLogout }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-red-900 text-white flex flex-col shadow-lg">
      {/* Logo Section */}
      <div className="p-6 border-b border-red-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-lg">
            A
          </div>
          <div>
            <h1 className="text-sm font-bold">Admin Dashboard</h1>
            <p className="text-xs text-red-200 uppercase tracking-wide">Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? 'bg-orange-600 text-white'
                  : 'text-red-100 hover:bg-red-800'
              }`}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>

            {/* Submenu */}
            {item.subItems && expandedItems.has(item.id) && (
              <div className="ml-4 mt-2 space-y-1 border-l border-red-700 pl-4">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.id}
                    to={subItem.path}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                      isActive(subItem.path)
                        ? 'bg-orange-600 text-white'
                        : 'text-red-100 hover:text-white'
                    }`}
                  >
                    <span className="w-4 h-4">{subItem.icon}</span>
                    <span>{subItem.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-red-800 p-4">
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 rounded-lg text-red-100 hover:bg-red-800 transition-colors text-sm font-medium"
          >
            Sign Out
          </button>
        )}
      </div>
    </aside>
  );
}