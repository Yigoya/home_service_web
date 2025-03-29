import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../Shared/api';
import i18n from '../i18n';

// Async thunk to fetch data
export const fetchData = createAsyncThunk('data/fetchData', async (_, { getState }) => {
  console.log(i18n.language, "i18n.language");
  const language = i18n.language === "am" ? "AMHARIC" : i18n.language === "om" ? "OROMO" : "ENGLISH";
  console.log("fetchData");
  const { data } = getState();
  if (data.services.length > 0) return data.items; // Skip fetch if data already exists
  try {
    const response = await axios.get(`${API_URL}/admin/services?lang=${language}`);
    console.log(response.data, "response.data");
    const data = response.data.sort((a, b) => a.categoryId - b.categoryId);
    const tenders = data[0].services
    const companies = data[1].services
    
    const services = data
    return { tenders, companies, services };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
  
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    tenders: [],
    companies: [],
    services: [],
    subcategory: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSubcategory: (state, action) => {
      state.subcategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.tenders = action.payload.tenders;
        state.companies = action.payload.companies;
        state.services = action.payload.services;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
export const { setSubcategory } = dataSlice.actions;