type ButtonDefaultProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const ButtonDefault = ({ text, onClick, className }: ButtonDefaultProps) => {
  return (
    <button
      className={`w-[311px] h-[48px] rounded-md font-body text-body-4 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonDefault;
