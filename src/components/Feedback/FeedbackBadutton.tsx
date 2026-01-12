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
        border-gray-500
        bg-white
        flex items-center justify-center gap-[10px]
      "
    >
      <img src={bad} alt="" className="w-[20px] h-[20px]" />
      <span className="font-body text-body-4 text-gray-300">
        {label}
      </span>
    </button>
  );
};

export default FeedbackBadButton;
