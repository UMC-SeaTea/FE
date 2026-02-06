import clsx from 'clsx';
import type { ButtonProps } from '../../types/button';

const ButtonMedium = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'rounded-full flex items-center justify-center p-[14px] cursor-pointer',
        'bg-white text-brand font-body',
        className
      )}
    >
      {text}
    </button>
  );
};

export default ButtonMedium;
