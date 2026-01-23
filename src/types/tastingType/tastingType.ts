export const TASTING_KEYS = [
  'floral',
  'nutty',
  'sweet',
  'spices',
  'smoky',
  'fruity',
  'oceanic',
  'earthy',
] as const;

export type TastingKey = (typeof TASTING_KEYS)[number];

export type TastingType = {
  type: TastingKey;
  description: string;
  shortDescript: string;
};

export const tastingTypeMap: Record<TastingKey, Omit<TastingType, 'type'>> = {
  floral: {
    description:
      '시각이나 후각 등 감각을 만족시키는 아름다운 것을 보며 영감을 얻어요',
    shortDescript: '감각적인 아름다운 공간',
  },
  smoky: {
    description:
      '고요하고 차분한 분위기에서 방해받지 않고, 온전히 혼자만의 시간을 즐겨요',
    shortDescript: '혼자만의 시간',
  },
  sweet: {
    description:
      '소소한 디저트나 쇼핑 등 자신에게 작은 보상을 주며 스트레스를 풀어요',
    shortDescript: '소소한 쇼핑과 디저트',
  },
  fruity: {
    description:
      '가벼운 활동이나 즐거운 대화처럼 긍정적이고 생생한 에너지를 나누며 재충전해요',
    shortDescript: '즐겁고 활동적인 공간',
  },
  spices: {
    description:
      '새로운 것을 배우거나 경험하는 등 지적인 자극을 통해 활력을 되찾아요',
    shortDescript: '새운 경험과 배움',
  },
  nutty: {
    description:
      '편안하고 아늑한 공간에서 책을 읽거나 사색하며 지적인 만족감을 얻어요',
    shortDescript: '편안 아늑한 공간',
  },
  oceanic: {
    description:
      '강이나 공원 등 시원한 바람을 느낄 수 있는 탁 트인 공간에서 답답함을 풀어요',
    shortDescript: '탁 트인 시원한 공간',
  },
  earthy: {
    description:
      '자연 친화적인 공간에서 신선하고 건강한 음식을 먹으며 몸과 마음을 채워요',
    shortDescript: '몸과 마음의 건강',
  },
};
