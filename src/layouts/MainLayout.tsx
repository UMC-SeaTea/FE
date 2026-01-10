import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <>
      <div className="w-full max-w-[375px] mx-auto min-h-screen bg-white">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
