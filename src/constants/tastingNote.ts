import Floral from "../assets/images/tastingNoteTypeImages/floral.png";
import Nutty from "../assets/images/tastingNoteTypeImages/nutty.png";
import Sweet from "../assets/images/tastingNoteTypeImages/sweet.png";
import Spices from "../assets/images/tastingNoteTypeImages/spices.png";
import Smoky from "../assets/images/tastingNoteTypeImages/smoky.png";
import Fruity from "../assets/images/tastingNoteTypeImages/fruity.png";
import Oceanic from "../assets/images/tastingNoteTypeImages/oceanic.png";
import Earthy from "../assets/images/tastingNoteTypeImages/earthy.png";

export type ResultType =
  | "floral"
  | "nutty"
  | "sweet"
  | "spices"
  | "smoky"
  | "fruity"
  | "oceanic"
  | "earthy";

export type ResultConfig = {
  title: string;
  subtitle: string;
  desc: string;


  image: string;
  imageStyle: {
    width: string;
    rotate: string;
    bottom: string;
    right: string;
  };
};

export const RESULT_CONFIG: Record<ResultType, ResultConfig> = {
  floral: {
    title: "floral.",
    subtitle: "감각적인 아름다운 공간",
    desc: "시각이나 후각 등 감각을 만족시키는 아름다운 것을 보며 영감을 얻어요",
    image: Floral,
    imageStyle: {
      width: "600px",
      rotate: "20.61deg",
      bottom: "-580px",
      right: "-290px",
    },
  },

  nutty: {
    title: "nutty.",
    subtitle: "포근하고 차분한 공간",
    desc: "고소하고 따뜻한 분위기에서 안정감을 느껴요",
    image: Nutty,
    imageStyle: {
      width: "450px",
      rotate: "0deg",
      bottom: "-70px",
      right: "-150px",
    },
  },

  sweet: {
    title: "sweet.",
    subtitle: "달콤하고 부드러운 공간",
    desc: "편안하고 다정한 분위기에서 에너지를 채워요",
    image: Sweet,
    imageStyle: {
      width: "350px",
      rotate: "0deg",
      bottom: "0px",
      right: "0px",
    },
  },

  spices: {
    title: "spices.",
    subtitle: "새로운 자극의 공간",
    desc: "낯선 분위기에서 새로운 감각을 발견해요",
    image: Spices,
    imageStyle: {
      width: "600px",
      rotate: "0deg",
      bottom: "-280px",
      right: "-280px",
    },
  },

  smoky: {
    title: "smoky.",
    subtitle: "깊고 진한 무드의 공간",
    desc: "차분하고 깊은 분위기에서 집중이 잘 돼요",
    image: Smoky,
    imageStyle: {
      width: "413px",
      rotate: "45deg",
      bottom: "-200px",
      right: "-150px",
    },
  },

  fruity: {
    title: "fruity.",
    subtitle: "상큼하고 경쾌한 공간",
    desc: "가볍고 경쾌한 에너지에서 기분이 전환돼요",
    image: Fruity,
    imageStyle: {
      width: "1000px",
      rotate: "-30deg",
      bottom: "-255px",
      right: "-430px",
    },
  },

  oceanic: {
    title: "oceanic.",
    subtitle: "시원하고 탁 트인 공간",
    desc: "넓고 시원한 분위기에서 마음이 정리돼요",
    image: Oceanic,
    imageStyle: {
      width: "210px",
      rotate: "0deg",
      bottom: "0px",
      right: "0px",
    },
  },

  earthy: {
    title: "earthy.",
    subtitle: "자연과 가까운 공간",
    desc: "자연스러운 질감과 색감에서 편안함을 느껴요",
    image: Earthy,
    imageStyle: {
      width: "730px",
      rotate: "-23deg",
      bottom: "-270px",
      right: "-300px",
    },
  },
};
