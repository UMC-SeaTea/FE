type ButtonLargeProps = {
  text: string;
};

const ButtonLarge = ({ text }: ButtonLargeProps) => {
  return (
    <div className="w-[335px] h-[74px] rounded-md bg-white shadow-[0_0_9.9px_0_rgba(141,141,141,0.24)]">
      <p className="text-black-2 font-body text-body-2 py-[28px] px-[77px]">
        {text}
      </p>
    </div>
  );
};

export default ButtonLarge;
