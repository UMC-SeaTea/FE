
import bgFloral from '../assets/images/pastResultBgImages/bgFloral.jpg';
import bgNutty from '../assets/images/pastResultBgImages/bgNutty.jpg';
import bgSweet from '../assets/images/pastResultBgImages/bgSweet.jpg';
import bgSpices from '../assets/images/pastResultBgImages/bgSpices.jpg';
import bgSmoky from '../assets/images/pastResultBgImages/bgSmoky.jpg';
import bgFruity from '../assets/images/pastResultBgImages/bgFruity.jpg';
import bgOceanic from '../assets/images/pastResultBgImages/bgOceanic.jpg';
import bgEarthy from '../assets/images/pastResultBgImages/bgEarthy.jpg';

const bgImageMap: Record<string, string> = {
  Floral: bgFloral,
  Nutty: bgNutty,
  Sweet: bgSweet,
  Spices: bgSpices,
  Smoky: bgSmoky,
  Fruity: bgFruity,
  Oceanic: bgOceanic,
  Earthy: bgEarthy,
};

interface PastResultProps {
  type: string; 
  date: string;  
}

const PastResult = ({ type, date }: PastResultProps) => {
  const bgImage = bgImageMap[type] || bgFloral;

  return (
    <div 
      className="flex w-[335px] h-[91px] px-[19px] py-[31px] flex-col justify-center items-start gap-2.5"
      style={{
        backgroundImage: `
          linear-gradient(270deg, #000 16.87%, rgba(0, 0, 0, 0.00) 52.54%), 
          linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), 
          url(${bgImage})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
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