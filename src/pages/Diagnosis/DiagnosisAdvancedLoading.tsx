// src/pages/Diagnosis/DiagnosisAdvancedLoading.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DiagnosisLoading from "./DiagnosisLoading";

export default function DiagnosisAdvancedLoading() {
  const navigate = useNavigate();
  const location = useLocation();

  const sessionId = location.state?.sessionId as number | undefined;
  const startWaveColor = location.state?.startWaveColor as string | undefined;

  useEffect(() => {
    const t = window.setTimeout(() => {
      navigate("/diagnosis/detail?mode=advanced", {
        state: { sessionId, startWaveColor }, 
        replace: true,
      });
    }, 3600);

    return () => window.clearTimeout(t);
  }, [navigate, sessionId, startWaveColor]);

  return (
    <DiagnosisLoading
      variant="advanced"
      spinnerVariant="ring"
      durationMs={3600}
    />
  );
}
