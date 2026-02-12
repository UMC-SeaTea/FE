import closeButton from '../../assets/closeButton.svg';

type SearchListProps = {
  name: string;
  timeText?: string;
  onClick?: () => void;
  onRemove?: () => void;
};

const SearchList = ({ name, timeText, onClick, onRemove }: SearchListProps) => {
  return (
    <>
      <div className="w-[335px] h-[64px] bg-white border-b border-gray-500">
        <div className="flex items-center">
          <button
            type="button"
            className="flex items-center justify-between w-[301px] pl-[10px] py-[20px] cursor-pointer"
            onClick={onClick}
          >
            {/* 추후 API 연동 필요 */}
            <p className="text-black-2 font-body text-body-2">{name}</p>
            <p className="font-body text-gray-200 text-detail-2">{timeText}</p>
          </button>
          {/* 삭제 버튼 */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
          >
            <img
              src={closeButton}
              alt="Close"
              className="pl-[10px] w-[30px] h-[30px] cursor-pointer"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchList;
