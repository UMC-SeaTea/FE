import { useNavigate } from 'react-router-dom';
import checkIcon from '../../assets/checkIcon.svg';
import moveButton from '../../assets/placeTestMoveButton.svg';

type PlaceTestCardProps = {
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  title: string;
  durationText: string;
  navigateTo?: string;
};

const PlaceTestCard = ({
  badgeText,
  badgeBg,
  badgeTextColor,
  title,
  durationText,
  navigateTo,
}: PlaceTestCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex w-[335px] py-5 pl-4 pr-[10px] bg-white rounded-md
      shadow-[0_0_4px_0_rgba(0,0,0,0.06),0_0_16px_0_rgba(94,94,94,0.04)] gap-[158px] items-center"
    >
      <div className="w-[119px] flex flex-col items-start gap-2">
        {/* 뱃지 */}
        <div
          className={`h-[22px] flex p-1 items-center justify-center rounded-[2px] ${badgeBg}`}
        >
          <p
            className={`font-body text-detail-3 whitespace-nowrap leading-[1.2] ${badgeTextColor}`}
          >
            {badgeText}
          </p>
        </div>

        {/* 상세/간단 진단 */}
        <p className="self-stretch font-body text-body-1 text-black whitespace-nowrap">
          {title}
        </p>

        {/* 소요 시간 */}
        <div className="flex items-center gap-0.5">
          <img src={checkIcon} alt="check icon" className="w-4 h-4" />
          <p className="font-body text-detail-4 text-black-2">{durationText}</p>
        </div>
      </div>

      {/* 이동 버튼 */}
      <button
        className="cursor-pointer"
        onClick={() => navigate(navigateTo ?? '')}
      >
        <img src={moveButton} alt="moveButton" className="w-8 h-8" />
      </button>
    </div>
  );
};

export default PlaceTestCard;
