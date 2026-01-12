import good from '../../../assets/good.svg';

type Props = {
  label: string;
  onClick?: () => void;
};

const FeedbackGoodButton = ({ label, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-[134px] h-[42px] px-[16px] py-[10px]
        rounded-[100px] border
        border-brand
        bg-light-blue-2
        flex items-center justify-center gap-[2px]
      "
    >
      <img src={good} alt="" className="w-[20px] h-[20px]" />
      <span className="font-body text-body-4 text-main-blue">{label}</span>
    </button>
  );
};

export default FeedbackGoodButton;
