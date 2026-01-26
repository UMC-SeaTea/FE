import notice from '../../assets/images/notice.png';

const Notice = () => {
  return (
    <>
      <div className="w-[335px] h-[84px] rounded-md bg-white px-[16px] py-[18px]">
        <div className="flex gap-[12px] items-center justify-start">
          <img
            src={notice}
            alt="공지사항 아이콘"
            className="w-[48px] h-[48px]"
          />
          <div className="flex flex-col gap-[4px]">
            <p className="font-body text-detail-1 text-gray-200">공지사항</p>
            <p className="font-body text-body-2 text-black-2">
              버그 개선 및 UI 업데이트
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notice;
