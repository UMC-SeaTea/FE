import good from '../../assets/good.svg';
import emptyGood from '../../assets/emptyGood.svg';
import bad from '../../assets/bad.svg';
import emptyBad from '../../assets/emptyBad.svg';

type Props = {
  type: 'good' | 'bad';
  label: string;
  isSelected: boolean;
  onClick?: () => void;
};

const FeedbackButton = ({ type, label, isSelected, onClick }: Props) => {
  const icon =
    type === 'good'
      ? isSelected
        ? good
        : emptyGood
      : isSelected
        ? bad
        : emptyBad;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-[134px] h-[42px] px-[16px] py-[10px]
        rounded-[100px] border
        flex items-center justify-center gap-[2px] cursor-pointer
        transition
        ${
          isSelected
            ? 'border-brand bg-light-blue-2'
            : 'border-gray-500 bg-white'
        }
      `}
    >
      <img src={icon} alt={`${type} icon`} className="w-[20px] h-[20px]" />
      <span
        className={`font-body text-body-4 whitespace-nowrap ${
          isSelected ? 'text-main-blue' : 'text-gray-200'
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default FeedbackButton;
