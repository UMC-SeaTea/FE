import { useMemo, useState } from 'react';
import { useDiagnosisHistory } from '../../hooks/diagnosis/useDiagnosisHistory';
import { formatDate } from '../../lib/formatDate';
import type { DiagnosisHistoryItem } from '../../types/diagnosis/history';
import NavBar from '../../components/common/NavBar';
import menuIcon from '../../assets/menu_black.svg';
import HomeTestType from '../../components/common/HomeTestType';
import PastResult from '../../components/common/PastResult';
import Footer from '../../components/common/Footer';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import TastingNote from '../../components/common/TastingNote';
import PlaceTestCard from '../../components/PlaceTest/PlaceTestCard';
import SideBarContainer from '../../components/SideBar/SideBarContainer';
import useSideBar from '../../hooks/useSideBar';
import moveButton from '../../assets/moveButton_gray.svg';
import { useNavigate } from 'react-router-dom';
import { useMemberStore } from '../../stores/useMemberStore';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { toTastingKey } from '../../utils/tastingType';

const MyTastingPage = () => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const { open, toggleSideBar, closeSideBar } = useSideBar(false, {
    closeOnEsc: true,
  });
  const navigate = useNavigate();

  const {
    data: historyData,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useDiagnosisHistory(0, 3);

  const recentThree: DiagnosisHistoryItem[] = useMemo(() => {
    return historyData?.result?.content ?? [];
  }, [historyData]);
  const isLoading = useMemberStore((s) => s.isLoading);
  const rawCode = useMemberStore((s) => s.profile?.currentType?.code);
  const safeCode = toTastingKey(rawCode);

  if (isLoading) {
    return (
      <div className="pt-[204px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <NavBar
        variant="5"
        text="휴식 유형"
        icon={menuIcon}
        className="relative z-[60]"
        onClick={toggleSideBar}
      />
      <SideBarContainer open={open} onClose={closeSideBar} />
      <div className="pt-[50px] flex flex-col gap-[12px]">
        <div className="flex items-center gap-[4px]">
          <p className="pl-[20px] font-body text-body-title text-black">
            나의 테이스팅 노트
          </p>
          <button
            className="cursor-pointer"
            onClick={() => setIsOpenInfo((prev) => !prev)}
          >
            <AiOutlineQuestionCircle className="w-[15px] h-[15px] m-[1.5px] text-gray-300" />
          </button>
        </div>

        <div>
          <div className="border-t text-black" />
          <HomeTestType variant="recommend" type={safeCode} />
        </div>
      </div>

      <div className="flex flex-col pt-[42px] px-[20px] gap-[42px] pb-[37px]">
        {isOpenInfo && <TastingNote />}
        {/* 새로 진단하기 */}
        <div>
          <p className="pb-[24px] text-body-title font-body text-black">
            새로 진단하기
          </p>
          <div className="flex flex-col gap-[8px]">
            <PlaceTestCard
              badgeText="정확도 UP"
              badgeBg="bg-brand"
              badgeTextColor="text-white"
              title="휴식 유형 상세 진단"
              durationText="약 1-2분 소요"
            />
            <PlaceTestCard
              badgeText="지금 바로"
              badgeBg="bg-[#DADEFF]"
              badgeTextColor="text-brand"
              title="휴식 유형 간단 진단"
              durationText="10초 완성!"
            />
          </div>
        </div>

        {/* 과거 진단내역 */}
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center justify-between">
            <p className="font-body text-body-title text-black">
              과거 진단내역
            </p>

            <button
              className="flex items-center gap-[2px] cursor-pointer"
              onClick={() => navigate('/mytasting/past')}
            >
              <p className="font-body text-body-4 text-gray-100">더보기</p>
              <img src={moveButton} alt="더보기 아이콘" />
            </button>
          </div>

          <div className="flex flex-col gap-[8px]">
            {isHistoryLoading ? (
              <p className="font-body text-body-4 text-gray-400">
                불러오는 중...
              </p>
            ) : isHistoryError ? (
              <p className="font-body text-body-4 text-red-500">
                과거 진단내역을 불러오지 못했습니다.
              </p>
            ) : recentThree.length === 0 ? (
              <p className="font-body text-body-4 text-gray-400">
                아직 진단 내역이 없습니다.
              </p>
            ) : (
              recentThree.map((item) => (
                <PastResult
                  key={item.sessionId}
                  type={item.displayName}
                  date={formatDate(item.createdAt)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyTastingPage;
