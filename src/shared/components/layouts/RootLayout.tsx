import { Outlet } from 'react-router-dom';
import { Navigation } from '@/shared/components/navigation/Navigation';

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};