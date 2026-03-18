import { CountryData, Emotion, PulseData } from '@/types';

const GDELT_BASE = 'https://api.gdeltproject.org/api/v2/geo/geo';

function toneToEmotion(tone: number): Emotion {
   if (tone > 5) return 'joy';
   if (tone > 2) return 'trust';
   if (tone > 0) return 'anticipation';
   if (tone > -2) return 'neutral';
   if (tone > -5) return 'surprise';
   if (tone > -8) return 'sadness';
   if (tone > -12) return 'fear';
   if (tone > -18) return 'disgust';
   return 'anger';
}

interface GdeltArticle {
   title: string;
   tone: number;
   country: string;
}

export async function fetchGdeltData(): Promise<PulseData> {
   const now = new Date();
   const since = new Date(now.getTime() - 15 * 60 * 1000);

   const formatDate = (d: Date) => d.toISOString().replace(/[-:T]/g, '').slice(0, 14);

   const url = new URL(GDELT_BASE);
   url.searchParams.set('query', '');
   url.searchParams.set('mode', 'artlist');
   url.searchParams.set('maxrecords', '250');
   url.searchParams.set('startdatetime', formatDate(since));
   url.searchParams.set('enddatetime', formatDate(now));
   url.searchParams.set('format', 'json');

   let articles: GdeltArticle[] = [];

   try {
      const res = await fetch(url.toString(), { next: { revalidate: 0 } });
      if (res.ok) {
         const json = await res.json();
         articles = (json.articles ?? []).map((a: Record<string, unknown>) => ({
            title: String(a.title ?? ''),
            tone: parseFloat(String(a.tone ?? '0')),
            country: String(a.sourcecountry ?? ''),
         }));
      }
   } catch (e) {
      console.error('GDELT fetch error:', e);
   }

   // 국가별 집계
   const map: Record<string, { tones: number[]; titles: string[] }> = {};

   for (const article of articles) {
      const code = article.country?.toUpperCase();
      if (!code || code.length !== 2) continue;
      if (!map[code]) map[code] = { tones: [], titles: [] };
      map[code].tones.push(article.tone);
      map[code].titles.push(article.title);
   }

   const countries: Record<string, CountryData> = {};

   for (const [code, { tones, titles }] of Object.entries(map)) {
      const avgTone = tones.reduce((a, b) => a + b, 0) / tones.length;
      countries[code] = {
         code,
         tone: Math.round(avgTone * 10) / 10,
         emotion: toneToEmotion(avgTone),
         topIssue: titles[0] ?? '',
         articleCount: tones.length,
      };
   }

   return {
      updatedAt: now.toISOString(),
      countries,
   };
}
