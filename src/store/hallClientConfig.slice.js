import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hallApi } from "../api/hallApi";

const initialState = {
    dataHall: {
        result: [],
    },
    loadingHall: false,
    errorHall: null,
    success: false
};

// Получение конфигурации зала для клиента
export const fetchHallConfig = createAsyncThunk(
    'hall/hallCongigClient',
    async ({ seanceId, date }) => {
        const response = await hallApi.getConfigHall({ seanceId, date });
        return response;
    }
)

// Покупка билетов
export const setTickets = createAsyncThunk(
    'hall/buyTickets',
    async (params) => {
        const response = await hallApi.buyTickets(params)
        return response.data
    }
)

// Слайс для работы с конфигурацией зала на клиенте
const hallSlice = createSlice({
    name: 'hall',
    initialState,
    reducers: {
        clearHallConfig: (state) => {
            state.dataHall.result = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHallConfig.pending, (state) => {
                state.loadingHall = true;
                state.errorHall = null;
            })
            .addCase(fetchHallConfig.fulfilled, (state, action) => {
                state.loadingHall = false;
                state.dataHall = action.payload;
            })
            .addCase(fetchHallConfig.rejected, (state, action) => {
                state.loadingHall = false;
                state.errorHall = action.error.message || 'Ошибка загрузки конфигурации зала';
            })
            .addCase(setTickets.pending, (state) => {
                state.loadingHall = true;
                state.errorHall = null;
                state.success = false;
            })
            .addCase(setTickets.fulfilled, (state, action) => {
                state.loadingHall = false;
                state = action.payload.data || null;
            })
            .addCase(setTickets.rejected, (state, action) => {
                state.loadingHall = false;
                state.errorHall = action.error.message || 'Ошибка покупки билетов';
            });
    },
});

export const hallClientConfig = hallSlice.reducer;