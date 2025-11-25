import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { allDataApi } from '../api/allDataApi';
import { configPrice, deleteHall, openHall } from './hallOperationsSlice.slice';
import { configHall } from './hallOperationsSlice.slice';
import { deleteFilm } from './filmOperationsSlice.slice';
import { deleteSeance } from './seanceOperationsSlice.slice';

// Асинхронный экшен для получения всех данных
// Используем createAsyncThunk для обработки асинхронных запросов
export const fetchAllData = createAsyncThunk(
    'allData/fetchAllData',
    async () => {
        return await allDataApi.getAllData();
    }
);

const initialState = {
    data: null,
    loading: false,
    error: null
};

// Слайс для хранения всех данных приложения
const allDataSlice = createSlice({
    name: 'allData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Обработка состояний загрузки данных
            .addCase(fetchAllData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAllData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки данных';
            })
            // Обработка удаления зала
            .addCase(deleteHall.fulfilled, (state, action) => {
                if (state.data && state.data.result && state.data.result.halls) {
                    const hallId = action.payload;
                    state.data.result.halls = state.data.result.halls.filter(hall => hall.id !== hallId);
                }
            })
            // Обработка конфигурации зала
            .addCase(configHall.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(configHall.fulfilled, (state, action) => {
                state.loading = false;
                if (state.data?.result?.halls) {
                    const index = state.data.result.halls.findIndex(hall => hall.id === action.payload.result.id);
                    if (index !== -1) {
                        state.data.result.halls[index] = action.payload.result;
                    }
                }
            })
            .addCase(configHall.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки данных';
            })
            // Обработка конфигурации цен
            .addCase(configPrice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(configPrice.fulfilled, (state, action) => {
                state.loading = false;
                if (state.data?.result?.halls) {
                    const index = state.data.result.halls.findIndex(hall => hall.id === action.payload.result.id);
                    if (index !== -1) {
                        state.data.result.halls[index] = action.payload.result;
                    }
                }
            })
            .addCase(configPrice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки данных';
            })
            // Обработка удаления фильма
            .addCase(deleteFilm.fulfilled, (state, action) => {
                if (state.data && state.data.result && state.data.result.films) {
                    const filmId = action.payload;
                    state.data.result.films = state.data.result.films.filter(film => film.id !== filmId);
                }
            })
            // Обработка удаления сеанса
            .addCase(deleteSeance.fulfilled, (state, action) => {
                if (state.data && state.data.result && state.data.result.seances) {
                    const seanceId = action.payload;
                    state.data.result.seances = state.data.result.seances.filter(seance => seance.id !== seanceId);
                }
            })
            // Обработка открытия зала
            .addCase(openHall.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(openHall.fulfilled, (state, action) => {

                if (action.payload.success && action.payload.result.halls) {
                    const updatedHalls = action.payload.result.halls;

                    if (state.data?.result?.halls) {
                        state.data.result.halls = updatedHalls;
                    }
                }
            })
            .addCase(openHall.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка открытия зала'
            })
    }
});

export default allDataSlice.reducer;