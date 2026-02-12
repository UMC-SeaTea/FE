import NavBar from '../components/common/NavBar';
import backIcon from '../assets/backButton_white.svg';
import HomeTestType from '../components/common/HomeTestType';
import tea from '../assets/images/teaIcon.png';
import refresh from '../assets/refresh.svg';
// import PlaceList from '../components/common/PlaceList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackButton from '../components/Feedback/FeedbackButton';
import { showToast } from '../components/Toast/ToastHost';
import { useSpaceRecommend } from '../hooks/spaces/useSpaceRecommend';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import PlaceList from '../components/common/PlaceList';
import { useMemberStore } from '../stores/useMemberStore';
import { toTastingKey } from '../utils/tastingType';

const SpaceRecommend = () => {
  // const { data, isLoading } = useSpaceDetail();

  const [feedback, setFeedback] = useState<'good' | 'bad' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const nickname = useMemberStore((s) => s.profile?.nickname);
  const rawCode = useMemberStore((s) => s.profile?.currentType?.code);
  const safeCode = toTastingKey(rawCode);

  const { data, isLoading, isError, refetch } = useSpaceRecommend({
    tastingTypeCode: rawCode || 'FLORAL',
  });

  const onSubmit = (value: 'good' | 'bad') => {
    if (submitted) return;

    setFeedback(value);
    setSubmitted(true);

    showToast({ text: '피드백이 성공적으로 제출되었습니다.', duration: 2000 });
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-[42px]">
        <div>
          <NavBar
            variant="4"
            text="공간 추천"
            icon={backIcon}
            onClick={() => navigate(-1)}
          />
          <HomeTestType type={safeCode} variant="recommend" />
        </div>
        <div className="flex flex-col gap-[19px] pl-[20px]">
          {/* 텍스트 + refresh아이콘 */}
          <div className="w-[335px] flex items-center justify-between">
            <div className="flex items-center gap-[6px]">
              <p className="font-body text-body-title text-black">
                {nickname}님의 취향저격 예상!
              </p>
              <img src={tea} alt="tea icon" className="w-[22px] h-[22px]" />
            </div>
            <img
              src={refresh}
              alt="refresh icon"
              className="w-[28px] h-[28px] cursor-pointer"
              onClick={() => refetch()}
            />
          </div>
          <div className="flex flex-col gap-2 pb-[32px]">
            {isLoading ? (
              <LoadingSpinner />
            ) : isError ? (
              <p>오류가 발생했습니다. 잠시 후 다시 시도해주세요</p>
            ) : (
              data?.result?.items?.map((item) => (
                <PlaceList
                  key={item.spaceId}
                  name={item.name}
                  roadAddress={item.address}
                  description={item.description}
                  spaceId={item.spaceId}
                />
              ))
            )}
          </div>
        </div>
        <div
          className="w-[375px] h-[187px] bg-[#F6F6F6] 
        pt-[34px] pb-[55px] pl-[50px] pr-[49px]"
        >
          <div className="flex flex-col gap-[16px]">
            {/* 텍스트 부분 */}
            <div className="flex flex-col text-center gap-[4px]">
              <p className="font-body text-body-1 text-[#414045]">
                {submitted ? '감사합니다!' : 'SeaTea의 추천은 어떠셨나요?'}
              </p>
              <p className="font-body text-detail-4 text-gray-100">
                {submitted
                  ? '남겨주신 평가를 바탕으로 더 좋은 휴식을 우려올게요.'
                  : '평가를 남겨주시면 SeaTea가 더 좋은 휴식을 우려올게요'}
              </p>
            </div>
            {submitted ? null : (
              <div className="flex gap-[8px]">
                <FeedbackButton
                  type="good"
                  label="정확해요"
                  isSelected={feedback === 'good'}
                  onClick={() => onSubmit('good')}
                />
                <FeedbackButton
                  type="bad"
                  label="정확하지 않아요"
                  isSelected={feedback === 'bad'}
                  onClick={() => onSubmit('bad')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpaceRecommend;
