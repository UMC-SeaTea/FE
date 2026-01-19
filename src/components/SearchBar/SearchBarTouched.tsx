import backButtonBlack from '../../assets/backButton_black.svg';

const SearchBarTouched = () => {
  return (
    <>
      <div className="w-[335px] h-[48px] rounded-full border-1 border-black px-[20px] py-[12px]">
        <div className="flex items-center justify-start">
          <img
            src={backButtonBlack}
            alt="back button"
            className="w-[24px] h-[24px] cursor-pointer"
          />
          <input
            type="text"
            placeholder="키워드를 검색해보세요"
            className="text-center w-[271px] font-body text-body-2 outline-none
            placeholder:text-gray-200 focus:placeholder:text-transparent"
          />
        </div>
      </div>
    </>
  );
};

export default SearchBarTouched;
