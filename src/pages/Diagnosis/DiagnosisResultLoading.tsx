// src/pages/Diagnosis/DiagnosisResultLoading.tsx
import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import waveBack from "../../assets/Waves/diagnosis_result/wave_back.png";
import waveMiddle from "../../assets/Waves/diagnosis_result/wave_middle.png";
import waveFront from "../../assets/Waves/diagnosis_result/wave_front.png";
import { useDiagnosisResult } from "../../hooks/diagnosis/useDiagnosisResult";


type ResultLoadingState = {
  source?: "detail" | "simple";
  mode?: "basic" | "advanced";
  resultTypeCode?: string;
};

export default function DiagnosisResultLoading() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state ?? {}) as ResultLoadingState;

  
  const safeState = useMemo<ResultLoadingState>(() => {
    return {
      source: state.source ?? "detail",
      mode: state.mode ?? "basic",
    };
  }, [state.mode, state.source]);

  
  const { data, isError } = useDiagnosisResult();

  
  const timerDoneRef = useRef(false);
  const lastTypeCodeRef = useRef<string>("");

  
  useEffect(() => {
    const t = window.setTimeout(() => {
      timerDoneRef.current = true;

      
      if (lastTypeCodeRef.current) {
        navigate("/diagnosis/complete", {
          replace: true,
          state: { ...safeState, resultTypeCode: lastTypeCodeRef.current },
        });
      }
    }, 6000);

    return () => window.clearTimeout(t);
  }, [navigate, safeState]);

  
  useEffect(() => {
    const code = data?.result?.typeCode ? String(data.result.typeCode).toUpperCase() : "";

    if (!code) return;

    lastTypeCodeRef.current = code;

    
    if (timerDoneRef.current) {
      navigate("/diagnosis/complete", {
        replace: true,
        state: { ...safeState, resultTypeCode: code },
      });
    }
  }, [data, navigate, safeState]);

  
  useEffect(() => {
    if (!isError) return;

  }, [isError]);

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-[100dvh] overflow-hidden bg-[#0A0A0A]">
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatMid {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-22px); }
        }
      `}</style>

      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 z-10 w-[110vw] max-w-none">
        <img
          src={waveBack}
          alt=""
          className="block w-full h-auto opacity-90"
          style={{ animation: "floatSlow 10s ease-in-out infinite" }}
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 bottom-[-18px] -translate-x-1/2 z-20 w-[110vw] max-w-none">
        <img
          src={waveMiddle}
          alt=""
          className="block w-full h-auto opacity-95"
          style={{ animation: "floatMid 8s ease-in-out infinite" }}
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 bottom-[-34px] -translate-x-1/2 z-30 w-[110vw] max-w-none">
        <img
          src={waveFront}
          alt=""
          className="block w-full h-auto"
          style={{ animation: "floatFast 6.5s ease-in-out infinite" }}
        />
      </div>

      <div className="absolute inset-0 z-40 flex items-center justify-center">
        <p className="font-title text-[22px] leading-[28px] text-white">
          Your Tasting Note is …
        </p>
      </div>
    </div>
  );
}
