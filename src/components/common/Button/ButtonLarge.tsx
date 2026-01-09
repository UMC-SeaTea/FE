import type { ButtonProps } from '../../../types/button';

const ButtonLarge = ({ text }: ButtonProps) => {
  return (
    <button className="w-[335px] h-[74px] rounded-md bg-white shadow-[0_0_9.9px_0_rgba(141,141,141,0.24)]">
      <p className="text-black-2 font-body text-body-2 py-[28px] px-[77px]">
        {text}
      </p>
    </button>
  );
};

export default ButtonLarge;
