import bad from "../../assets/bad.svg";

type Props = {
  label: string;
  onClick?: () => void;
};

const FeedbackBadButton = ({ label, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-[134px] h-[42px] px-[16px] py-[10px]
        rounded-[100px] border
        border-[var(--color-gray-500)]
        bg-[var(--color-white)]
        flex items-center justify-center gap-[10px]
      "
    >
      <img src={bad} alt="" className="w-[16px] h-[16px]" />
      <span
        className="
          font-[var(--font-body)]
          text-[14px]
          font-medium
          text-[var(--color-gray-300)]
        "
      >
        {label}
      </span>
    </button>
  );
};

export default FeedbackBadButton;
