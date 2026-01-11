import refreshIcon from "../../assets/reset.svg"; 

type Props = {
  onClick?: () => void;
  ariaLabel?: string;
};

const RefreshButton = ({ onClick, ariaLabel = "새로고침" }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="
        w-[28px] h-[28px]
        rounded-[100px]
        border border-gray-400
        bg-white
        p-[7px]
        inline-flex items-center justify-center
      "
    >
      <img src={refreshIcon} alt="" className="w-[14px] h-[14px]" />
    </button>
  );
};

export default RefreshButton;
