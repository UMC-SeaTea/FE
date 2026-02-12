import NavBar from '../components/common/NavBar';
import menu from '../assets/menu_black.svg';
import HomeTestType from '../components/common/HomeTestType';
// import SpaceCardMini from '../components/common/SpaceCardMini';
import SideBarTest from '../components/common/SideBarTest';
// import Carousel from '../components/common/Carousel';
import SideBarContainer from '../components/SideBar/SideBarContainer';
import HomeComponent from '../components/common/HomeComponent';
import useSideBar from '../hooks/useSideBar';
import Footer from '../components/common/Footer';

const HomePage = () => {
  const { open, toggleSideBar, closeSideBar } = useSideBar(false, {
    closeOnEsc: true,
  });
  // const { data, isLoading } = useSpaceDetail();

  return (
    <>
      <div className="flex flex-col gap-[42px]">
        <div className="flex flex-col gap-2">
          <NavBar
            variant="2"
            text="SeaTea"
            icon={menu}
            className="border-b border-[#000] relative z-[60]"
            onClick={toggleSideBar}
          />
          <SideBarContainer open={open} onClose={closeSideBar} />
          <HomeTestType type="earthy" />
        </div>
        <div className="flex flex-col pl-[20px] gap-[29px]">
          <div className="flex flex-col gap-[10px]">
            <p className="text-black font-body text-body-title">
              최근 확인한 공간
            </p>
            {/* <Carousel>
              <SpaceCardMini name={data.name} roadAddress={data.roadAddress} thumbnailImageUrl={data.thumbnailImageUrl} />
              <SpaceCardMini name={data.name} roadAddress={data.roadAddress} thumbnailImageUrl={data.thumbnailImageUrl} />
              <SpaceCardMini name={data.name} roadAddress={data.roadAddress} thumbnailImageUrl={data.thumbnailImageUrl} />
            </Carousel> */}
          </div>
          <HomeComponent />
          <SideBarTest />
        </div>
      </div>
      <div className="pt-[52px]">
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
