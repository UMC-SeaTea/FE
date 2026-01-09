import { useState } from 'react';
import SideBarComponent from './SideBarComponent';

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const menuList = ['홈', '지도', '공간 탐색', '마이페이지', '진단하기'];

  return (
    <>
      <div className="w-[375px] bg-white pt-[42px] px-[20px] h-screen">
        {menuList.map((text, index) => (
          <SideBarComponent
            text={text}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </>
  );
};

export default SideBar;
