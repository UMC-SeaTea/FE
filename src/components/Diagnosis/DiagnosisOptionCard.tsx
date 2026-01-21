type Props = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function DiagnosisOptionCard({ label, selected = false, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "w-[162px] h-[169px] rounded-[12px]",
        "inline-flex items-center justify-center",
        "text-center font-body text-body-2 text-gray-100 whitespace-pre-line transition-colors",
        selected ? "bg-[#F7F6FF] border border-[#7464FF]" : "bg-white border border-transparent",
        "shadow-[0_0_8px_rgba(191,191,191,0.5),0_0_8.4px_rgba(170,169,176,0.4)]",
      ].join(" ")}
    >
      <span
        className={[
          "font-body text-[16px] leading-[140%] font-[500] tracking-[-0.025em]",
          selected ? "text-brand" : "text-gray-100",
        ].join(" ")}
      >
        {label}
      </span>
    </button>
  );
}
