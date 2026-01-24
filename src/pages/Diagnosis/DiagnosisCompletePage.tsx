import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import HomeTestType from "../../components/common/HomeTestType";
import { RESULT_CONFIG, type ResultType } from "../../constants/tastingNote";

export default function DiagnosisCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const resultType = (location.state?.resultType ?? "floral") as ResultType;

  const config = useMemo(() => {
    return RESULT_CONFIG[resultType] ?? RESULT_CONFIG.floral;
  }, [resultType]);

  return (
    <main className="min-h-dvh bg-[#F6F7FB] flex justify-center">
      <div className="w-full max-w-[375px] min-h-dvh bg-white flex flex-col">
        <header className="h-[56px] w-full border-b border-[#0A0A0A] flex items-center px-[20px] shrink-0">
          <span className="font-title text-[18px] font-weight-medium leading-none text-[#0A0A0A] mt-[10px]">SeaTea</span>
        </header>


        <HomeTestType
          type={resultType}
          title={config.title}
          description={config.desc}
          variant="home"
        />


        <section className="px-[20px] pt-[18px] flex flex-col flex-1">
          <p className="w-[335px] font-body text-body-5 text-footer leading-[150%] tracking-[-0.02em]">
            혼자만의 시간을 선호하지만, 익숙한 것보다는 ‘낯선 아티스트의 음악’처럼 새로운 자극을 원할 때 진단됩니다.
            에너지가 많지 않아도, 시각이나 후각 등 감각적인 경험을 통해 부드럽게 활력을 얻고 싶어 하는 상태입니다.
          </p>

          <div className="flex-1" />

          <div className="pb-[28px] flex flex-col gap-[12px] items-center">
            <button
              type="button"
              onClick={() => navigate("/diagnosis/recommend", { state: { resultType } })}
              className="w-[334px] h-[50px] rounded-[25px] bg-brand text-white font-body font-weight-regular text-18px"
            >
              공간 추천받기
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-[334px] h-[50px] rounded-[25px] bg-white border border-brand text-brand font-body font-weight-regular text-18px"
            >
              홈으로 이동
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}