import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900';
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              DashboardApp
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className={`${isActive('/dashboard')} font-medium transition-colors`}
            >
              Dashboard
            </Link>
            <Link to="/add">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Add Item
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};