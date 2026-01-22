import backMoveButton from "../../assets/backMoveButton.svg";

interface PageHeaderProps {
  title: string;
  onBack: () => void;
}

const SignUpPageHeader = ({ title, onBack }: PageHeaderProps) => {
  return (
    <div className="relative w-full flex justify-center items-center mt-[87px] h-[30px] px-[22px]">
      <button 
        onClick={onBack}
        className="absolute left-[22px]"
      >
        <img 
          src={backMoveButton} 
          alt="back move button" 
          className="w-[10px] h-5 cursor-pointer"
        />
      </button>
      <div className="font-title text-title-3 text-brand">
        {title}
      </div>
    </div>
  );
};

export default SignUpPageHeader;