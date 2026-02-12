export interface TypeData {
  code: string;
  name: string;
  emoji: string;
  shortDesc: string;
  longDesc: string;
  strengths: string[];
  weaknesses: string[];
  compatibility: {
    best: string[];
    caution: string[];
  };
  recommendedMenu: string;
  quote: string;
}

export const TYPE_DATA: Record<string, TypeData> = {
  ESFP: {
    code: 'ESFP',
    name: '감튀폭죽',
    emoji: '🎆',
    shortDesc: '분위기 폭발, 감자도 축제다',
    longDesc: '감자튀김이 나오면 파티가 시작된다!\n분위기를 한 순간에 띄우는 당신은\n어디서든 감자 파티의 중심!\n함께라면 어떤 감자도 맛있어집니다.',
    strengths: [
      '🎉 어디서든 분위기를 띄우는 에너지',
      '🤝 모두와 감자를 나눌 줄 아는 마음',
      '⚡ 즉석에서 최고의 조합을 찾는 능력',
    ],
    weaknesses: [
      '😵 먹다가 흥 올라서 감자 엎을 수 있음',
      '📱 먹방 찍다가 감자 식힘',
      '🛒 충동적으로 사이드 메뉴 추가',
    ],
    compatibility: {
      best: ['ISFJ', 'ISTJ'],
      caution: ['INTJ', 'INTP'],
    },
    recommendedMenu: '치즈 로드 프라이 🧀🍟',
    quote: '감자가 있는 곳에 축제가 있다!',
  },
  ESFJ: {
    code: 'ESFJ',
    name: '감자어머니',
    emoji: '🤱',
    shortDesc: '다 먹었어? 더 시킬까?',
    longDesc: '모두가 배부르게 먹었는지 체크하는 당신!\n감자를 나누는 것이 곧 사랑이라 믿는\n감자계의 따뜻한 보호자.\n당신 옆에선 배고플 수가 없습니다.',
    strengths: [
      '💖 모두의 입맛을 기억하는 섬세함',
      '🍽️ 부족하면 바로 추가 주문하는 센스',
      '🤗 먹으면서 분위기까지 챙기는 멀티플레이어',
    ],
    weaknesses: [
      '😰 다 먹었는지 확인하느라 본인은 못 먹음',
      '💸 남 먹이느라 과소비 위험',
      '😤 음식 남기면 마음이 아픔',
    ],
    compatibility: {
      best: ['ISFP', 'ISTP'],
      caution: ['INTP', 'ENTP'],
    },
    recommendedMenu: '패밀리 사이즈 감자튀김 🍟🍟',
    quote: '잘 먹는 친구가 가장 좋은 친구다',
  },
  ENFP: {
    code: 'ENFP',
    name: '감튀탐험가',
    emoji: '🧭',
    shortDesc: '새 소스 발견하면 눈 빛남',
    longDesc: '감자튀김도 인생도 모험이다!\n늘 새로운 맛을 찾아 헤매는 당신은\n친구들의 메뉴 선택도 책임지는\n감자계의 트렌드세터입니다.',
    strengths: [
      '🌟 어떤 감자도 맛있게 먹는 긍정력',
      '💡 새로운 조합을 발견하는 창의력',
      '🎉 함께 먹으면 더 맛있게 만드는 분위기 메이커',
    ],
    weaknesses: [
      '😅 늘 먹던 거 시키면 아쉬워함',
      '🤔 결정장애로 주문에 5분 소요',
      '📸 사진 찍다 감자 식을 때도 있음',
    ],
    compatibility: {
      best: ['ISFJ', 'INFJ'],
      caution: ['ISTJ', 'ESTJ'],
    },
    recommendedMenu: '트러플 감자튀김 🍟✨',
    quote: '인생은 짧고 감자튀김은 다양하다',
  },
  ENFJ: {
    code: 'ENFJ',
    name: '감자단장',
    emoji: '👑',
    shortDesc: '모두의 감자를 챙기는 리더',
    longDesc: '감자를 먹어도 리더십이 빛나는 당신!\n주문부터 소스 배분까지\n팀의 만족도를 이끄는\n타고난 감자 리더입니다.',
    strengths: [
      '👑 자연스럽게 주문을 리드하는 카리스마',
      '🎯 모두의 취향을 맞추는 조율 능력',
      '💪 감자 모임을 성공적으로 이끄는 힘',
    ],
    weaknesses: [
      '😩 모두를 만족시키려다 지침',
      '🙅 본인 먹고 싶은 거 양보하는 경향',
      '📢 가끔 감자에 대해 너무 열정적',
    ],
    compatibility: {
      best: ['ISFP', 'INFP'],
      caution: ['ISTP', 'ESTP'],
    },
    recommendedMenu: '감자 플래터 (다같이!) 🍽️',
    quote: '함께 먹는 감자가 가장 맛있다',
  },
  ESTP: {
    code: 'ESTP',
    name: '감자헌터',
    emoji: '🎯',
    shortDesc: '제일 큰 감자를 선점한다',
    longDesc: '눈 깜짝할 사이에 큰 감자를 집는 당신!\n순발력과 실행력으로\n감자 먹기에서도 누구보다 빠른\n감자계의 사냥꾼입니다.',
    strengths: [
      '⚡ 가장 바삭한 감자를 귀신같이 찾는 능력',
      '🏃 줄서기부터 주문까지 초고속 실행력',
      '🎯 효율적인 소스 찍기 기술',
    ],
    weaknesses: [
      '😤 감자 뺏기면 진심으로 아쉬움',
      '🏃 먹는 속도가 너무 빨라 맛을 놓칠 때',
      '💥 "내가 시킨다" 하고 즉흥 과소비',
    ],
    compatibility: {
      best: ['ISFJ', 'ISTJ'],
      caution: ['INFJ', 'INFP'],
    },
    recommendedMenu: '매운 양념 감자 🌶️🥔',
    quote: '고민은 줄이고 감자는 늘려라',
  },
  ESTJ: {
    code: 'ESTJ',
    name: '감자총감독',
    emoji: '📋',
    shortDesc: '주문부터 자리까지 완벽 통제',
    longDesc: '감자 먹는 것에도 시스템이 필요하다!\n주문 효율화부터 좌석 배치까지\n완벽하게 관리하는\n감자계의 총감독입니다.',
    strengths: [
      '📊 메뉴 비교분석 후 최적의 선택',
      '⏰ 정확한 시간 관리로 바삭한 타이밍 확보',
      '📋 주문-수령-배분을 체계적으로 관리',
    ],
    weaknesses: [
      '😠 주문 틀어지면 심하게 스트레스',
      '🙄 "내가 하는 게 낫겠다" 하고 다 맡음',
      '📏 감자 크기가 다르면 거슬림',
    ],
    compatibility: {
      best: ['ISTP', 'ISFP'],
      caution: ['INFP', 'ENFP'],
    },
    recommendedMenu: '맥도날드 라지 프라이 (정량 보장) 📏🍟',
    quote: '체계적으로 먹어야 맛있게 먹는다',
  },
  ENTP: {
    code: 'ENTP',
    name: '감튀박사',
    emoji: '🔬',
    shortDesc: '감자 굵기와 온도를 논한다',
    longDesc: '감자튀김에도 과학이 있다!\n최적의 온도, 두께, 소금 비율을\n논하는 당신은\n감자계의 호기심 천국입니다.',
    strengths: [
      '🧪 감자 굵기별 식감 차이를 분석하는 지적 호기심',
      '💬 감자로 2시간 토론 가능한 화술',
      '🔍 새로운 맛 조합을 실험하는 도전정신',
    ],
    weaknesses: [
      '🤓 "이 기름 온도가..." 하다가 다 식힘',
      '🗣️ 감자 토론에 빠져 먹는 걸 잊음',
      '😏 남의 주문에 한마디 하는 습관',
    ],
    compatibility: {
      best: ['INFJ', 'INTJ'],
      caution: ['ISFJ', 'ESFJ'],
    },
    recommendedMenu: '수제 감자튀김 (제조과정 관찰 가능) 👨‍🍳',
    quote: '감자에 대한 호기심은 끝이 없다',
  },
  ENTJ: {
    code: 'ENTJ',
    name: '감자대왕',
    emoji: '🏰',
    shortDesc: '감자산 정복은 나의 사명',
    longDesc: '감자 앞에서도 CEO 기질 발동!\n"최대 효율로 먹어야 한다"며\n먹는 전략까지 세우는\n감자계의 정복자입니다.',
    strengths: [
      '🏆 어떤 감자 도전이든 완수하는 추진력',
      '📈 가성비 최고의 메뉴를 찾는 전략적 사고',
      '👥 팀원들의 감자 만족도를 높이는 리더십',
    ],
    weaknesses: [
      '😤 주문 과정이 비효율적이면 짜증',
      '🏃 감자 먹는 것도 경쟁으로 만듦',
      '📊 "이 가격 대비 양이..." 분석 시작',
    ],
    compatibility: {
      best: ['INTP', 'INFP'],
      caution: ['ISFP', 'ESFP'],
    },
    recommendedMenu: '감자 풀코스 세트 (효율 최대) 🏰🍟',
    quote: '감자 앞에 불가능은 없다',
  },
  ISFP: {
    code: 'ISFP',
    name: '소금요정',
    emoji: '🧚',
    shortDesc: '조용히, 하지만 깊게 즐긴다',
    longDesc: '감자에 소금 뿌리듯 섬세하게!\n조용하지만 감자의 맛을 누구보다\n깊이 음미하는\n감자계의 조용한 미식가입니다.',
    strengths: [
      '🎨 감자 플레이팅에 대한 심미안',
      '✨ 최적의 소금 양을 감각적으로 아는 능력',
      '🧘 한 입 한 입 온전히 즐기는 마음가짐',
    ],
    weaknesses: [
      '😶 먹고 싶은 거 있는데 말 못 함',
      '🐌 먹는 속도가 느려서 차가운 감자 먹을 때',
      '😢 분위기 안 맞으면 맛이 반감됨',
    ],
    compatibility: {
      best: ['ESFJ', 'ENFJ'],
      caution: ['ENTJ', 'ESTJ'],
    },
    recommendedMenu: '허니버터 감자 🍯🥔',
    quote: '조용히 먹는 감자가 가장 깊은 맛이다',
  },
  ISFJ: {
    code: 'ISFJ',
    name: '감자수호자',
    emoji: '🛡️',
    shortDesc: '마지막 한 개까지 소중히',
    longDesc: '감자 한 알도 허투루 먹지 않는 당신!\n소중한 사람들과의 감자 시간을\n따뜻하게 지키는\n감자계의 든든한 수호자입니다.',
    strengths: [
      '🛡️ 친구 몫까지 챙기는 세심한 배려',
      '🧹 테이블 정리까지 완벽한 마무리',
      '📝 맛집 기록을 꼼꼼히 남기는 성실함',
    ],
    weaknesses: [
      '😥 친구가 감자 안 먹으면 상처받음',
      '🙈 새로운 메뉴 앞에서 주저함',
      '💭 "혹시 내가 너무 많이 먹었나" 걱정',
    ],
    compatibility: {
      best: ['ESFP', 'ESTP'],
      caution: ['ENTP', 'INTP'],
    },
    recommendedMenu: '클래식 감자튀김 (변함없는 맛) 🍟💛',
    quote: '소중한 것은 끝까지 지킨다',
  },
  INFP: {
    code: 'INFP',
    name: '감자몽상가',
    emoji: '🌙',
    shortDesc: '감자를 먹으며 시를 쓴다',
    longDesc: '감자 하나에도 감성을 느끼는 당신!\n바삭한 소리에서 음악을 듣고\n케첩 자국에서 예술을 보는\n감자계의 로맨티스트입니다.',
    strengths: [
      '🌙 감자 먹으며 시적 영감을 받는 감성',
      '🎨 감자 사진을 예술처럼 찍는 감각',
      '💭 "감자 같은 사람이 되고 싶다" 같은 깊은 생각',
    ],
    weaknesses: [
      '😢 감자 다 먹으면 괜히 서글퍼짐',
      '🌧️ 비 오는 날 감자튀김 생각에 울컥',
      '📖 감자 에세이를 쓰다 밤을 새움',
    ],
    compatibility: {
      best: ['ENFJ', 'ENTJ'],
      caution: ['ESTJ', 'ISTJ'],
    },
    recommendedMenu: '고구마 프라이 (달달한 감성) 🍠✨',
    quote: '감자는 땅에서 온 별이다',
  },
  INFJ: {
    code: 'INFJ',
    name: '감자현자',
    emoji: '🔮',
    shortDesc: '감자의 본질을 꿰뚫는 자',
    longDesc: '감자의 진정한 의미를 아는 당신!\n한 입 베어 물면 감자의 여정을\n느끼는 깊은 통찰력의 소유자.\n감자계의 철학자입니다.',
    strengths: [
      '🔮 감자 한 알에서 우주를 보는 통찰력',
      '🤝 함께 먹는 사람의 마음을 읽는 공감력',
      '✨ 분위기에 맞는 완벽한 메뉴 추천 능력',
    ],
    weaknesses: [
      '🧘 감자 먹다가 명상에 빠질 때',
      '😞 "이 감자가 행복했을까" 고민',
      '🏃 사람 많은 곳에서 먹으면 에너지 소진',
    ],
    compatibility: {
      best: ['ENFP', 'ENTP'],
      caution: ['ESTP', 'ISTP'],
    },
    recommendedMenu: '구운 감자 (자연 그대로) 🥔🔥',
    quote: '진정한 맛은 마음으로 느끼는 것이다',
  },
  ISTP: {
    code: 'ISTP',
    name: '감자장인',
    emoji: '🔧',
    shortDesc: '최적의 바삭함을 추구한다',
    longDesc: '감자 튀기는 온도와 시간을 아는 당신!\n말보다 행동, 이론보다 실전.\n완벽한 바삭함을 위해\n묵묵히 연구하는 감자 장인입니다.',
    strengths: [
      '🔧 집에서 감자튀김 직접 만드는 실행력',
      '🎯 최적의 바삭함을 찾아내는 장인 정신',
      '🧊 냉정하게 맛을 평가하는 객관성',
    ],
    weaknesses: [
      '😐 맛 없으면 말없이 안 먹음',
      '🔇 먹는 동안 대화가 없어서 분위기 ↓',
      '⚙️ 감자 튀기는 방법 논쟁에 진심',
    ],
    compatibility: {
      best: ['ESFJ', 'ESTJ'],
      caution: ['ENFJ', 'INFJ'],
    },
    recommendedMenu: '에어프라이어 감자 (직접 조리) 🔧🥔',
    quote: '완벽한 바삭함에는 이유가 있다',
  },
  ISTJ: {
    code: 'ISTJ',
    name: '감자루틴러',
    emoji: '📅',
    shortDesc: '늘 같은 메뉴, 늘 같은 자리',
    longDesc: '검증된 맛이 최고의 맛!\n신메뉴보다 늘 먹던 그 맛을 사랑하는 당신.\n자리 선정부터 주문까지\n흔들림 없는 감자 철학의 소유자입니다.',
    strengths: [
      '🎯 주문 실패가 없는 안정적인 선택',
      '⏰ 정확한 타이밍에 도착하는 시간 관리',
      '📊 어느 매장이 맛있는지 데이터 축적',
    ],
    weaknesses: [
      '😰 메뉴가 단종되면 멘탈 붕괴',
      '🙅 친구가 새 메뉴 추천하면 불안',
      '📍 늘 가던 자리에 다른 사람 있으면 당황',
    ],
    compatibility: {
      best: ['ESFP', 'ESTP'],
      caution: ['ENFP', 'INFP'],
    },
    recommendedMenu: '맥도날드 미디엄 프라이 🍟',
    quote: '변하지 않는 맛이 진정한 맛이다',
  },
  INTP: {
    code: 'INTP',
    name: '감튀과학자',
    emoji: '🧪',
    shortDesc: '오늘 염도 데이터 수집 중',
    longDesc: '감자튀김도 과학적으로 먹는 당신!\n염도, 온도, 식감을 분석하며\n최적의 감자 공식을 찾아가는\n감자계의 연구원입니다.',
    strengths: [
      '🧪 감자 맛의 원리를 분석하는 탐구력',
      '📊 여러 브랜드 감자를 비교 분석하는 체계성',
      '💡 새로운 감자 먹는 방법을 발명하는 창의력',
    ],
    weaknesses: [
      '🤓 분석하느라 감자 식히는 건 기본',
      '🗨️ 감자 얘기만 시작하면 멈출 수 없음',
      '😅 "그냥 먹어" 소리 자주 들음',
    ],
    compatibility: {
      best: ['ENTJ', 'ENTP'],
      caution: ['ESFJ', 'ISFJ'],
    },
    recommendedMenu: '다양한 딥핑 소스 세트 🧪🍟',
    quote: '감자에 대한 질문은 끝나지 않는다',
  },
  INTJ: {
    code: 'INTJ',
    name: '감자전략가',
    emoji: '🗺️',
    shortDesc: '먹는 것도 계획대로',
    longDesc: '감자 먹기에도 전략이 필요하다!\n가성비, 동선, 칼로리까지 계산하며\n완벽한 감자 경험을 설계하는\n감자계의 마스터플래너입니다.',
    strengths: [
      '🗺️ 최적의 감자 맛집 루트를 설계하는 능력',
      '📈 가성비 분석으로 항상 이득을 보는 판단력',
      '🎯 목표한 맛집은 반드시 방문하는 실행력',
    ],
    weaknesses: [
      '😑 계획에 없는 메뉴 추가하면 불편',
      '🤦 "아까 저 매장이 더 효율적이었는데" 후회',
      '🙄 즉흥적인 친구와 갈등 가능',
    ],
    compatibility: {
      best: ['ENFP', 'ENTP'],
      caution: ['ESFP', 'ISFP'],
    },
    recommendedMenu: '감자 세트메뉴 (가성비 최고) 📊🍟',
    quote: '전략 없는 식사는 감자가 아니다',
  },
};

