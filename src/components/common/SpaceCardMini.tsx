import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

type SpaceCardMiniProps = {
  className?: string;
  name: string;
  roadAddress: string;
  thumbnailImageUrl: string;
  spaceId: number;
};

const SpaceCardMini = ({
  className,
  name,
  roadAddress,
  thumbnailImageUrl,
  spaceId,
}: SpaceCardMiniProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={clsx(
          'relative overflow-hidden cursor-pointer w-[120px] h-[120px]',
          className
        )}
        onClick={() => navigate(`/map/${spaceId}`)}
      >
        <img
          src={thumbnailImageUrl}
          alt="Example Space"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* 그라데이션 */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_55.8%,#000_92.93%)]" />
        <div className="absolute bottom-0 left-0 flex flex-col w-full px-[10px] pb-[11px] text-white">
          <p className="font-body text-body-4">{name}</p>
          <p className="font-body text-detail-4">{roadAddress}</p>
        </div>
      </div>
    </>
  );
};

export default SpaceCardMini;
