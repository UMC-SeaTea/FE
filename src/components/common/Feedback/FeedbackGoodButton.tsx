import good from "../../assets/good.svg";

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
        border-[var(--color-brand)]
        bg-[var(--color-light-blue-2)]
        flex items-center justify-center gap-[10px]
      "
    >
      <img src={good} alt="" className="w-[16px] h-[16px]" />
      <span
        className="
          font-[var(--font-body)]
          text-[14px]
          font-medium
          text-[var(--color-main-blue)]
        "
      >
        {label}
      </span>
    </button>
  );
};

export default FeedbackGoodButton;
