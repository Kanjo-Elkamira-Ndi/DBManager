import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Users, Plus, TrendingUp, Grid3x3 } from 'lucide-react';
import { AddResourceModal } from '../components/AddResourceModal';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to DBManager
          </h1>
          <p className="text-lg text-gray-600">
            Manage your database and users efficiently.
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Link to="/users/directory">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    User Directory
                  </h3>
                  <p className="text-sm text-gray-600">
                    Manage users and permissions
                  </p>
                </div>
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </Card>
          </Link>

          <div
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <Card className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Add Resource
                  </h3>
                  <p className="text-sm text-gray-600">
                    Create new resources
                  </p>
                </div>
                <Plus className="w-6 h-6 text-orange-600" />
              </div>
            </Card>
          </div>

          <Link to="/competition">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Competition
                  </h3>
                  <p className="text-sm text-gray-600">
                    View competition metrics
                  </p>
                </div>
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </Card>
          </Link>

          <Link to="/framework">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Framework
                  </h3>
                  <p className="text-sm text-gray-600">
                    Configure settings
                  </p>
                </div>
                <Grid3x3 className="w-6 h-6 text-orange-600" />
              </div>
            </Card>
          </Link>

        </div>

        {/* Getting Started */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Getting Started
          </h2>
          <p className="text-gray-600 mb-6">
            Start by exploring the User Directory to view and manage your users.
          </p>
          <Link to="/users/directory">
            <Button>View User Directory</Button>
          </Link>
        </Card>

        <AddResourceModal
          isOpen={open}
          onClose={() => setOpen(false)}
        />

      </div>
    </DashboardLayout>
  );
}