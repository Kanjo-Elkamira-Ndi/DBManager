import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card.tsx';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import { useUsers } from '../hooks/useUsers';
import { Download, AlertCircle } from 'lucide-react';

export default function UserDirectory() {
  const { users, loading, error, page, totalPages, setPage } = useUsers();

  if (error) {
    return (
      <DashboardLayout pageTitle="User Directory">
        <div className="text-red-600">Error: {error}</div>
      </DashboardLayout>
    );
  }

  // Stats Cards
  const stats = [
    { label: 'Total Users', value: '1,284', change: '↑12% from last month' },
    { label: 'Active Now', value: '42', change: '↑High engagement' },
    { label: 'Pending Review', value: '8', change: 'Awaiting credentials' },
  ];

  // Table headers and rows
  const headers = ['Name', 'Position', 'Office', 'Age', 'Start Date', 'Salary', 'Status'];
  const rows = users.map((user) => [
    user.name,
    user.position,
    user.office,
    user.age,
    new Date(user.startDate).toLocaleDateString(),
    `$${user.salary.toLocaleString()}`,
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        user.status === 'ACTIVE'
          ? 'bg-green-100 text-green-700'
          : user.status === 'AWAY'
          ? 'bg-yellow-100 text-yellow-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {user.status}
    </span>,
  ]);

  return (
    <DashboardLayout pageTitle="User Directory">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">User Directory</h1>
            <p className="text-gray-600 mt-1">DATABASE</p>
          </div>
          <Button variant="primary">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <Card key={i}>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
                {stat.label}
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-xs text-gray-600">{stat.change}</p>
            </Card>
          ))}
        </div>

        {/* Table */}
        <Card>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <Table headers={headers} rows={rows} />
          )}
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Policy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex gap-4">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Directory Policy</h3>
            <p className="text-sm text-blue-800">
              Users marked as "Suspended" will lose access within 24 hours unless overridden.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}