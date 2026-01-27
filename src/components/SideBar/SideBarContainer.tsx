import { useLocation, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import { useEffect } from 'react';

interface SideBarContainerProps {
  open: boolean;
  onClose: () => void;
}

const SideBarContainer = ({ open, onClose }: SideBarContainerProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // esc 닫기
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  // 경로 변경 시 닫기
  useEffect(() => {
    if (!open) return;
    onClose();
  }, [pathname]);

  return (
    <div
      className={[
        'fixed top-0 left-0 z-50 h-full w-[375px] transition-transform duration-300 pt-[44px]',
        open ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
    >
      <SideBar
        onSelect={(path) => {
          navigate(path);
          onClose();
        }}
      />
    </div>
  );
};

export default SideBarContainer;
