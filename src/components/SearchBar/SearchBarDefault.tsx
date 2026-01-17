import { useEffect, useState } from 'react';
import searchIcon from '../../assets/search_searchBar.svg';
import useDebounce from '../../hooks/useDebounce';

const SearchBarDefault = () => {
  const [search, setSearch] = useState('');
  const deBouncedValue = useDebounce(search, 3000);

  useEffect(() => {
    if (!deBouncedValue.trim()) return;

    console.log('검색 API 요청:', deBouncedValue);
  }, [deBouncedValue]);

  return (
    <>
      <div className="w-[335px] h-[48px] rounded-full border-1 border-black px-[20px] py-[12px] bg-white">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="키워드를 검색해보세요"
            value={search}
            className="text-start font-body text-body-2 outline-none
            placeholder:text-gray-200 focus:placeholder:text-transparent"
            onChange={(e) => setSearch(e.target.value)}
          />
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
