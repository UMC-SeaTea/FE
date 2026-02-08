import React from 'react';
import closeButton from '../../assets/profileEdit_closeButton.svg';

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  type?: string;
}

const MyPageProfileEditInput = ({
  label,
  value,
  onChange,
  onClear,
  type = 'text',
}: InputProps) => {
  return (
    <div className="flex flex-col items-start gap-[4px] self-stretch">
      <div className="flex px-[4px] items-center gap-[10px]">
        <span className="font-body text-gray-300 text-detail-3">{label}</span>
      </div>

      <div className="flex items-center self-stretch h-[48px] px-[11px] rounded-[6px] bg-white/10 relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="flex-1 text-white font-body text-body-4"
        />
        {value && (
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={onClear}
          >
            <img src={closeButton} alt="clear" className="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPageProfileEditInput;
