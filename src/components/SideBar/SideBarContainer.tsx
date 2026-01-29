import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

interface SideBarContainerProps {
  open: boolean;
  onClose: () => void;
}

const SideBarContainer = ({ open, onClose }: SideBarContainerProps) => {
  const navigate = useNavigate();

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
