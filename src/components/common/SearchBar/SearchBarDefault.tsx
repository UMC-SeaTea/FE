import searchIcon from '../../../assets/search_searchBar.svg';

const SearchBarDefault = () => {
  return (
    <>
      <div className="w-[335px] h-[48px] rounded-full border-1 border-black px-[20px] py-[12px]">
        <div className="flex items-center justify-between">
          <p className="text-gray-200 font-body text-body-2">
            키워드를 검색해보세요
          </p>
          <div className="w-[24px] h-[24px] flex items-center justify-center">
            <img
              src={searchIcon}
              alt="search icon"
              className="w-[24px] h-[24px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBarDefault;
