import clsx from "clsx";
import type { StepStyle } from "./diagnosisProgressColors";

type Props = {
  label: string;
  selected?: boolean;
  onClick?: () => void;

  
  styleSet: StepStyle;
};

export default function DiagnosisOptionCard({
  label,
  selected = false,
  onClick,
  styleSet,
}: Props) {
  const { border, text, cardBg } = styleSet;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        "w-[162px] h-[169px] rounded-lg",
        "inline-flex items-center justify-center",
        "text-center whitespace-pre-line cursor-pointer",
        "transition-colors duration-200",
        "shadow-[0_0_8px_rgba(191,191,191,0.5),0_0_8.4px_rgba(170,169,176,0.4)]",
        "border"
      )}
      style={{
        
        backgroundColor: selected ? cardBg : "#FFFFFF",
        borderColor: selected ? border : "transparent",
      }}
      onMouseEnter={(e) => {
        if (selected) return;
        e.currentTarget.style.backgroundColor = cardBg; 
        e.currentTarget.style.borderColor = border;    
      }}
      onMouseLeave={(e) => {
        if (selected) return;
        e.currentTarget.style.backgroundColor = "#FFFFFF";
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      <span
        className={clsx(
          "font-body text-[16px] leading-[140%] font-[500] tracking-[-0.025em]",
          "transition-colors duration-200"
        )}
        style={{
          
          color: selected ? text : "#77767E", 
        }}
      >
        {label}
      </span>
    </button>
  );
}
