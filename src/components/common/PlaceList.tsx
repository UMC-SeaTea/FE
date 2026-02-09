import { useNavigate } from 'react-router-dom';

type PlaceListProps = {
  name: string;
  address: string;
  description: string;
  spaceId: number;
};

const PlaceList = ({ name, address, description, spaceId }: PlaceListProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex flex-col items-start justify-center py-5 px-6 w-[335px] h-[133px] 
      rounded-lg border border-gray-400 bg-white cursor-pointer"
        onClick={() => navigate(`/map/${spaceId}`)}
      >
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <p className="font-body text-body-3 text-black">{name}</p>
            <p className="font-body text-detail-4 text-gray-100">{address}</p>
          </div>
          <p className="font-body text-body-5 text-black-2 break-all">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default PlaceList;
