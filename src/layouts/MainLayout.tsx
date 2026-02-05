import React from 'react';
import { Outlet } from 'react-router-dom';
<<<<<<< HEAD
=======
import ScrollTop from '../components/common/ScrollTop';
>>>>>>> cde5186a929ca3ddb32f825775293dcde8c55cae

const MainLayout: React.FC = () => {
  return (
    <>
      <div className="w-full max-w-[375px] mx-auto min-h-screen bg-white">
<<<<<<< HEAD
=======
        <ScrollTop />
>>>>>>> cde5186a929ca3ddb32f825775293dcde8c55cae
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
