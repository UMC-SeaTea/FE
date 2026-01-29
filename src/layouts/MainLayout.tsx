import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollTop from '../components/common/ScrollTop';

const MainLayout: React.FC = () => {
  return (
    <>
      <div className="w-full max-w-[375px] mx-auto min-h-screen bg-white">
        <ScrollTop />
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
