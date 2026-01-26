import type { TastingKey } from '../../types/tastingType/tastingType';

type ChipTextColor = TastingKey | 'white';

type Props = {
  label: string;
  textColor?: ChipTextColor;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

const TEXT_COLOR_CLASS: Record<ChipTextColor, string> = {
  smoky: 'text-smoky',
  oceanic: 'text-oceanic',
  fruity: 'text-fruity',
  floral: 'text-floral',
  earthy: 'text-earthy',
  sweet: 'text-sweet',
  spices: 'text-spices',
  nutty: 'text-nutty',
  white: 'text-white',
};

const Chip = ({
  label,
  textColor = 'white',
  active = false,
  onClick,
  className = '',
}: Props) => {
  const base =
    'inline-flex items-center justify-center h-[32px] px-[20px] py-[6px] rounded-sm cursor-pointer';

  const container = active ? 'bg-black' : 'bg-white border border-black';

  const textColorClass = active ? TEXT_COLOR_CLASS[textColor] : 'text-black';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${container} ${className}`}
    >
      <span className={`font-body text-detail-1 ${textColorClass}`}>
        {label}
      </span>
    </button>
  );
};

export default Chip;
