type ChipVariant = "filled" | "outlined";

type ChipTextColor =
  | "black"
  | "white"
  | "blue"
  | "pink"
  | "purple"
  | "mint"
  | "yellow"
  | "red"
  | "gray";

type Props = {
  label: string;
  variant?: ChipVariant;
  textColor?: ChipTextColor;
  onClick?: () => void;
  className?: string;
};

const TEXT_COLOR_CLASS: Record<ChipTextColor, string> = {
  black: "text-[#222222]",
  white: "text-[#DDDDDD]",
  blue: "text-[#78C2FF]",
  pink: "text-[#F198FF]",
  purple: "text-[#A89EFF]",
  mint: "text-[#6DEDD4]",
  yellow: "text-[#FFD688]",
  red: "text-[#FF8C8C]",
  gray: "text-[#D0B8B4]",
};

const Chip = ({
  label,
  variant = "filled",
  textColor = "white",
  onClick,
  className = "",
}: Props) => {
  const base =
    "inline-flex items-center justify-center h-[32px] px-[20px] py-[6px] rounded-[4px]";

  const container =
    variant === "filled"
      ? "bg-[var(--color-black)]"
      : "bg-[var(--color-white)] border border-[var(--color-black)]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${container} ${className}`}
    >
      <span
        className={`font-[var(--font-body)] text-[14px] font-medium ${TEXT_COLOR_CLASS[textColor]}`}
      >
        {label}
      </span>
    </button>
  );
};

export default Chip;
