type Option = { id: string; label: string };
type Theme = "purple" | "blue" | "mint";

type Props = {
  options: Option[];
  selectedIds: string[];
  maxSelect?: number; 
  onChange: (nextSelected: string[]) => void;

  theme?: Theme;

  ctaText?: string;
  ctaDisabled?: boolean;
  onCtaClick?: () => void;
};

const THEME = {
  purple: {
    activeBorder: "border-[var(--color-brand)]",
    activeBg: "bg-[rgba(47,22,255,0.06)]",
    activeText: "text-[var(--color-brand)]",
  },
  blue: {
    activeBorder: "border-[#0087F6]",
    activeBg: "bg-[rgba(0,135,246,0.08)]",
    activeText: "text-[#0087F6]",
  },
  mint: {
    activeBorder: "border-[#16AB8E]",
    activeBg: "bg-[#F2FFFC]",
    activeText: "text-[#16AB8E]",
  },
} as const;

export default function MultiSelectQuestion({
  options,
  selectedIds,
  maxSelect = 999,      
  onChange,
  theme = "mint",
  ctaText,
  ctaDisabled,
  onCtaClick,
}: Props) {
  const t = THEME[theme];

  const toggle = (id: string) => {
    const exists = selectedIds.includes(id);
    const next = exists ? selectedIds.filter((x) => x !== id) : [...selectedIds, id];


    if (!exists && next.length > maxSelect) return;

    onChange(next);
  };

  return (
    <div className="mx-auto w-[335px]">
      <div className="flex flex-col gap-[10px]">
        {options.map((o) => {
          const active = selectedIds.includes(o.id);

          return (
            <button
              key={o.id}
              type="button"
              onClick={() => toggle(o.id)}
              className={[
                "w-full h-[49px] rounded-[25px]",
                "border",
                "px-[28px]",
                "flex items-center justify-center",
                "transition-colors",
                active ? `${t.activeBorder} ${t.activeBg}` : "border-[#DEDEDE] bg-white",
              ].join(" ")}
            >
              <span
                className={[
                  "font-body",
                  "text-[16px] font-[500] leading-[140%] tracking-[-0.025em]",
                  active ? t.activeText : "text-[#77767E]",
                ].join(" ")}
              >
                {o.label}
              </span>
            </button>
          );
        })}
      </div>

      {ctaText && onCtaClick && (
        <div className="mt-[24px]">
          <button
            type="button"
            onClick={onCtaClick}
            disabled={ctaDisabled}
            className={[
              "w-full h-[52px] rounded-[14px]",
              "font-body text-[16px] font-[600]",
              ctaDisabled
                ? "bg-[var(--color-gray-200)] text-[var(--color-gray-500)]"
                : "bg-[var(--color-brand)] text-white",
            ].join(" ")}
          >
            {ctaText}
          </button>
        </div>
      )}
    </div>
  );
}
