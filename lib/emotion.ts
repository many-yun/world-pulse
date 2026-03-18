import { Emotion } from '@/types';

type EmotionConfig = {
   color: string;
   label: string;
   emoji: string;
   desc: string;
};

export const EMOTION_CONFIG: Record<Emotion, EmotionConfig> = {
   joy: { color: '#F6C97F', label: 'Joy', emoji: 'sunny', desc: '따뜻하고 밝은 감정이 번집니다' },
   trust: { color: '#90C9A0', label: 'Trust', emoji: 'leaf', desc: '고요하고 안정된 초록빛입니다' },
   anticipation: { color: '#A8C4E0', label: 'Anticipation', emoji: 'sky', desc: '설레는 하늘빛이 감돕니다' },
   neutral: { color: '#C4BAD0', label: 'Neutral', emoji: 'calm', desc: '잔잔하게 가라앉은 상태입니다' },
   surprise: { color: '#D4A8D8', label: 'Surprise', emoji: 'bloom', desc: '예상치 못한 분홍빛 순간입니다' },
   sadness: { color: '#88AACC', label: 'Sadness', emoji: 'rain', desc: '깊고 조용한 파란빛입니다' },
   fear: { color: '#E8B090', label: 'Fear', emoji: 'wind', desc: '불안이 번지듯 스며듭니다' },
   disgust: { color: '#B0C898', label: 'Disgust', emoji: 'moss', desc: '쓴맛 같은 감정이 흐릅니다' },
   anger: { color: '#E89090', label: 'Anger', emoji: 'rose', desc: '뜨겁게 번지는 붉은 감정입니다' },
};

export function getEmotionColor(emotion: Emotion): string {
   return EMOTION_CONFIG[emotion]?.color ?? '#C4BAD0';
}
