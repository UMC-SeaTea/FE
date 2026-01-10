type Props = {
  text: string;
  onClick?: () => void;
};

const KeywordButton = ({ text, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex items-center justify-center
        h-[35px]
        px-[12px] py-[8px]
        rounded-[100px]
        bg-[var(--color-gray-500)]
      "
    >
      <span
        className="
          font-[var(--font-body)]
          text-[14px]
          font-medium
          leading-[140%]
          tracking-[-0.025em]
          text-[var(--color-gray-100)]
        "
      >
        {text}
      </span>
    </button>
  );
};

export default KeywordButton;
