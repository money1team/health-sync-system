
import React from 'react';
import { Outlet } from 'react-router-dom';
import PatientSidebar from './PatientSidebar';
import Header from './Header';

const PatientLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <PatientSidebar />
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
