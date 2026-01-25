import SideBarComponent from './SideBarComponent';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const menuList = [
    { label: '홈', path: '/' },
    { label: '지도', path: '/map' },
    { label: '공간 탐색', path: '/recommend' },
    { label: '마이페이지', path: '/mypage' },
    { label: '진단하기', path: '/diagnosis' },
  ];
  const navigate = useNavigate();

  return (
    <>
      <div className="w-[375px] bg-white pt-[98px] px-[20px] h-screen">
        {menuList.map((label, path) => (
          <SideBarComponent
            key={path}
            text={label.label}
            onClick={() => navigate(label.path)}
          />
        ))}
      </div>
    </>
  );
};

export default SideBar;
