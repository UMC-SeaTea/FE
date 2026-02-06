import { useState } from 'react';
import passwordOnButton from '../../assets/passwordOnButton.svg';
import passwordOffButton from '../../assets/passwordOffButton.svg';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  isPassword?: boolean;
  rightSection?: React.ReactNode;
  isError?: boolean;
}

const FormInput = ({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  isPassword = false,
  rightSection,
  isError = false,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="items-start self-stretch flex flex-col gap-[8px] w-full">
      <div className="text-footer font-body text-body-2">{label}</div>
      <div
        className={`flex items-center w-full h-[50px] gap-2.5 px-[17px] rounded-[25px] transition-all bg-white
        shadow-[0_0_9.9px_0_rgba(141,141,141,0.24)] border
        ${isError ? 'border-[#F00] border-[0.7px]' : 'border-gray-200'} 
        `}
      >
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none font-body text-body-5
           text-black-2 placeholder:text-gray-200 "
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="w-7.5 h-7.5 flex justify-center items-center shrink-0"
          >
            <img
              src={showPassword ? passwordOnButton : passwordOffButton}
              alt="toggle visibility"
              className="w-6 h-10.5 object-contain"
            />
          </button>
        ) : (
          rightSection
        )}
      </div>
    </div>
  );
};

export default FormInput;