// 감자 TMI (로딩 화면용)
export const POTATO_TMI = [
  '알고 계셨나요? 감자튀김은 벨기에가 원조입니다 🇧🇪',
  '맥도날드 감자튀김엔 19가지 재료가 들어갑니다',
  '감자는 비타민C가 사과의 2배입니다 🍎',
  '세계 최초의 감자 튀김은 1680년경 등장했습니다',
  '한국인 1인당 연간 감자 소비량은 약 13kg입니다',
  '감자튀김을 가장 많이 먹는 나라는 벨기에입니다',
  'NASA는 우주에서 감자 재배 실험을 했습니다 🚀',
  '감자에는 토마토보다 칼륨이 더 많습니다',
  '프렌치프라이는 사실 프랑스가 아닌 벨기에 음식입니다',
  '완벽한 감자튀김의 조건: 겉바속촉 (겉은 바삭, 속은 촉촉)',
];

// 궁합 매트릭스
export const COMPATIBILITY: Record<string, Record<string, { score: number; label: string; points: string[]; warnings: string[] }>> = {};

// 궁합 점수를 자동 생성하는 함수
function getCompatibilityScore(type1: string, type2: string): { score: number; label: string } {
  const bestMatch1 = TYPE_DATA[type1]?.compatibility.best || [];
  const cautionMatch1 = TYPE_DATA[type1]?.compatibility.caution || [];
  const bestMatch2 = TYPE_DATA[type2]?.compatibility.best || [];
  const cautionMatch2 = TYPE_DATA[type2]?.compatibility.caution || [];

  if (bestMatch1.includes(type2) && bestMatch2.includes(type1)) {
    return { score: 95, label: '환상의 감자 파티 조합' };
  }
  if (bestMatch1.includes(type2) || bestMatch2.includes(type1)) {
    return { score: 85, label: '찰떡궁합 감자 친구' };
  }
  if (cautionMatch1.includes(type2) && cautionMatch2.includes(type1)) {
    return { score: 35, label: '노력이 필요한 관계' };
  }
  if (cautionMatch1.includes(type2) || cautionMatch2.includes(type1)) {
    return { score: 45, label: '다름을 인정하면 OK' };
  }

  // 같은 유형
  if (type1 === type2) {
    return { score: 75, label: '서로를 비추는 거울 같은 사이' };
  }

  // 공통 글자 수에 따른 점수
  let common = 0;
  for (let i = 0; i < 4; i++) {
    if (type1[i] === type2[i]) common++;
  }
  if (common >= 3) return { score: 70, label: '편안한 감자 메이트' };
  if (common >= 2) return { score: 60, label: '서로 배우는 관계' };
  return { score: 50, label: '새로운 발견의 관계' };
}

