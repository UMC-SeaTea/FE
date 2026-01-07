import { useState } from 'react';
type SideBarProps = {
  text: string;
};
import moveButton from '../../assets/moveButton.svg';

const SideBar = ({ text }: SideBarProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div
        className={`w-[335px] h-[64px] bg-white py-[16px] pl-[16px] cursor-pointer
        ${isActive ? 'flex gap-[6px]' : ''}`}
        onClick={() => setIsActive(!isActive)}
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

export default SideBar;
