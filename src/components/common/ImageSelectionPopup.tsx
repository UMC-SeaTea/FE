import { useRef } from 'react';
import cameraIcon from '../../assets/cameraIcon.svg';
import galleryIcon from '../../assets/galleryIcon.svg';

interface Props {
  onImageSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  className?: string;
}

const ImageSelectionPopup = ({
  onImageSelected,
  onClose,
  className,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (
    e: React.MouseEvent,
    ref: React.RefObject<HTMLInputElement | null>
  ) => {
    e.stopPropagation();
    if (ref.current) {
      ref.current.value = '';
      ref.current.click();
    }
  };

  return (
    <div
      className={`animate-fade-in z-50 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageSelected}
        style={{ display: 'none' }}
        accept="image/*"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={onImageSelected}
        style={{ display: 'none' }}
        accept="image/*"
        capture="user"
      />

      <div
        className="flex flex-col w-[252px] h-[75px] justify-center items-center rounded-[13px] 
          bg-[rgba(249,249,249,0.80)] backdrop-blur-[2px] shadow-[0_0_12.6px_0_rgba(0,0,0,0.25)] overflow-hidden"
      >
        <button
          className="w-full flex-1 flex justify-between items-center pl-[16px] pr-[19px] mb-[1px]"
          onClick={(e) => handleButtonClick(e, cameraInputRef)}
        >
          <span className="font-body text-black text-body-5">사진 찍기</span>
          <img src={cameraIcon} alt="카메라" className="w-[16px] h-[11.5px]" />
        </button>
        <div className="w-[252px] h-[0.3px] bg-gray-300"></div>
        <button
          className="w-full flex-1 flex justify-between items-center pl-[16px] pr-[18px]"
          onClick={(e) => handleButtonClick(e, fileInputRef)}
        >
          <span className="font-body text-black text-body-5">사진 보관함</span>
          <img src={galleryIcon} alt="갤러리" className="w-[17px] h-[14px]" />
        </button>
      </div>

      <div
        className="fixed inset-0 z-[-1]"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
    </div>
  );
};

export default ImageSelectionPopup;
