import { SIDEBAR_MENU } from '../../constants/sideBarMenu';
import SideBarComponent from './SideBarComponent';

type SideBarProps = {
  onSelect: (path: string) => void;
};

const SideBar = ({ onSelect }: SideBarProps) => {
  return (
    <>
      <div className="w-[375px] bg-white pt-[98px] px-[20px] h-screen">
        {SIDEBAR_MENU.map((item) => (
          <SideBarComponent
            key={item.path}
            text={item.label}
            onClick={() => onSelect(item.path)}
          />
        ))}
      </div>
    </>
  );
};

export default SideBar;
