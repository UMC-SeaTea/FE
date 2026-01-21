type Props = {
  stepIndex: number;    
  totalSteps: number;    
  theme?: "purple" | "blue" | "mint";
};

const COLOR_BY_THEME: Record<NonNullable<Props["theme"]>, string> = {
  purple: "#A89EFF",
  blue: "#78C2FF",
  mint: "#6DEDD4",
};

export default function DiagnosisProgressBar({
  stepIndex,
  totalSteps,
  theme = "purple",
}: Props) {
  const ratio = totalSteps <= 0 ? 0 : (stepIndex + 1) / totalSteps;
  const fill = `${Math.max(0, Math.min(1, ratio)) * 100}%`;

  return (
    <div className="px-[20px]">
      <div
        className="mx-auto w-[335px] h-[8px] rounded-[4px] overflow-hidden relative"
        style={{
          backgroundColor: "#FFFFFF",

          boxShadow: [
            "inset 0 0 4px 0 #E2E1E8",   
            "0 2px 10px rgba(0,0,0,0.06)", 
          ].join(", "),
        }}
      >

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)",
            opacity: 0.55,
          }}
        />

        <div
          className="h-full rounded-[4px] relative z-[1]"
          style={{
            width: fill,
            backgroundColor: COLOR_BY_THEME[theme],
          }}
        />
      </div>
    </div>
  );
}
