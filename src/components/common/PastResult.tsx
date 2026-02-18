import bgFloral from '../../assets/images/pastResultBgImages/bgFloral.png';
import bgNutty from '../../assets/images/pastResultBgImages/bgNutty.png';
import bgSweet from '../../assets/images/pastResultBgImages/bgSweet.png';
import bgSpices from '../../assets/images/pastResultBgImages/bgSpices.png';
import bgSmoky from '../../assets/images/pastResultBgImages/bgSmoky.png';
import bgFruity from '../../assets/images/pastResultBgImages/bgFruity.png';
import bgOceanic from '../../assets/images/pastResultBgImages/bgOceanic.jpg';
import bgEarthy from '../../assets/images/pastResultBgImages/bgEarthy.png';

interface BgConfig {
  src: string;
  position: string;
}

const bgConfigMap: Record<string, BgConfig> = {
  floral: {
    src: bgFloral,
    position: 'center 85%',
  },
  nutty: {
    src: bgNutty,
    position: 'center 78%',
  },
  sweet: {
    src: bgSweet,
    position: 'center 95%',
  },
  spices: {
    src: bgSpices,
    position: 'center 97%',
  },
  smoky: {
    src: bgSmoky,
    position: 'center 73%',
  },
  fruity: {
    src: bgFruity,
    position: 'center 85%',
  },
  oceanic: {
    src: bgOceanic,
    position: 'center 56%',
  },
  earthy: {
    src: bgEarthy,
    position: 'center 60%',
  },
};

const defaultConfig: BgConfig = {
  src: bgFloral,
  position: 'center center',
};

interface PastResultProps {
  type: string;
  date: string;
}

const PastResult = ({ type, date }: PastResultProps) => {
  const config = bgConfigMap[type] || defaultConfig;

  return (
    <div
      className="flex w-[335px] h-[91px] px-[19px] py-[31px] flex-col justify-center items-start gap-2.5"
      style={{
        backgroundImage: `
          linear-gradient(270deg, #000 16.87%, rgba(0, 0, 0, 0.00) 52.54%), 
          linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), 
          url(${config.src})
        `,
        backgroundSize: 'cover',
        backgroundPosition: config.position,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex w-[290px] justify-between items-center">
        <div className="flex h-7 px-3 py-1 justify-center items-center gap-2.5 border border-white bg-black/40 ">
          <span className="font-body text-[16px] font-normal text-white">
            {type}
          </span>
        </div>
        <span className="font-body text-base font-light text-gray-200">
          {date}
        </span>
      </div>
    </div>
  );
};

export default PastResult;
