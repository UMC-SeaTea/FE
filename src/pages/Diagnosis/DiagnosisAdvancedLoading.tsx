import DiagnosisLoading from "./DiagnosisLoading";

export default function DiagnosisAdvancedLoading() {
  return (
    <DiagnosisLoading
      variant="advanced"
      spinnerVariant="ring"
      durationMs={3600}
      nextPath="/diagnosis/detail?mode=advanced"
    />
  );
}
