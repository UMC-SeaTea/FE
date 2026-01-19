import KeywordButton from '../../components/common/KeywordButton';
import SearchList from '../../components/common/SearchList';
import SearchBarTouched from '../../components/SearchBar/SearchBarTouched';

const MapSearchPage = () => {
  return (
    <>
      <div className="px-[20px] pt-[76px]">
        <SearchBarTouched />
        {/* 최근 검색어 */}
        <div className="py-[48px]">
          <div className="flex flex-col gap-[4px]">
            <p className="text-body-4 font-body text-gray-100">최근 검색어</p>
            <div>
              <SearchList />
              <SearchList />
              <SearchList />
              <SearchList />
            </div>
          </div>
        </div>
        {/* 추천 검색어 */}
        <div className="flex flex-col gap-[12px]">
          <p className="text-body-4 font-body text-gray-100">추천 검색어</p>
          <div className="flex gap-[4px]">
            <KeywordButton text="조용한 카페" />
            <KeywordButton text="박물관" />
            <KeywordButton text="미술관" />
            <KeywordButton text="사찰" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MapSearchPage;
