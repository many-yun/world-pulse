import { NextResponse } from 'next/server';
import { fetchGdeltData } from '@/lib/gdelt';

export async function GET() {
   try {
      const data = await fetchGdeltData();
      return NextResponse.json(data);
   } catch (error) {
      console.error('Initial data fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
   }
}
