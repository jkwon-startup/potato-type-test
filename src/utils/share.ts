import html2canvas from 'html2canvas';
import { trackEvent } from './analytics';

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';

export async function saveResultImage(
  cardElement: HTMLElement,
  resultType: string
): Promise<void> {
  try {
    // 캡처 전 스크롤을 카드 상단으로 이동
    cardElement.scrollIntoView({ block: 'start' });

    const canvas = await html2canvas(cardElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FFFFFF',
      logging: false,
      // 요소의 실제 크기 + 패딩을 그대로 캡처
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: cardElement.scrollWidth,
      windowHeight: cardElement.scrollHeight,
    });

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `potato_type_${resultType}_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();

    trackEvent('share_click', { share_method: 'save', result_type: resultType });
    trackEvent('share_success', { share_method: 'save', result_type: resultType });
  } catch {
    throw new Error('이미지 생성에 실패했어요. 스크린샷으로 저장해주세요.');
  }
}

export async function copyShareLink(resultType: string): Promise<boolean> {
  const shareUrl = `${BASE_URL}?source=share&ref=${resultType}`;

  try {
    await navigator.clipboard.writeText(shareUrl);
    trackEvent('share_click', { share_method: 'copy', result_type: resultType });
    trackEvent('share_success', { share_method: 'copy', result_type: resultType });
    return true;
  } catch {
    // 폴백
    const input = document.createElement('input');
    input.value = shareUrl;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    trackEvent('share_click', { share_method: 'copy', result_type: resultType });
    return true;
  }
}

export function shareToKakao(resultType: string, typeName: string, shortDesc: string): void {
  const Kakao = (window as { Kakao?: { isInitialized?: () => boolean; init?: (key: string) => void; Share?: { sendDefault: (params: unknown) => void } } }).Kakao;
  if (!Kakao) {
    throw new Error('카카오 SDK가 로드되지 않았습니다.');
  }

  trackEvent('share_click', { share_method: 'kakao', result_type: resultType });

  Kakao.Share?.sendDefault({
    objectType: 'feed',
    content: {
      title: `나는 ${resultType} ${typeName}! 🥔`,
      description: shortDesc,
      imageUrl: `${BASE_URL}/images/results/${resultType.toLowerCase()}.png`,
      link: {
        mobileWebUrl: `${BASE_URL}?source=share&ref=${resultType}`,
        webUrl: `${BASE_URL}?source=share&ref=${resultType}`,
      },
    },
    buttons: [
      {
        title: '나도 테스트하기',
        link: {
          mobileWebUrl: BASE_URL,
          webUrl: BASE_URL,
        },
      },
    ],
  });
}

// 도감 관련
const COLLECTION_KEY = 'potato_collection';
const LAST_RESULT_KEY = 'potato_last_result';

export function saveToCollection(resultType: string): void {
  try {
    const existing: string[] = JSON.parse(localStorage.getItem(COLLECTION_KEY) || '[]');
    if (!existing.includes(resultType)) {
      existing.push(resultType);
      localStorage.setItem(COLLECTION_KEY, JSON.stringify(existing));
    }
  } catch {
    // 로컬스토리지 접근 불가 시 무시
  }
}

export function getCollection(): string[] {
  try {
    return JSON.parse(localStorage.getItem(COLLECTION_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveLastResult(result: unknown): void {
  try {
    localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(result));
  } catch {
    // 무시
  }
}
