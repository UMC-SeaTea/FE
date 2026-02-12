import NavBar from '../components/common/NavBar';
import menu from '../assets/menu_black.svg';
import HomeTestType from '../components/common/HomeTestType';
import SideBarTest from '../components/common/SideBarTest';
import SideBarContainer from '../components/SideBar/SideBarContainer';
import HomeComponent from '../components/common/HomeComponent';
import useSideBar from '../hooks/useSideBar';
import Footer from '../components/common/Footer';
import { useSpaceRecent } from '../hooks/spaces/useSpaceRecent';
import Carousel from '../components/common/Carousel';
import SpaceCardMini from '../components/common/SpaceCardMini';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { useMemberStore } from '../stores/useMemberStore';
import { toTastingKey } from '../utils/tastingType';
import { getDaysAgo } from '../utils/date';

const HomePage = () => {
  const { open, toggleSideBar, closeSideBar } = useSideBar(false, {
    closeOnEsc: true,
  });
  // const { data, isLoading } = useSpaceDetail();

  const { data, isLoading, isError } = useSpaceRecent({ size: 10 });
  const items = data?.result?.items ?? [];

  const rawCode = useMemberStore((s) => s.profile?.currentType?.code);
  const safeCode = toTastingKey(rawCode);

  const pastDiagnosisDate = useMemberStore(
    (s) => s.profile?.currentType?.createdAt
  );
  const daysAgo = getDaysAgo(pastDiagnosisDate);

  if (isLoading) {
    return (
      <div className="pt-[204px]">
        <LoadingSpinner />
      </div>
    );
  }
  if (isError) {
    return <div>에러가 발생했습니다. 다시 시도해주세요.</div>;
  }
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
            {items.length === 0 ? (
              <div className="w-full py-6">
                <p className="text-center text-body-4 font-body text-gray-300">
                  최근 확인한 공간이 없습니다.
                </p>
              </div>
            ) : (
              <Carousel>
                {items.map((space) => (
                  <SpaceCardMini
                    key={space.spaceId}
                    spaceId={space.spaceId}
                    name={space.name}
                    roadAddress={space.address || '주소 미제공'}
                    thumbnailImageUrl={space.thumbnailImageUrl}
                  />
                ))}
              </Carousel>
            )}
          </div>
          <HomeComponent />
          <SideBarTest pastDiagnosisDate={daysAgo} />
        </div>
      </div>
      <div className="pt-[52px]">
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
