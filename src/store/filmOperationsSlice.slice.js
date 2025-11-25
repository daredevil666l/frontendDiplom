import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { filmApi } from '../api/filmApi';

const initialState = {
    loading: false,
    error: null
};

// Асинхронный экшен для добавления фильма
export const addFilm = createAsyncThunk(
    'films/addFilm',
    async (params) => {
        return await filmApi.addFilm(params);
    }
);

// Асинхронный экшен для удаления фильма
export const deleteFilm = createAsyncThunk(
    'films/deleteFilm',
    async (id) => {
        await filmApi.deleteFilm(id);
        return id;
    }
);

// Слайс для операций с фильмами
const filmOperationSlice = createSlice({
    name: 'filmOperations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFilm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFilm.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addFilm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка добавления фильма';
            })
    }
})

export const filmOperationsReducer = filmOperationSlice.reducer;
export const filmOperationsActions = filmOperationSlice.actions;
