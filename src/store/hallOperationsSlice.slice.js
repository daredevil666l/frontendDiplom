import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hallApi } from '../api/hallApi';

// Асинхронный экшен для добавления зала
export const addHall = createAsyncThunk(
  'halls/addHall',
  async (hallName) => {
    return await hallApi.addHall(hallName);
  }
);

// Асинхронный экшен для удаления зала
export const deleteHall = createAsyncThunk(
  'halls/deleteHall',
  async (id) => {
    await hallApi.deleteHall(id);
    return id;
  }
);

// Асинхронный экшен для настройки зала
export const configHall = createAsyncThunk(
  'halls/configHall',
  async (params) => {
    const response = await hallApi.configHall(params);
    return response;
  }
);

// Асинхронный экшен для настройки цен
export const configPrice = createAsyncThunk(
  'halls/configPrice',
  async (params) => {
    const response = await hallApi.configPrice(params);
    return response;
  }
)

// Асинхронный экшен для открытия зала продаж
export const openHall = createAsyncThunk(
  'halls/openHall',
  async (params) => {
    const response = await hallApi.openHall(params);
    return response;
  }
)

const initialState = {
  loading: false,
  error: null
};

// Слайс для операций с залами (админка)
const hallOperationsSlice = createSlice({
  name: 'hallOperations',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addHall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHall.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addHall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка добавления зала';
      })

  }
});

export const { clearError } = hallOperationsSlice.actions;
export default hallOperationsSlice.reducer;