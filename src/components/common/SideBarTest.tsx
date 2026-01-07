import teatImg from '../../assets/tea.svg';

const SideBarTest = () => {
  return (
    <>
      <div className="w-[335px] pt-[16px] pb-[12px] px-[12px] bg-[#efe9ff] rounded-md">
        <div className="flex flex-col gap-[8px]">
          <div className="w-[296px] h-[60px] flex items-center gap-[24px] px-[8px] w-full">
            <div className="flex flex-col gap-[4px]">
              <p className="font-body text-body-1 text-black">
                마음의 상태가 바뀌었나요?
              </p>
              <p className="font-body text-detail-4 text-gray-100">
                가장 마지막으로 진단받은 날짜는 7일 전이에요
              </p>
            </div>
            <img src={teatImg} alt="Tea" className="w-[60px] h-[60px]" />
          </div>
          <div>버튼</div>
        </div>
      </div>
    </>
  );
};

export default SideBarTest;
