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
        inline-flex items-center justify-center h-[35px]
        px-[12px] py-[8px]
        rounded-[100px]
        bg-gray-500
      "
    >
      <span className="font-body text-body-4 text-gray-100 ">{text}</span>
    </button>
  );
};

export default KeywordButton;
