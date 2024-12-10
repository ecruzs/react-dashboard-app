import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from '@/shared/components/layouts/RootLayout';
import { Dashboard } from '@/features/dashboard/components/Dashboard';
import { Details } from '@/features/details/components/Details';
import { AddItem } from '@/features/item-form/components/AddItem';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};