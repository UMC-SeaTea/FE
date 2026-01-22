interface BottomButtonProps {
  text: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string; 
}

const SignUpPageBottomButton = ({ text, onClick, disabled, className = '' }: BottomButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center items-center w-full rounded-[25px] p-[14px] gap-2.5 
        bg-brand text-white font-body text-body-title animate-fade-in ${className}`}
    >
      {text}
    </button>
  );
};

export default SignUpPageBottomButton;