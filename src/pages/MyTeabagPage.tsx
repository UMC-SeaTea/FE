import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import SpaceCardMini from '../components/common/SpaceCardMini';
import SortButton from '../components/common/SortButton';
import EditButton from '../components/common/EditButton';
import MoveupButton from '../assets/RoundButton/moveup_btn.svg';
import Footer from '../components/common/Footer';

import { getMyTeabagList, deleteMyTeabag } from '../apis/teabag/myTeabag';
import type { MyTeabagItem } from '../types/myTeabag';
import { useMemberStore } from '../stores/useMemberStore';

const MyTeabagPage = () => {
  const [items, setItems] = useState<MyTeabagItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);

  const [sortOrder, setSortOrder] = useState<'saved' | 'latest'>('saved');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const [isFooterInView, setIsFooterInView] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  const nickname = useMemberStore((s) => s.profile?.nickname);

  const fetchTeabagList = async (
    reset: boolean = false,
    cursor?: string | null
  ) => {
    try {
      if (reset) setLoading(true);

      const data = await getMyTeabagList(20, cursor, sortOrder);

      if (data.isSuccess && data.result) {
        setItems((prev) =>
          reset ? data.result!.items : [...prev, ...data.result!.items]
        );
        setNextCursor(data.result.cursorInfo.nextCursor);
        setHasNext(data.result.cursorInfo.hasNext);
      }
    } catch (error) {
      console.error('리스트 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeabagList(true);
  }, [sortOrder]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterInView(entry.isIntersecting),
      { threshold: 0 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    if (!hasNext || !nextCursor || loading) return;
    fetchTeabagList(false, nextCursor);
  };

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === 'saved' ? 'latest' : 'saved'));
  };

  const handleToggleEditMode = () => {
    setIsEditMode((prev) => {
      if (prev) {
        setSelectedIds(new Set());
      }
      return !prev;
    });
  };

  const handleSelectCard = (id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleIndividualDelete = async (id: number) => {
    if (!window.confirm('저장을 취소하시겠습니까?')) return;

    try {
      const res = await deleteMyTeabag(id);
      if (res.isSuccess) {
        setItems((prev) => prev.filter((item) => item.spaceId !== id));
        setSelectedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    } catch (error) {
      console.error('개별 삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (
      !window.confirm(`선택한 ${selectedIds.size}개의 티백을 삭제하시겠습니까?`)
    )
      return;

    try {
      const deletePromises = Array.from(selectedIds).map((id) =>
        deleteMyTeabag(id)
      );
      await Promise.all(deletePromises);

      setItems((prev) => prev.filter((item) => !selectedIds.has(item.spaceId)));

      setSelectedIds(new Set());
      setIsEditMode(false);
      alert('삭제되었습니다.');
    } catch (error) {
      console.error('일괄 삭제 실패:', error);
      fetchTeabagList(true);
      setSelectedIds(new Set());
      setIsEditMode(false);
      alert('삭제 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-full min-h-screen relative flex flex-col">
      <div className="flex-1 flex flex-col items-center w-[335px] gap-6 mt-[55px] mx-auto">
        <div className="flex items-center self-stretch justify-between">
          <div className="text-black font-body text-[20px] font-semibold leading-[140%] tracking-[-0.5px]">
            {nickname} 님의 티백
            {items.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({items.length})
              </span>
            )}
          </div>

          <div className="flex items-center gap-[4px]">
            {!isEditMode ? (
              <SortButton onClick={handleToggleSort} />
            ) : (
              <button
                onClick={handleBulkDelete}
                disabled={selectedIds.size === 0}
                className={clsx(
                  'flex items-center justify-center h-[32px] px-3 rounded-full text-xs font-medium transition-colors border',
                  selectedIds.size > 0
                    ? 'border-brand text-brand hover:bg-brand/10 cursor-pointer'
                    : 'border-gray-300 text-gray-300 cursor-default'
                )}
              >
                삭제 ({selectedIds.size})
              </button>
            )}

            <EditButton onClick={handleToggleEditMode} />
          </div>
        </div>

        {items.length > 0 ? (
          <div className="mx-auto inline-grid gap-y-6 gap-x-[11px] self-stretch grid-cols-2">
            {items.map((item) => (
              <div key={item.spaceId} className="w-[162px] h-[162px]">
                <SpaceCardMini
                  name={item.name}
                  roadAddress={item.address || '주소 미제공'}
                  thumbnailImageUrl={item.thumbnailImageUrl}
                  spaceId={item.spaceId}
                  isEditMode={isEditMode}
                  isSelected={selectedIds.has(item.spaceId)}
                  onSelect={handleSelectCard}
                  onDelete={handleIndividualDelete}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 w-full" />
        )}

        <button
          onClick={handleLoadMore}
          disabled={!hasNext || loading}
          className={clsx(
            'inline-flex justify-center items-center gap-[10px]',
            'pt-[8px] pb-[10px] px-[20px]',
            'mt-[8px] mb-[34px]',
            'rounded-[100px] border border-[#000] bg-white',
            'transition-opacity duration-200',
            {
              'opacity-30 cursor-not-allowed': !hasNext,
              'opacity-100 hover:opacity-70 cursor-pointer': hasNext,
              hidden: items.length === 0,
            }
          )}
        >
          <span className="text-black font-body text-[16px] font-normal leading-[100%] tracking-[-0.4px]">
            {loading ? 'loading...' : 'more'}
          </span>
        </button>
      </div>

      <div ref={footerRef} className="w-full">
        <Footer />
      </div>

      {items.length > 0 && (
        <img
          onClick={handleScrollTop}
          src={MoveupButton}
          alt="Moveup Button"
          className={clsx(
            'ml-[303px] z-50 cursor-pointer transition-all duration-200',
            isFooterInView ? 'absolute bottom-[172px]' : 'fixed bottom-[64.5px]'
          )}
        />
      )}
    </div>
  );
};

export default MyTeabagPage;
