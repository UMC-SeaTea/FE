import Floral from '../../assets/images/tastingNoteTypeImages/floral.png';
import Nutty from '../../assets/images/tastingNoteTypeImages/nutty.png';
import Sweet from '../../assets/images/tastingNoteTypeImages/sweet.png';
import Spices from '../../assets/images/tastingNoteTypeImages/spices.png';
import Smoky from '../../assets/images/tastingNoteTypeImages/smoky.png';
import Fruity from '../../assets/images/tastingNoteTypeImages/fruity.png';
import Oceanic from '../../assets/images/tastingNoteTypeImages/oceanic.png';
import Earthy from '../../assets/images/tastingNoteTypeImages/earthy.png';
import { type TastingKey } from '../../types/tastingType/tastingType';
import { tastingTypeMap } from '../../constants/tastingType/tastingType';

const typeConfig: Record<
  string,
  {
    img: string;
    width: string;
    rotate: string;
    top: string;
    right: string;
  }
> = {
  floral: {
    img: Floral,
    width: '500px',
    rotate: '20.61deg',
    top: '-80px',
    right: '-245px',
  },
  nutty: {
    img: Nutty,
    width: '280px',
    rotate: '0deg',
    top: '0px',
    right: '-100px',
  },
  sweet: {
    img: Sweet,
    width: '230px',
    rotate: '0deg',
    top: '-120px',
    right: '0px',
  },
  spices: {
    img: Spices,
    width: '380px',
    rotate: '0deg',
    top: '-50px',
    right: '-170px',
  },
  smoky: {
    img: Smoky,
    width: '230px',
    rotate: '50deg',
    top: '0px',
    right: '-50px',
  },
  fruity: {
    img: Fruity,
    width: '800px',
    rotate: '-30deg',
    top: '-150px',
    right: '-350px',
  },
  oceanic: {
    img: Oceanic,
    width: '120px',
    rotate: '0deg',
    top: '30px',
    right: '0px',
  },
  earthy: {
    img: Earthy,
    width: '600px',
    rotate: '-20deg',
    top: '-70px',
    right: '-255px',
  },
};

interface SpaceRecommendationProps {
  type: TastingKey;
}

const SpaceRecommendation = ({ type }: SpaceRecommendationProps) => {
  const config = typeConfig[type];
  const info = tastingTypeMap[type];
  const shortDescript = info.shortDescript;

  return (
    <div className="relative w-[375px] h-[147px] bg-white overflow-hidden">
      <div className="relative z-10 flex flex-col justify-center h-full pl-8 pb-4.5">
        <p className="self-stretch text-title-1 font-title text-footer">
          {type}.
        </p>
        <p className="self-stretch text-body-4 font-body text-footer">
          {shortDescript}
        </p>
      </div>
      <img
        src={config.img}
        alt={type}
        className="absolute opacity-90 max-w-none"
        style={{
          width: config.width,
          transform: `rotate(${config.rotate})`,
          top: config.top,
          right: config.right,
          height: 'auto',
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default SpaceRecommendation;
