import { useNavigate } from 'react-router-dom';

const PlaceList = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex flex-col items-start justify-center gap-3 py-5 px-6 w-[335px] min-h-[133px] 
      rounded-lg border border-[#DEDEDE] bg-white cursor-pointer"
        onClick={() => navigate('/map/1')}
      >
        <div className="flex flex-col items-start justify-end gap-1 self-stretch">
          <p className="font-body text-body-3 text-black">카페 우디</p>
          <p className="font-body text-detail-4 text-gray-100 self-stretch">
            서울 종로구 새문안로5길 19
          </p>
        </div>
        <p className="font-body text-body-5 text-black-2 self-stretch">
          혼자 머물기 편안한 분위기이면서도 공간 곳곳에 부드러운 감각 자극이
          자연스럽게 스며들어 있는 곳.
        </p>
      </div>
    </>
  );
};

export default PlaceList;
