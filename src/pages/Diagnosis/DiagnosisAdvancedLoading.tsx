// src/pages/Diagnosis/DiagnosisAdvancedLoading.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DiagnosisLoading from "./DiagnosisLoading";

export default function DiagnosisAdvancedLoading() {
  const navigate = useNavigate();
  const location = useLocation();

  const sessionId = location.state?.sessionId as number | undefined;

  useEffect(() => {
    const t = window.setTimeout(() => {
      navigate("/diagnosis/detail?mode=advanced", {
        state: { sessionId }, // ✅ 핵심: sessionId carry
        replace: true,
      });
    }, 3600); // 기존 durationMs 맞춤

    return () => window.clearTimeout(t);
  }, [navigate, sessionId]);

  return (
    <DiagnosisLoading
      variant="advanced"
      spinnerVariant="ring"
      durationMs={3600}
      // ❗ nextPath는 더 이상 사용하지 않음 (자동 이동 방지용)
      // nextPath="/diagnosis/detail?mode=advanced"
    />
  );
}
