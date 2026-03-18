import { create } from 'zustand';
import { PulseData, CountryData } from '@/types';

interface PulseStore {
   pulseData: PulseData | null; // GDELT에서 받아온 전체 국가 데이터
   selectedCountry: CountryData | null; // 지구본에서 클릭한 나라
   isLoading: boolean;

   setPulseData: (data: PulseData) => void;
   setSelectedCountry: (country: CountryData | null) => void;
   setLoading: (loading: boolean) => void;
}

export const usePulseStore = create<PulseStore>((set) => ({
   pulseData: null,
   selectedCountry: null,
   isLoading: true,

   setPulseData: (data) => set({ pulseData: data, isLoading: false }),
   setSelectedCountry: (country) => set({ selectedCountry: country }),
   setLoading: (loading) => set({ isLoading: loading }),
}));
