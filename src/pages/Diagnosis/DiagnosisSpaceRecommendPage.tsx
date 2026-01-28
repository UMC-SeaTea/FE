import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceRecommendation from '../../components/common/SpaceRecommendation';
import PlaceList from '../../components/common/PlaceList';
import FeedbackButton from '../../components/Feedback/FeedbackButton';
import refreshIcon from '../../assets/refresh.svg';
import { type TastingKey } from '../../types/tastingType/tastingType';

export default function DiagnosisSpaceRecommendPage() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<'good' | 'bad' | null>(null);

  const resultType: TastingKey = 'floral';

  const handleRefresh = () => {
    console.log('refresh');
  };

  return (
    <main className="min-h-dvh bg-[#F6F7FB] flex justify-center overflow-hidden">
      <div className="w-full max-w-[375px] min-h-dvh bg-white flex flex-col overflow-hidden">
        <div className="relative w-full h-[147px] mt-[10px] overflow-hidden">
          <SpaceRecommendation type={resultType} />
        </div>

        <section className="-mt-[18px] relative z-30 flex-1 overflow-hidden">
          <div
            className="
              w-full h-full rounded-md border border-gray-400 bg-white
              overflow-hidden
              shadow-[0_0_16px_rgba(94,94,94,0.04),0_0_4px_rgba(0,0,0,0.06)]
              flex flex-col
            "
          >
            <div className="px-[20px] py-[12px] mt-[15px] flex items-center justify-between shrink-0">
              <p className="font-body text-body-title text-footer">공간 추천</p>

              <div className="flex items-center gap-[8px]">
                <span className="font-body text-body-4 text-gray-100">
                  공간 다시 우리기
                </span>
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="w-[28px] h-[28px] cursor-pointer"
                >
                  <img
                    src={refreshIcon}
                    alt="refresh"
                    className="w-full h-full"
                  />
                </button>
              </div>
            </div>

            <div className="px-[16px] pt-[12px] flex-1 overflow-y-auto">
              <div className="pb-[16px] flex flex-col gap-[12px]">
                <PlaceList />
                <PlaceList />
                <PlaceList />
              </div>
            </div>

            <div className="px-[20px] pt-[10px] pb-[18px] shrink-0">
              <div className="flex justify-center -mt-[6px]">
                <div className="flex gap-[8px]">
                  <FeedbackButton
                    type="good"
                    label="추천이 정확해요"
                    isSelected={feedback === 'good'}
                    onClick={() => setFeedback('good')}
                  />
                  <FeedbackButton
                    type="bad"
                    label="정확하지 않아요"
                    isSelected={feedback === 'bad'}
                    onClick={() => setFeedback('bad')}
                  />
                </div>
              </div>

              <div className="mt-[12px] flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="font-body text-body-5 leading-[140%] text-gray-100 cursor-pointer"
                >
                  홈으로 이동
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
