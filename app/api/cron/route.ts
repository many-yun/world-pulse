import { NextRequest, NextResponse } from 'next/server';
import { fetchGdeltData } from '@/lib/gdelt';

export async function GET(req: NextRequest) {
   const authHeader = req.headers.get('authorization');
   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   try {
      const data = await fetchGdeltData();

      // TODO: 다음 단계에서 Ably broadcast 추가 예정

      return NextResponse.json({
         success: true,
         updatedAt: data.updatedAt,
         countryCount: Object.keys(data.countries).length,
      });
   } catch (error) {
      console.error('Cron job error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}
