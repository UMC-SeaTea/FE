import { useNavigate, useSearchParams } from 'react-router-dom';
import KeywordButton from '../../components/common/KeywordButton';
import SearchList from '../../components/common/SearchList';
import SearchBarTouched from '../../components/SearchBar/SearchBarTouched';
import { useEffect, useMemo, useState } from 'react';
import SearchResult from '../../components/common/SearchResult';

type RecentItem = {
  id: string;
  name: string;
  timeText: string;
};

const MapSearchPage = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const q = useMemo(() => (params.get('q') ?? '').trim(), [params]);
  const isResultMode = q.length > 0;

  // inputValue는 입력 중인 값, q는 확정된 검색어
  const [inputValue, setInputValue] = useState(q);

  // 최근 검색어: 하드코딩으로 진행, 추후 연동
  const [recentItems, setRecentItems] = useState<RecentItem[]>([
    { id: '1', name: '국립현대미술관', timeText: '1시간전' },
    { id: '2', name: 'LCDC', timeText: '어제' },
    { id: '3', name: '덕수궁', timeText: '10.04' },
    { id: '4', name: '그랑핸드', timeText: '09.21' },
  ]);

  useEffect(() => {
    setInputValue(q);
  }, [q]);

  // 검색어 확정
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

  // 최근 검색어 동작
  const handleClickRecent = (name: string) => {
    setParams({ q: name }, { replace: true });
  };
  const handleRemoveRecent = (id: string) => {
    setRecentItems((prev) => prev.filter((item) => item.id !== id));
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
            <SearchResult type="Floral" name="국립현대미술관" distance="1.2" />
            <SearchResult type="Smocky" name="국립중앙박물관" distance="3.2" />
          </div>
        </div>
      ) : (
        <>
          {/* 최근 검색어 */}
          <div className="py-[48px]">
            <div className="flex flex-col gap-[4px]">
              <p className="text-body-4 font-body text-gray-100">최근 검색어</p>
              <div>
                {recentItems.map((item) => (
                  <SearchList
                    key={item.id}
                    name={item.name}
                    timeText={item.timeText}
                    onClick={() => handleClickRecent(item.name)}
                    onRemove={() => handleRemoveRecent(item.id)}
                  />
                ))}
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
