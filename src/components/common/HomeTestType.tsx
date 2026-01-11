import Floral from '../../assets/images/tastingNoteTypeImages/floral.png';
import Nutty from '../../assets/images/tastingNoteTypeImages/nutty.png';
import Sweet from '../../assets/images/tastingNoteTypeImages/sweet.png';
import Spices from '../../assets/images/tastingNoteTypeImages/spices.png';
import Smoky from '../../assets/images/tastingNoteTypeImages/smoky.png';
import Fruity from '../../assets/images/tastingNoteTypeImages/fruity.png';
import Oceanic from '../../assets/images/tastingNoteTypeImages/oceanic.png';
import Earthy from '../../assets/images/tastingNoteTypeImages/earthy.png';
import moveButton from "../../assets/homeTestTypeMoveButton.svg";


const typeConfig: Record<string, { 
  img: string; 
  width: string; 
  rotate: string; 
  bottom: string; 
  right: string;
}> = {
  floral: { img: Floral, width: '600px', rotate: '20.61deg',bottom: '-580px', right: '-290px' },
  nutty: { img: Nutty, width: '450px', rotate: '0deg', bottom: '-70px', right: '-150px' },
  sweet: { img: Sweet, width: '350px', rotate: '0deg', bottom: '0px', right: '0px' },
  spices: { img: Spices, width: '600px', rotate: '0deg', bottom: '-280px', right: '-280px' },
  smoky: { img: Smoky, width: '413px', rotate: '45deg', bottom: '-200px', right: '-150px' },
  fruity: { img: Fruity, width: '1000px', rotate: '-30deg', bottom: '-255px', right: '-430px' },
  oceanic: { img: Oceanic, width: '210px', rotate: '0deg', bottom: '0px', right: '0px' },
  earthy: { img: Earthy, width: '730px', rotate: '-23deg', bottom: '-270px', right: '-300px' },
};

interface HomeTestTypeProps {
  type: string;       
  title: string;       
  description: string; 
}

const HomeTestType = ({ type, title, description}: HomeTestTypeProps) => {
  const typeKey = type.toLowerCase();
  const config = typeConfig[typeKey] || typeConfig['floral'];

  return (
    <div className="relative w-[375px] h-[446px] bg-white border-b border-black flex flex-col items-center pt-[50px] overflow-hidden shrink-0">
      <img 
        src={config.img} 
        alt={type} 
        className="absolute z-0 pointer-events-none opacity-90 max-w-none"
        style={{
          width: config.width,
          transform: `rotate(${config.rotate})`,
          bottom: config.bottom,
          right: config.right,
          height: 'auto', 
        }}
      />

      <div className="relative z-10 flex flex-col w-[334px] gap-[42px]">
        <div className="flex flex-col w-[334px] gap-[42px] items-start">
            <div className='flex justify-between items-start self-stretch'>
                <div className='flex flex-col w-[180.9px] items-start gap-0 ml-1'>
                    <p className='self-stretch text-body-5 font-body text-black leading-none'>나의 테이스팅 노트</p>
                    <p className='self-stretch text-title-1 font-title text-black leading-none'>{title}</p>
                </div>
                <div className="flex w-8 h-8 justify-center items-center mt-1">
                    <img src={moveButton} alt="moveButton" className="w-[10px] h-5"/>
                </div>
            </div>
        </div>

        <div className="flex w-[229px] flex-col items-start gap-3 ml-1">
          <div className="w-[70px] h-[0.4px] bg-black"></div>
          <p className="self-stretch text-black font-body text-[13px] font-extralight">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeTestType;