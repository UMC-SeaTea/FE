import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeTestType from '../../components/common/HomeTestType';
import { type TastingKey } from '../../types/tastingType/tastingType';
import { tastingTypeMap } from '../../constants/tastingType/tastingType';
import { useMemberStore } from '../../stores/useMemberStore';

type CompleteState = {
  resultTypeCode?: string;
};

const CODE_TO_KEY: Record<string, TastingKey> = {
  FLORAL: 'floral',
  FRUITY: 'fruity',
  OCEANIC: 'oceanic',
  EARTHY: 'earthy',
  NUTTY: 'nutty',
  SMOKY: 'smoky',
  SPICES: 'spices',
  SWEET: 'sweet',
};

function toTastingKey(code?: string): TastingKey {
  if (!code) return 'floral'; // fallback
  const upper = String(code).toUpperCase();
  return CODE_TO_KEY[upper] ?? 'floral';
}

export default function DiagnosisCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state ?? {}) as CompleteState;

  const resultType: TastingKey = useMemo(
    () => toTastingKey(state.resultTypeCode),
    [state.resultTypeCode]
  );

  const config = useMemo(() => tastingTypeMap[resultType], [resultType]);

  const updateCurrentTypeCode = useMemberStore((s) => s.setCurrentTypeCode);
  useEffect(() => {
    const code = (state.resultTypeCode ?? 'FLORAL').toUpperCase();
    updateCurrentTypeCode(code);
  }, [state.resultTypeCode, updateCurrentTypeCode]);

  return (
    <main className="min-h-dvh bg-[#F6F7FB] flex justify-center">
      <div className="w-full max-w-[375px] min-h-dvh bg-white flex flex-col">
        <header className="h-[56px] w-full border-b border-footer flex items-center px-[20px] shrink-0">
          <span className="font-title text-title-3 leading-none mt-[10px] text-footer">
            SeaTea
          </span>
        </header>

        <HomeTestType type={resultType} variant="home" />

        <section className="px-[20px] flex flex-col flex-1">
          <p className="whitespace-pre-line w-[335px] font-body text-body-5 text-footer leading-[150%] tracking-[-0.02em] pt-[89px] pb-[61px]">
            {config.copyPhrase}
          </p>

          <div className="flex-1" />

          <div className="pb-[28px] flex flex-col gap-[12px] items-center">
            <button
              type="button"
              onClick={() =>
                navigate('/diagnosis/recommend', {
                  state: {
                    resultTypeCode: (
                      state.resultTypeCode ?? 'FLORAL'
                    ).toUpperCase(),
                  },
                })
              }
              className="w-[334px] h-[50px] rounded-[25px] bg-brand text-white font-body font-weight-regular text-[18px] cursor-pointer"
            >
              공간 추천받기
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-[334px] h-[50px] rounded-[25px] bg-white border border-brand text-brand font-body font-weight-regular text-[18px] cursor-pointer"
            >
              홈으로 이동
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