export function getCompatibility(type1: string, type2: string) {
  const { score, label } = getCompatibilityScore(type1, type2);
  const name1 = TYPE_DATA[type1]?.name || type1;
  const name2 = TYPE_DATA[type2]?.name || type2;

  const points: string[] = [];
  const warnings: string[] = [];

  if (score >= 80) {
    points.push(`${name1}의 에너지와 ${name2}의 매력이 시너지를 냅니다`);
    points.push('함께 감자를 먹으면 행복 2배!');
    points.push('서로 다른 강점으로 완벽한 밸런스');
    warnings.push('너무 좋아서 감자 과식 주의');
  } else if (score >= 60) {
    points.push('서로의 다른 점에서 새로움을 발견');
    points.push('다양한 감자 메뉴를 시도해볼 기회');
    warnings.push('서로의 페이스를 존중해주세요');
    warnings.push('메뉴 선택에서 양보가 필요할 수 있어요');
  } else {
    points.push('정반대의 매력에 끌릴 수 있어요');
    points.push('서로에게 새로운 시각을 선물');
    warnings.push('감자 먹는 스타일이 많이 달라요');
    warnings.push('충분한 대화와 이해가 필요합니다');
    warnings.push('갈등 시 차분히 이야기 나눠보세요');
  }

  return { score, label, points, warnings };
}

