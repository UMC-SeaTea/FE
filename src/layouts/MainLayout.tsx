import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ScrollTop from '../components/common/ScrollTop';
import { useMemberStore } from '../stores/useMemberStore';

const MainLayout: React.FC = () => {
  const fetchProfile = useMemberStore((s) => s.fetchProfile);
  const profile = useMemberStore((s) => s.profile);

  useEffect(() => {
    if (!profile) fetchProfile();
  }, [fetchProfile, profile]);

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
