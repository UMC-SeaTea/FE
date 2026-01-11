import type { ButtonProps } from '../../types/button';

const ButtonMedium = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-[311px] h-[44px] rounded-full flex items-center justify-center px-[14px] py-[12px] 
    bg-white text-brand font-body text-body-4 cursor-pointer"
    >
      {text}
    </button>
  );
};

export default ButtonMedium;
