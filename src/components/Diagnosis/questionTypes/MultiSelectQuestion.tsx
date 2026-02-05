<<<<<<< HEAD
type Option = { id: string; label: string };
type Theme = "purple" | "blue" | "mint";
=======
import clsx from 'clsx';

type Option = { id: string; label: string };
type Theme = 'purple' | 'blue' | 'mint';
>>>>>>> cde5186a929ca3ddb32f825775293dcde8c55cae

type Props = {
  options: Option[];
  selectedIds: string[];
<<<<<<< HEAD
  maxSelect?: number; 
=======
  maxSelect?: number;
>>>>>>> cde5186a929ca3ddb32f825775293dcde8c55cae
  onChange: (nextSelected: string[]) => void;

  theme?: Theme;

  ctaText?: string;
  ctaDisabled?: boolean;
  onCtaClick?: () => void;
};

const THEME = {
  purple: {
<<<<<<< HEAD
    activeBorder: "border-brand",
    activeBg: "bg-[rgba(47,22,255,0.06)]",
    activeText: "text-brand",
    hoverBorder: "hover:border-brand",
    hoverBg: "hover:bg-[rgba(47,22,255,0.06)]",
    hoverText: "group-hover:text-brand",
  },
  blue: {
    activeBorder: "border-[#0087F6]",
    activeBg: "bg-[rgba(0,135,246,0.08)]",
    activeText: "text-[#0087F6]",
    hoverBorder: "hover:border-[#0087F6]",
    hoverBg: "hover:bg-[rgba(0,135,246,0.08)]",
    hoverText: "group-hover:text-[#0087F6]",
  },
  mint: {
    activeBorder: "border-[#16AB8E]",
    activeBg: "bg-[#F2FFFC]",
    activeText: "text-[#16AB8E]",
    hoverBorder: "hover:border-[#16AB8E]",
    hoverBg: "hover:bg-[#F2FFFC]",
    hoverText: "group-hover:text-[#16AB8E]",
  },
} as const;


export default function MultiSelectQuestion({
  options,
  selectedIds,
  maxSelect = 999,      
  onChange,
  theme = "mint",
=======
    activeBorder: 'border-brand',
    activeBg: 'bg-[rgba(47,22,255,0.06)]',
    activeText: 'text-brand',
    hoverBorder: 'hover:border-brand',
    hoverBg: 'hover:bg-[rgba(47,22,255,0.06)]',
    hoverText: 'group-hover:text-brand',
  },
  blue: {
    activeBorder: 'border-[#0087F6]',
    activeBg: 'bg-[rgba(0,135,246,0.08)]',
    activeText: 'text-[#0087F6]',
    hoverBorder: 'hover:border-[#0087F6]',
    hoverBg: 'hover:bg-[rgba(0,135,246,0.08)]',
    hoverText: 'group-hover:text-[#0087F6]',
  },
  mint: {
    activeBorder: 'border-[#16AB8E]',
    activeBg: 'bg-[#F2FFFC]',
    activeText: 'text-[#16AB8E]',
    hoverBorder: 'hover:border-[#16AB8E]',
    hoverBg: 'hover:bg-[#F2FFFC]',
    hoverText: 'group-hover:text-[#16AB8E]',
  },
} as const;

export default function MultiSelectQuestion({
  options,
  selectedIds,
  maxSelect = 999,
  onChange,
  theme = 'mint',
>>>>>>> cde5186a929ca3ddb32f825775293dcde8c55cae
  ctaText,
  ctaDisabled,
  onCtaClick,
}: Props) {
  const t = THEME[theme];

  const toggle = (id: string) => {
    const exists = selectedIds.includes(id);
<<<<<<< HEAD
    const next = exists ? selectedIds.filter((x) => x !== id) : [...selectedIds, id];

=======
    const next = exists
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
>>>>>>> cde5186a929ca3ddb32f825775293dcde8c55cae

    if (!exists && next.length > maxSelect) return;

    onChange(next);
  };

  return (
    <div className="mx-auto w-[335px]">
      <div className="flex flex-col gap-[10px]">
<<<<<<< HEAD
      {options.map((o) => {
        const active = selectedIds.includes(o.id);

        return (
          <button
            key={o.id}
            type="button"
            onClick={() => toggle(o.id)}
            className={[
              "group",
              "w-full h-[49px] rounded-[25px]",
              "border px-[28px]",
              "flex items-center justify-center",
              "transition-colors duration-200",

              active
                ? `${t.activeBorder} ${t.activeBg}`
                : [
                    "border-[#DEDEDE] bg-white",
                    t.hoverBorder,
                    t.hoverBg,
                  ].join(" "),
            ].join(" ")}
          >
            <span
              className={[
                "font-body text-body-2 leading-[140%] tracking-[-0.025em]",
                "transition-colors duration-200",

                active
                  ? t.activeText
                  : ["text-[#77767E]", t.hoverText].join(" "),
              ].join(" ")}
            >
              {o.label}
            </span>
          </button>
        );
      })}
=======
        {options.map((o) => {
          const active = selectedIds.includes(o.id);

          return (
            <button
              key={o.id}
              type="button"
              onClick={() => toggle(o.id)}
              className={clsx(
                'group',
                'w-full h-[49px] rounded-[25px]',
                'border px-[28px]',
                'flex items-center justify-center',
                'transition-colors duration-200 cursor-pointer',

                active
                  ? [t.activeBorder, t.activeBg]
                  : ['border-[#DEDEDE] bg-white', t.hoverBorder, t.hoverBg]
              )}
            >
              <span
                className={clsx(
                  'font-body text-body-2 leading-[140%] tracking-[-0.025em]',
                  'transition-colors duration-200',

                  active ? t.activeText : ['text-[#77767E]', t.hoverText]
                )}
              >
                {o.label}
              </span>
            </button>
          );
        })}
>>>>>>> cde5186a929ca3ddb32f825775293dcde8c55cae
      </div>

      {ctaText && onCtaClick && (
        <div className="mt-[24px]">
          <button
            type="button"
            onClick={onCtaClick}
            disabled={ctaDisabled}
<<<<<<< HEAD
            className={[
              "w-full h-[52px] rounded-[14px]",
              "font-body text-[16px] font-[600]",
              ctaDisabled
                ? "bg-gray-200 text-gray-500"
                : "bg--brand text-white",
            ].join(" ")}
=======
            className={clsx(
              'w-full h-[52px] rounded-[14px]',
              'font-body text-[16px] font-[600]',
              ctaDisabled ? 'bg-gray-200 text-gray-500' : 'bg-brand text-white'
            )}
>>>>>>> cde5186a929ca3ddb32f825775293dcde8c55cae
          >
            {ctaText}
          </button>
        </div>
      )}
    </div>
  );
}
