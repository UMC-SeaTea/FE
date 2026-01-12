import NavBar from '../components/common/NavBar';
import menu from '../assets/menu_black.svg';
import HomeTestType from '../components/common/HomeTestType';
import SpaceCardMini from '../components/common/SpaceCardMini';
import SideBarTest from '../components/common/SideBarTest';
import Carousel from '../components/common/Carousel';

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col gap-[42px]">
        <div className="flex flex-col gap-2">
          <NavBar
            variant="2"
            text="SeaTea"
            icon={menu}
            className="border-b border-[#000]"
          />
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
          {/* 지금, 어떤 휴식이 필요하신가요? */}
          <SideBarTest />
        </div>
      </div>
    </>
  );
};

export default HomePage;
