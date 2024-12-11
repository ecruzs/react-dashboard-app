import { Outlet } from 'react-router-dom';
import { Navigation } from '@/shared/components/navigation/Navigation';

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};