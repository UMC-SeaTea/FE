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
  copyPhrase: string;
};

export const tastingTypeMap: Record<TastingKey, Omit<TastingType, 'type'>> = {
  floral: {
    description:
      '시각이나 후각 등 감각을 만족시키는 아름다운 것을 보며 영감을 얻어요',
    shortDescript: '감각적인 아름다운 공간',
    copyPhrase:
      '혼자 있는 시간을 싫어하지 않지만, 완전히 고요한 상태보다는 새로운 분위기나 감각적인 자극이 있을 때 더 잘 쉬는 타입입니다.\n에너지가 많지 않아도, 시각·후각·청각 같은 감각을 통해 부드럽게 기분을 환기하고 싶어 하는 상태입니다.',
  },
  smoky: {
    description:
      '고요하고 차분한 분위기에서 방해받지 않고, 온전히 혼자만의 시간을 즐겨요',
    shortDescript: '혼자만의 시간',
    copyPhrase:
      '외부의 소음을 차단하고 오직 스스로에게만 온전히 집중할 수 있는 고립이 필요한 타입입니다.\n누구의 방해도 없는 고요한 공간에서 마음속에 쌓인 복잡한 노이즈를 깨끗하게 비워내고 싶어 하는 상태입니다.',
  },
  sweet: {
    description:
      '소소한 디저트나 쇼핑 등 자신에게 작은 보상을 주며 스트레스를 풀어요',
    shortDescript: '소소한 쇼핑과 디저트',
    copyPhrase:
      '일상의 피로를 즉각적으로 씻어내 줄 확실하고 선명한 보상이 필요한 타입입니다.\n감각을 깨우는 달콤한 디저트나 기분 좋아지는 공간에서의 소비를 통해 지친 스스로에게 가장 쉽고도 확실한 즐거움을 선물하고 싶어 하는 상태입니다.',
  },
  fruity: {
    description:
      '가벼운 활동이나 즐거운 대화처럼 긍정적이고 생생한 에너지를 나누며 재충전해요',
    shortDescript: '즐겁고 활동적인 공간',
    copyPhrase:
      '생기 넘치는 분위기와 만남 속에서 활력을 빠르게 되찾는 타입입니다.\n혼자만의 고립보다는 사람들과 가볍게 교류하거나 활발하게 움직이는 과정을 통해 가라앉은 에너지를 생동감 있게 환기하고 싶어 하는 상태입니다.',
  },
  spices: {
    description:
      '새로운 것을 배우거나 경험하는 등 지적인 자극을 통해 활력을 되찾아요',
    shortDescript: '새운 경험과 배움',
    copyPhrase:
      '정적인 쉼보다는 낯설고 신선한 자극을 경험할 때 오히려 에너지가 충전되는 타입입니다.\n반복되는 일상을 벗어나 새로운 정보나 활동을 탐색하고 시도하며, 뇌의 회로를 새롭게 깨우는 순간을 통해 진정한 휴식을 얻는 상태입니다.',
  },
  nutty: {
    description:
      '편안하고 아늑한 공간에서 책을 읽거나 사색하며 지적인 만족감을 얻어요',
    shortDescript: '편안 아늑한 공간',
    copyPhrase:
      '복잡한 생각은 잠시 멈추고, 익숙하고 차분한 공간에 머물 때 가장 빠르게 회복하는 타입입니다.\n적당한 거리감의 소음 속에서 사색을 즐기거나 취향이 담긴 활동에 몰입하며, 흩어진 마음을 한곳으로 차분히 모으고 싶어 하는 상태입니다.',
  },
  oceanic: {
    description:
      '강이나 공원 등 시원한 바람을 느낄 수 있는 탁 트인 공간에서 답답함을 풀어요',
    shortDescript: '탁 트인 시원한 공간',
    copyPhrase:
      '좁아진 시야를 넓혀줄 탁 트인 풍경과 자유로운 해방감이 절실한 타입입니다.\n반복되는 동선을 벗어나 시원한 바람이 부는 물가나 넓은 산책로에 머물며, 머릿속의 복잡한 고민들을 바람에 실어 보내고 싶어 하는 상태입니다.',
  },
  earthy: {
    description:
      '자연 친화적인 공간에서 신선하고 건강한 음식을 먹으며 몸과 마음을 채워요',
    shortDescript: '몸과 마음의 건강',
    copyPhrase:
      '몸과 마음의 균형이 동시에 중요한 타입입니다.\n인위적인 자극을 걷어내고 건강한 음식, 햇빛, 초록 식물처럼 본질에 가까운 요소들을 곁에 두며 무너진 일상의 균형을 가장 편안한 방식으로 되찾고 싶은 상태입니다.',
  },
};
