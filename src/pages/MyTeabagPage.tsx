import { useState, useEffect, useRef, useMemo } from 'react';
// import SpaceCardMini from '../components/common/SpaceCardMini';
import SortButton from '../components/common/SortButton';
import EditButton from '../components/common/EditButton';
import MoveupButton from '../assets/RoundButton/moveup_btn.svg';
import Footer from '../components/common/Footer';
import clsx from 'clsx';

const TOTAL_DATA = Array.from({ length: 60 }).map((_, i) => ({
  id: i,
  name: `spacecard ${i + 1}`,
}));

const MyTeabagPage = () => {
  const [page, setPage] = useState(1);
  const [isFooterInView, setIsFooterInView] = useState(false);

  const footerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 20;

  const currentItems = useMemo(
    () => TOTAL_DATA.slice(0, page * itemsPerPage),
    [page]
  );

  const isAllLoaded = currentItems.length >= TOTAL_DATA.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterInView(entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    if (isAllLoaded) return;
    setPage((prev) => prev + 1);
  };

  return (
    <div className="w-full min-h-screen relative">
      <div className="flex flex-col items-center w-[335px] gap-6 mt-[55px] mx-auto">
        <div className="flex items-center self-stretch justify-between">
          <div className="text-black font-body text-[20px] font-semibold leading-[140%] tracking-[-0.5px] ">
            UMC 님의 티백
          </div>
          <div className="flex items-center gap-[4px] ">
            <SortButton />
            <EditButton />
          </div>
        </div>

        <div
          className="mx-auto inline-grid gap-y-6 gap-x-[11px] self-stretch
        grid-rows-[repeat(4,fit-content(100%))] grid-cols-[repeat(2,fit-content(100%))] "
        >
          {currentItems.map((item) => (
            <div key={item.id} className="w-[162px] h-[162px]">
              {/* 추후 마이티백 조회 API로 연동 필요 */}
              {/* <SpaceCardMini className="w-full h-full rounded-sm" /> */}
            </div>
          ))}
        </div>

        <button
          onClick={handleLoadMore}
          disabled={isAllLoaded}
          className={clsx(
            'inline-flex justify-center items-center gap-[10px]',
            'pt-[8px] pb-[10px] px-[20px]',
            'mt-[8px] mb-[34px]',
            'rounded-[100px] border border-[#000] bg-white',
            'transition-opacity duration-200',
            {
              'opacity-30 cursor-not-allowed': isAllLoaded,
              'opacity-100 hover:opacity-70 cursor-pointer': !isAllLoaded,
            }
          )}
        >
          <span className="text-black font-body text-[16px] font-normal leading-[100%] tracking-[-0.4px]">
            more
          </span>
        </button>
      </div>

      <div ref={footerRef} className="w-full">
        <Footer />
      </div>

      <img
        onClick={handleScrollTop}
        src={MoveupButton}
        alt="Moveup Button"
        className={clsx(
          'ml-[303px] z-50 cursor-pointer transition-all duration-200',
          isFooterInView ? 'absolute bottom-[172px]' : 'fixed bottom-[64.5px]'
        )}
      />
    </div>
  );
};

export default MyTeabagPage;
