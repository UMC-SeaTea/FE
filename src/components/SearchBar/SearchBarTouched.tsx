import backButtonBlack from '../../assets/backButton_black.svg';

type SearchBarTouchedProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (text: string) => void;
  onBack?: () => void;
  onClear?: () => void;
};

const SearchBarTouched = ({
  value,
  onChange,
  onSubmit,
  onBack,
}: SearchBarTouchedProps) => {
  return (
    <>
      <div className="w-[335px] h-[48px] rounded-full border-1 border-black px-[20px] py-[12px]">
        <div className="flex items-center justify-start">
          <img
            src={backButtonBlack}
            alt="back button"
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={() => {
              onBack?.();
            }}
          />
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit?.(value);
            }}
          >
            <input
              type="text"
              value={value}
              placeholder="키워드를 검색해보세요"
              className="text-center pr-[24px] w-[271px] font-body text-body-2 outline-none
            placeholder:text-gray-200 focus:placeholder:text-transparent"
              onChange={(e) => onChange(e.target.value)}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchBarTouched;
