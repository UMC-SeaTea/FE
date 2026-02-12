import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import backIcon from '../../assets/backButton_black.svg';
import PastResult from '../../components/common/PastResult';
import { useInfiniteDiagnosisHistory } from '../../hooks/diagnosis/useInfiniteDiagnosisHistory';
import { formatDate } from '../../lib/formatDate';
import type { DiagnosisHistoryItem } from '../../types/diagnosis/history';

const PastResultPage = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteDiagnosisHistory(10);

  const items: DiagnosisHistoryItem[] = useMemo(() => {
    const pages = data?.pages ?? [];
    return pages.flatMap((p) => p.result?.content ?? []);
  }, [data]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        if (!hasNextPage) return;
        if (isFetchingNextPage) return;
        fetchNextPage();
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <NavBar variant="3" icon={backIcon} onClick={() => navigate(-1)} />

      <div className="px-[20px] pt-[28px]">
        <p className="font-body text-body-title text-black pb-[20px]">
          과거 진단내역
        </p>

        <div className="flex flex-col gap-[8px]">
          {isLoading ? (
            <p className="font-body text-body-4 text-gray-400">
              불러오는 중...
            </p>
          ) : isError ? (
            <p className="font-body text-body-4 text-red-500">
              과거 진단내역을 불러오지 못했습니다.
            </p>
          ) : items.length === 0 ? (
            <p className="font-body text-body-4 text-gray-400">
              아직 진단 내역이 없습니다.
            </p>
          ) : (
            <>
              {items.map((item) => (
                <PastResult
                  key={item.sessionId}
                  type={item.displayName}
                  date={formatDate(item.createdAt)}
                />
              ))}

              <div ref={sentinelRef} />

              {isFetchingNextPage && (
                <p className="pt-[12px] text-center font-body text-body-4 text-gray-400">
                  더 불러오는 중...
                </p>
              )}
            </>
          )}
        </div>

        {!isLoading && !isError && !hasNextPage && items.length > 0 && (
          <p className="pt-[40px] text-center font-body text-body-4 text-gray-300">
            목록의 끝입니다.
          </p>
        )}
      </div>
    </>
  );
};

export default PastResultPage;
