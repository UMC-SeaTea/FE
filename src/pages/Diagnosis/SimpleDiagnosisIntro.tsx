import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import waveBack from '../../assets/images/simplediagnosis/waveBack.png';
import waveFront from '../../assets/images/simplediagnosis/waveFront.png';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import clsx from 'clsx';

export default function SimpleDiagnosisIntro() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setLeaving(true), 4000);
    const t2 = window.setTimeout(
      () => navigate('/diagnosis/simple/pick'),
      4300
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [navigate]);

  return (
    <main
      className="
        relative min-h-screen w-full
        flex items-center justify-center
        text-white overflow-hidden
        bg-[linear-gradient(180deg,_#1E1569_0%,_#2418C6_54%,_#8097FF_100%)]
      "
    >
      <style>{`
        @keyframes wave-float-back {
          0%   { transform: translateX(-50%) translateY(0) scaleY(1); }
          50%  { transform: translateX(-50%) translateY(-8px) scaleY(1.02); }
          100% { transform: translateX(-50%) translateY(0) scaleY(1); }
        }
        @keyframes wave-float-front {
          0%   { transform: translateX(-50%) translateY(0) scaleY(1); }
          50%  { transform: translateX(-50%) translateY(-14px) scaleY(1.04); }
          100% { transform: translateX(-50%) translateY(0) scaleY(1); }
        }
      `}</style>

      <div
        className={clsx(
          'absolute inset-0 transition-opacity duration-300 ease-out',
          leaving ? 'opacity-0' : 'opacity-100'
        )}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={waveBack}
            alt=""
            className="absolute left-1/2 bottom-[-45px]
              w-[120%] max-w-none
              [transform-origin:50%_100%]
              animate-[wave-float-back_6s_ease-in-out_infinite]
            "
          />

          <img
            src={waveFront}
            alt=""
            className="absolute left-1/2 bottom-[-50px]
              w-[128%] max-w-none
              [transform-origin:50%_100%]
              animate-[wave-float-front_4.6s_ease-in-out_infinite]
            "
          />
        </div>

        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="w-full flex flex-col items-center text-center -translate-y-[28px]">
            <h1 className="font-title text-title-4 leading-[28px]">
              Quick Taste
            </h1>

            <p className="mt-[8px] font-title text-body-title leading-[25px]">
              나에게 꼭 맞는 휴식을 찾아보세요
            </p>

            <div className="mt-[84px]">
              <LoadingSpinner color="white" />
            </div>

            <p className="mt-[60px] text-body-2 font-body leading-[22px]">
              지금 당신의 마음에 가장 가까운
              <br />
              키워드 3개를 선택해주세요
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
