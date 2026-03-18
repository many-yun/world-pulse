export type Emotion =
   | 'joy'
   | 'trust'
   | 'fear'
   | 'surprise'
   | 'sadness'
   | 'disgust'
   | 'anger'
   | 'anticipation'
   | 'neutral';

export interface CountryData {
   code: string; // ISO2 코드 (예: "KR")
   tone: number; // GDELT 감정 톤 (-100 ~ +100)
   emotion: Emotion; // 감정 레이블
   topIssue: string; // 최다 언급 이슈 헤드라인
   articleCount: number; // 집계된 기사 수
}

export interface PulseData {
   updatedAt: string; // ISO timestamp
   countries: Record<string, CountryData>; // 키: ISO2 코드
}
