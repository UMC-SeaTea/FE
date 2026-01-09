type SideBarProps = {
  text: string;
  isActive: boolean;
  onClick?: () => void;
};
import moveButton from '../../assets/moveButton.svg';

const SideBarComponent = ({ text, isActive, onClick }: SideBarProps) => {
  return (
    <>
      <div
        className={`w-[335px] h-[64px] bg-white py-[16px] pl-[16px] cursor-pointer
        ${isActive ? 'flex gap-[6px]' : ''}`}
        onClick={onClick}
      >
        <p
          className={`font-body text-[22px]
            ${isActive ? 'text-brand font-semibold' : 'text-black font-medium'}`}
        >
          {text}
        </p>
        {isActive && <img src={moveButton} alt="MoveButton" />}
      </div>
    </>
  );
};

export default SideBarComponent;
