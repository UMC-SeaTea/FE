import sortIcon from "../../assets/list.svg"; 

type Props = {
  onClick?: () => void;
};

const SortButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        h-[32px]
        px-[12px] py-[6px]
        rounded-[100px] border
        border-[var(--color-gray-400)]
        bg-[var(--color-white)]
        inline-flex items-center justify-center gap-[10px]
      "
    >
      <img src={sortIcon} alt="정렬" className="w-[16px] h-[16px]" />
      <span className="font-[var(--font-body)] text-[14px] font-medium text-[var(--color-gray-200)]">
        정렬
      </span>
    </button>
  );
};

export default SortButton;
