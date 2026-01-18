import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function DiagnosisStart() {
  const [openInfo, setOpenInfo] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/diagnosis/loading"); // ✅ 로딩 화면 라우트로 이동
  };

  return (
    <main
      className="
        relative min-h-screen w-full
        flex flex-col items-center
        text-white
        bg-[linear-gradient(180deg,_#21148C_0.01%,_#2F16FF_54.15%,_#8097FF_108.3%)]
      "
    >
      {/* 상단 영역 */}
      <section className="w-full flex flex-col items-center pt-[161px]">
        <p className="text-title-4 font-title leading-[28px] text-center">
          휴식 유형 진단받기
        </p>

        <div className="mt-[6px] w-full flex justify-center">
        <div className="relative inline-flex items-center">
            <h1 className="text-title-2 font-title leading-[28px] text-center">
            8 Tasting Notes
            </h1>

            <button
            type="button"
            onClick={() => setOpenInfo((v) => !v)}
            aria-label="테이스팅 노트 설명"
            className="absolute left-full ml-[8px] -translate-y-[12px]"
            >
            <AiOutlineQuestionCircle
                className={`
                w-[16px] h-[16px]
                transition-all duration-150
                ${openInfo ? "text-white/40" : "text-white"}
                `}
            />
            </button>
        </div>
        </div>


        {openInfo && (
          <div
            className="
              mt-[28px]
              w-[335px] h-[230px]
              rounded-md
              overflow-hidden
              opacity-90
            "
          >
            <div
              className="w-full h-full backdrop-blur-[10px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.08) 100%)",
              }}
            >
              <div className="px-[20px] pt-[37px] relative -translate-y-[12px]">
                <AiOutlineQuestionCircle className="w-[16px] h-[16px] -translate-y-[1px]" />

                <p className="mt-[10px] font-body text-body-1 leading-[140%] tracking-[-0.025em]">
                  테이스팅 노트란?
                </p>

                <p className="mt-[10px] font-body text-detail-3 font-medium leading-[140%] tracking-[-0.025em] opacity-90">
                  티 테이스팅 노트는 차에 실제로 첨가된 재료가 아닌,
                  <br />
                  차의 맛과 향을 감각적으로 표현하는 용어입니다.
                  <br />
                  와인을 맛볼 때 '과일 향'이나 '오크 향'을 느끼는 것처럼,
                  <br />
                  차에서도 꽃, 과일, 견과류 등 다양한 풍미를 발견할 수 있습니다.
                  <br />
                  <br />
                  SeaTea는 이러한 테이스팅 노트를 8가지 휴식유형에 비유하여,
                  당신의 마음에 꼭 맞는 휴식을 찾아 드립니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 하단 영역 */}
      <section className="w-full mt-auto pb-[34px] flex flex-col items-center">
        <p
          className="
            w-[316px]
            text-body-3 leading-[21px]
            font-body
            tracking-[-0.02em]
            text-center
            mb-[16px]
            opacity-90
          "
        >
          ⚠ ️잠깐! 시작하기 전에
          <br />
          <span className="font-body text-body-5 tracking-[-0.02em]">
            SeaTea의 휴식 진단은 전문적인 정신의학적 진단이 아니며,
            더 즐거운 휴식 경험을 돕기 위한 가벼운 가이드입니다.
          </span>
        </p>

        <div className="flex flex-col gap-[12px]">
          <button
            type="button"
            onClick={handleStart} 
            className="
              w-[335px] h-[50px]
              rounded-[25px]
              border border-white
              text-body-title font-body
            "
          >
            시작하기
          </button>

          <button
            type="button"
            className="
              w-[335px] h-[50px]
              rounded-[25px]
              border border-white
              text-body-2 font-body
            "
          >
            10초만에 휴식 추천받기
          </button>
        </div>
      </section>
    </main>
  );
}
