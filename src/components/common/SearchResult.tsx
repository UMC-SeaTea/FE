import { useNavigate } from 'react-router-dom';
import NoteSearch from './NoteSearch';

const SearchResult = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="w-[335px] h-[124px] bg-white border-1 border-gray-400 rounded-lg 
      px-[20px] pt-[20px] pb-[24px] cursor-pointer"
        onClick={() => navigate('/map/1')}
      >
        <div className="flex flex-col gap-[12px]">
          <NoteSearch text="Floral" />
          <div className="flex flex-col gap-[4px]">
            <p className="font-body text-body-2 text-[#222222]">
              국립현대미술관 서울
            </p>
            <div className="flex items-center gap-[4px]">
              <p className="font-body text-body-4 text-gray-100">내 위치에서</p>
              <p className="font-body text-body-4 text-[#2f16ff]">1.2km</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
