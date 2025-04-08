import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PlanType = 'TECHNICIAN' | 'BUSINESS' | 'CUSTOMER_TENDER';

export interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  durationMonths: number;
  planType: PlanType;
  featuresEnglish: string[];
  featuresAmharic: string[];
  featuresOromo: string[];
}

interface SubscriptionState {
  currentPlan: SubscriptionPlan | null;
  availablePlans: SubscriptionPlan[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  currentPlan: JSON.parse(localStorage.getItem('currentPlan') || 'null'),
  availablePlans: [],
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setCurrentPlan: (state, action: PayloadAction<SubscriptionPlan>) => {
      state.currentPlan = action.payload;
      localStorage.setItem('currentPlan', JSON.stringify(action.payload));
    },
    setAvailablePlans: (state, action: PayloadAction<SubscriptionPlan[]>) => {
      state.availablePlans = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentPlan, setAvailablePlans, setLoading, setError } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;