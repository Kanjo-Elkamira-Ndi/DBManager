import React from 'react';

interface TopBarProps {
  title?: string;
  onSearch?: (query: string) => void;
}

export default function TopBar({ title = 'Dashboard', onSearch }: TopBarProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-40">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Manager</p>
          </div>
          <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
            A
          </div>
        </div>
      </div>
    </header>
  );
}