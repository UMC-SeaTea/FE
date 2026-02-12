import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SpaceRecommendation from "../../components/common/SpaceRecommendation";
import FeedbackButton from "../../components/Feedback/FeedbackButton";
import refreshIcon from "../../assets/refresh.svg";
import { type TastingKey } from "../../types/tastingType/tastingType";
import { showToast } from "../../components/Toast/ToastHost";
import { useSpaceRecommend } from "../../hooks/spaces/useSpaceRecommend";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import PlaceList from "../../components/common/PlaceList";
import { toTastingKey } from "../../utils/tastingType"; 

type RecommendState = {
  resultTypeCode?: string; 
  resultType?: TastingKey; 
};

export default function DiagnosisSpaceRecommendPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [feedback, setFeedback] = useState<"good" | "bad" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const state = (location.state ?? {}) as RecommendState;

  
  const tastingTypeCode = useMemo(() => {
    if (state.resultTypeCode) {
      return state.resultTypeCode.toUpperCase();
    }

    if (state.resultType) {
      return state.resultType.toUpperCase();
    }

    return "FLORAL";
  }, [state.resultTypeCode, state.resultType]);

  
  const resultType: TastingKey = useMemo(() => {
    return state.resultType ?? toTastingKey(state.resultTypeCode);
  }, [state.resultType, state.resultTypeCode]);

  const { data, isLoading, isError, refetch } = useSpaceRecommend({
    tastingTypeCode,
  });

  const onSubmit = (value: "good" | "bad") => {
    if (submitted) return;

    setFeedback(value);
    setSubmitted(true);

    showToast({ text: "피드백이 성공적으로 제출되었습니다.", duration: 2000 });
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
                  onClick={() => refetch()}
                  className="w-[28px] h-[28px] cursor-pointer"
                >
                  <img src={refreshIcon} alt="refresh" className="w-full h-full" />
                </button>
              </div>
            </div>

            <div className="px-[16px] pt-[12px] flex-1 overflow-y-auto">
              <div className="pb-[16px] flex flex-col gap-[12px]">
                {isLoading ? (
                  <LoadingSpinner />
                ) : isError ? (
                  <p>오류가 발생했습니다. 잠시 후 다시 시도해주세요</p>
                ) : data?.result?.items?.length ? (
                  data.result.items.map((item) => (
                    <PlaceList
                      key={item.spaceId}
                      name={item.name}
                      roadAddress={item.address}
                      description={item.description}
                      spaceId={item.spaceId}
                    />
                  ))
                ) : (
                  <p className="font-body text-body-5 text-gray-100">
                    추천 공간이 없습니다.
                  </p>
                )}
              </div>
            </div>

            <div className="px-[20px] pt-[10px] pb-[18px] shrink-0">
              {submitted ? null : (
                <div className="flex justify-center -mt-[6px]">
                  <div className="flex gap-[8px]">
                    <FeedbackButton
                      type="good"
                      label="추천이 정확해요"
                      isSelected={feedback === "good"}
                      onClick={() => onSubmit("good")}
                    />
                    <FeedbackButton
                      type="bad"
                      label="정확하지 않아요"
                      isSelected={feedback === "bad"}
                      onClick={() => onSubmit("bad")}
                    />
                  </div>
                </div>
              )}

              <div className="mt-[12px] flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate("/")}
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