// 친구 예측 질문
export const FRIEND_QUESTIONS = [
  {
    id: 1,
    text: '이 친구는 모임에서 주로?',
    optionA: { text: '분위기 메이커 역할', emoji: '🎉' },
    optionB: { text: '조용히 대화 듣는 편', emoji: '🤫' },
    axis: 'EI' as const,
  },
  {
    id: 2,
    text: '이 친구의 메뉴 선택 스타일은?',
    optionA: { text: '늘 먹던 거 주문', emoji: '👍' },
    optionB: { text: '새로운 거 도전', emoji: '✨' },
    axis: 'SN' as const,
  },
  {
    id: 3,
    text: '이 친구에게 고민 상담하면?',
    optionA: { text: '공감해주고 위로해줌', emoji: '💖' },
    optionB: { text: '해결책을 제시해줌', emoji: '💡' },
    axis: 'TF' as const,
  },
  {
    id: 4,
    text: '이 친구가 약속 시간에?',
    optionA: { text: '보통 딱 맞춰 오거나 조금 늦음', emoji: '😅' },
    optionB: { text: '항상 미리 도착', emoji: '⏰' },
    axis: 'JP' as const,
  },
];

export const FRIEND_SCORE_MAP: Record<number, { A: Record<string, number>; B: Record<string, number> }> = {
  1: { A: { E: 1 }, B: { I: 1 } },
  2: { A: { S: 1 }, B: { N: 1 } },
  3: { A: { F: 1 }, B: { T: 1 } },
  4: { A: { P: 1 }, B: { J: 1 } },
};
