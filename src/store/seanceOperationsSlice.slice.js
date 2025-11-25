import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { seanceApi } from '../api/seanceApi';

const initialState = {
    loading: false,
    error: null
};

// Асинхронный экшен для добавления сеанса
export const addSeance = createAsyncThunk(
    'seance/addSeance',
    async (params) => {
        return await seanceApi.addSeance(params);
    }
);

// Асинхронный экшен для удаления сеанса
export const deleteSeance = createAsyncThunk(
    'seance/deleteSeance',
    async (id) => {
        const response = await seanceApi.deleteSeance(id);
        return response;
    }
);

// Слайс для операций с сеансами
const seanceOperationSlice = createSlice({
    name: 'seanceOperations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addSeance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addSeance.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addSeance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка добавления сеанса';
            })
    }
})

export const seanceOperationsReducer = seanceOperationSlice.reducer;
export const seanceOperationsActions = seanceOperationSlice.actions;
