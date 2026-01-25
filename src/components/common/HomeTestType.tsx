import moveButton from '../../assets/homeTestTypeMoveButton.svg';
import { useNavigate } from 'react-router-dom';
import { type TastingKey } from '../../types/tastingType/tastingType';
import { typeConfig } from '../../constants/tastingType/tastingImg';
import { tastingTypeMap } from '../../constants/tastingType/tastingType';

type Variant = 'home' | 'recommend';

interface HomeTestTypeProps {
  type: TastingKey;
  variant?: Variant;
}

// variant에 따른 스타일
const variantStyle: Record<Variant, { wrapper: string; content: string }> = {
  home: {
    wrapper: 'h-[446px] pt-[80px]',
    content: 'gap-[42px]',
  },
  recommend: {
    wrapper: 'h-[222px] pt-[44px]',
    content: 'gap-[36px]',
  },
};

const HomeTestType = ({ type, variant = 'home' }: HomeTestTypeProps) => {
  const navigate = useNavigate();
  // 이미지
  const config = typeConfig[type];
  // 설명
  const info = tastingTypeMap[type];
  const description = info.description;

  const v = variantStyle[variant];

  return (
    <div
      className={`relative w-[375px] ${v.wrapper} bg-white border-b border-black flex flex-col items-center overflow-hidden shrink-0`}
    >
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

      <div className={`relative z-10 flex flex-col w-[334px] ${v.content}`}>
        <div className="flex flex-col w-[334px] gap-[42px] items-start">
          <div className="flex justify-between items-start self-stretch">
            <div className="flex flex-col w-[180.9px] items-start gap-0 ml-1">
              {/* 나의 테이스팅 노트 텍스트 */}
              {variant === 'home' && (
                <p className="self-stretch text-body-5 font-body text-black leading-none">
                  나의 테이스팅 노트
                </p>
              )}
              <p className="self-stretch text-title-1 font-title text-black leading-none">
                {type}.
              </p>
            </div>
            {/* moveButton */}
            {variant === 'home' && (
              <div
                className="flex w-8 h-8 justify-center items-center mt-1 cursor-pointer"
                onClick={() => navigate('/diagnosis/result')}
              >
                <img
                  src={moveButton}
                  alt="moveButton"
                  className="w-[10px] h-5"
                />
              </div>
            )}
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
