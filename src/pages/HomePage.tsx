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
import { useMemberStore } from '../stores/useMemberStore';
import {
  isTastingKey,
  type TastingKey,
} from '../types/tastingType/tastingType';
import { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const HomePage = () => {
  const { open, toggleSideBar, closeSideBar } = useSideBar(false, {
    closeOnEsc: true,
  });

  const { fetchProfile } = useMemberStore();
  const isLoading = useMemberStore((s) => s.isLoading);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const rawCode = useMemberStore((s) => s.profile?.currentType?.code);
  const normalized =
    typeof rawCode === 'string' ? rawCode.toLowerCase() : undefined;
  const safeCode: TastingKey = isTastingKey(normalized) ? normalized : 'floral';

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
          {isLoading ? (
            <div className="w-[375px] h-[375px] pt-[150px]">
              <LoadingSpinner />
            </div>
          ) : (
            <HomeTestType type={safeCode} />
          )}
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
