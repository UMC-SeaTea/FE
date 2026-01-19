import { useNavigate, useSearchParams } from 'react-router-dom';
import KeywordButton from '../../components/common/KeywordButton';
import SearchList from '../../components/common/SearchList';
import SearchBarTouched from '../../components/SearchBar/SearchBarTouched';
import { useEffect, useMemo, useState } from 'react';
import SearchResult from '../../components/common/SearchResult';

const MapSearchPage = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const q = useMemo(() => (params.get('q') ?? '').trim(), [params]);
  const isResultMode = q.length > 0;

  const [inputValue, setInputValue] = useState(q);

  useEffect(() => {
    setInputValue(q);
  }, [q]);

  const commitQuery = (raw: string) => {
    const next = raw.trim();
    if (!next) {
      setParams({}, { replace: true });
      return;
    }
    setParams({ q: next }, { replace: true });
  };

  // 뒤로 가기 처리
  const handleBack = () => {
    // 검색 결과 모드면 검색어 초기화
    if (isResultMode) {
      setParams({}, { replace: true });
      return;
    }
    navigate(-1);
  };

  return (
    <div className="px-[20px] pt-[76px]">
      <SearchBarTouched
        value={inputValue}
        onChange={setInputValue}
        onSubmit={commitQuery}
        onBack={handleBack}
        onClear={() => setParams({}, { replace: true })}
      />
      {isResultMode ? (
        <div className="pt-[43px]">
          <p className="pb-[16px] text-body-4 font-body text-gray-100">
            검색 결과
          </p>
          <div className="flex flex-col gap-[8px]">
            <SearchResult />
            <SearchResult />
          </div>
        </div>
      ) : (
        <>
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
              <KeywordButton
                text="조용한 카페"
                onClick={() => setParams({ q: '조용한 카페' })}
              />
              <KeywordButton
                text="박물관"
                onClick={() => setParams({ q: '박물관' })}
              />
              <KeywordButton
                text="미술관"
                onClick={() => setParams({ q: '미술관' })}
              />
              <KeywordButton
                text="사찰"
                onClick={() => setParams({ q: '사찰' })}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MapSearchPage;
