import FloralImg from '../../assets/images/tastingNoteTypeImages/floral.png';
import NuttyImg from '../../assets/images/tastingNoteTypeImages/nutty.png';
import SweetImg from '../../assets/images/tastingNoteTypeImages/sweet.png';
import SpicesImg from '../../assets/images/tastingNoteTypeImages/spices.png';
import SmokyImg from '../../assets/images/tastingNoteTypeImages/smoky.png';
import FruityImg from '../../assets/images/tastingNoteTypeImages/fruity.png';
import OceanicImg from '../../assets/images/tastingNoteTypeImages/oceanic.png';
import EarthyImg from '../../assets/images/tastingNoteTypeImages/earthy.png';
import type { TastingImg } from '../../types/tastingType/tastingImg';
import type { TastingKey } from '../../types/tastingType/tastingType';

export const typeConfig: Record<TastingKey, TastingImg> = {
  floral: {
    img: FloralImg,
    width: '580px',
    rotate: '20.61deg',
    bottom: '-580px',
    right: '-290px',
  },
  nutty: {
    img: NuttyImg,
    width: '380px',
    rotate: '0deg',
    bottom: '-100px',
    right: '-150px',
  },
  sweet: {
    img: SweetImg,
    width: '290px',
    rotate: '0deg',
    bottom: '-10px',
    right: '0px',
  },
  spices: {
    img: SpicesImg,
    width: '550px',
    rotate: '0deg',
    bottom: '-280px',
    right: '-280px',
  },
  smoky: {
    img: SmokyImg,
    width: '413px',
    rotate: '50deg',
    bottom: '-230px',
    right: '-140px',
  },
  fruity: {
    img: FruityImg,
    width: '350px',
    rotate: '0deg',
    bottom: '-0px',
    right: '0px',
  },
  oceanic: {
    img: OceanicImg,
    width: '150px',
    rotate: '0deg',
    bottom: '0px',
    right: '0px',
  },
  earthy: {
    img: EarthyImg,
    width: '650px',
    rotate: '-23deg',
    bottom: '-270px',
    right: '-300px',
  },
};
