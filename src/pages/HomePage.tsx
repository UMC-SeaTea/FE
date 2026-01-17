import NavBar from '../components/common/NavBar';
import menu from '../assets/menu_black.svg';
import HomeTestType from '../components/common/HomeTestType';
import SpaceCardMini from '../components/common/SpaceCardMini';
import SideBarTest from '../components/common/SideBarTest';
import Carousel from '../components/common/Carousel';
import { useState } from 'react';
import SideBarContainer from '../components/SideBar/SideBarContainer';
import HomeComponent from '../components/common/HomeComponent';

const HomePage = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-[42px]">
        <div className="flex flex-col gap-2">
          <NavBar
            variant="2"
            text="SeaTea"
            icon={menu}
            className="border-b border-[#000] relative z-[60]"
            onClick={() => setNavOpen((prev) => !prev)}
          />
          <SideBarContainer open={navOpen} onClose={() => setNavOpen(false)} />
          <HomeTestType
            type="sweet"
            title="sweet."
            description="소소한 디저트나 쇼핑 등 자신에게 작은 보상을 주며 스트레스를 풀어요"
          />
        </div>
        <div className="flex flex-col pl-[20px] gap-[29px]">
          <div className="flex flex-col gap-[10px]">
            <p className="text-black font-body text-body-title">
              최근 확인한 공간
            </p>
            <Carousel>
              <SpaceCardMini />
              <SpaceCardMini />
              <SpaceCardMini />
              <SpaceCardMini />
            </Carousel>
          </div>
          <HomeComponent />
          <SideBarTest />
        </div>
      </div>
    </>
  );
};

export default HomePage;
