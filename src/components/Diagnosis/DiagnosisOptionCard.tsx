import clsx from 'clsx';

type Props = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function DiagnosisOptionCard({
  label,
  selected = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        'w-[162px] h-[169px] rounded-lg',
        'inline-flex items-center justify-center',
        'text-center whitespace-pre-line cursor-pointer',
        'transition-colors duration-200',
        'shadow-[0_0_8px_rgba(191,191,191,0.5),0_0_8.4px_rgba(170,169,176,0.4)]',

        selected
          ? 'bg-[#F7F6FF] border border-[#7464FF]'
          : [
              'bg-white border border-transparent',
              'hover:bg-[#F7F6FF]',
              'hover:border-[#7464FF]',
            ]
      )}
    >
      <span
        className={clsx(
          'font-body text-[16px] leading-[140%] font-[500] tracking-[-0.025em]',
          'transition-colors duration-200',
          selected ? 'text-brand' : 'text-gray-100 hover:text-brand'
        )}
      >
        {label}
      </span>
    </button>
  );
}
