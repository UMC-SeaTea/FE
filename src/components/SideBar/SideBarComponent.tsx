type SideBarProps = {
  text: string;
  onClick?(): void;
};
import moveButton from '../../assets/moveButton.svg';

const SideBarComponent = ({ text, onClick }: SideBarProps) => {
  return (
    <>
      <div
        className="group flex w-[335px] h-[64px] bg-white py-[16px] pl-[16px] cursor-pointer
        group-hover:gap-[6px]"
        onClick={onClick}
      >
        <p
          className="font-body text-[22px] text-black font-medium
            group-hover:text-brand 
              group-hover:font-semibold"
        >
          {text}
        </p>
        <img
          src={moveButton}
          alt="MoveButton"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </>
  );
};

export default SideBarComponent;
