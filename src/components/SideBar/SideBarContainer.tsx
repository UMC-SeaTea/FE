import SideBar from './SideBar';

interface SideBarContainerProps {
  open: boolean;
  onClose: () => void;
}

const SideBarContainer = ({ open }: SideBarContainerProps) => {
  return (
    <div
      className={[
        'fixed top-0 left-0 z-50 h-full w-[375px] transition-transform duration-300 pt-[56px]',
        open ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
    >
      <SideBar />
    </div>
  );
};

export default SideBarContainer;
