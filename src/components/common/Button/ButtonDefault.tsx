import type { ButtonProps } from '../../../types/button';

const ButtonDefault = ({ text, onClick, className }: ButtonProps) => {
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
