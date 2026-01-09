import closeButton from '../../assets/closeButton.svg';

const SearchList = () => {
  return (
    <>
      <div className="w-[335px] h-[64px] bg-white">
        <div className="flex items-center">
          <div className="flex items-center justify-between w-[301px] pl-[10px] py-[20px]">
            {/* 추후 API 연동 필요 */}
            <p className="text-black-2 font-body text-body-2">국립현대미술관</p>
            <p className="font-body text-gray-200 text-detail-2">1시간전</p>
          </div>
          <img
            src={closeButton}
            alt="Close"
            className="pl-[10px] w-[30px] h-[30px] cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default SearchList;
