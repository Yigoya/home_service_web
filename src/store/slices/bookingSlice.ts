import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Address {
  street: string | null;
  city: string;
  subcity: string;
  wereda: string;
  state: string | null;
  country: string | null;
  zipCode: string | null;
}

interface Review {
  id: number;
  rating: number;
  review: string | null;
}

interface Booking {
  id: number;
  customerName: string;
  technicianName: string;
  technicianProfleImage: string | null;
  customerProfleImage: string | null;
  serviceName: string;
  scheduledDate: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
  description: string;
  address: Address;
  review: Review | null;
}

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateBookingStatus: (
      state,
      action: PayloadAction<{ id: number; status: Booking['status'] }>
    ) => {
      const booking = state.bookings.find((b) => b.id === action.payload.id);
      if (booking) {
        booking.status = action.payload.status;
      }
    },
  },
});

export const { setBookings, setLoading, setError, updateBookingStatus } =
  bookingSlice.actions;
export default bookingSlice.reducer;