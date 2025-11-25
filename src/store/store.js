import { configureStore } from "@reduxjs/toolkit";
import hallOperationsSlice from './hallOperationsSlice.slice';
import { useDispatch, useSelector } from "react-redux";
import allDataSlice from "./allDataSlice.slice";
import { filmOperationsReducer } from "./filmOperationsSlice.slice";
import { seanceOperationsReducer } from "./seanceOperationsSlice.slice";
import { hallClientConfig } from './hallClientConfig.slice'

// Конфигурация Redux хранилища
// Объединяем все редюсеры в один store
export const store = configureStore({
    reducer: {
        hall: hallClientConfig,
        halls: hallOperationsSlice,
        allData: allDataSlice,
        filmOperations: filmOperationsReducer,
        seanceOperations: seanceOperationsReducer
    }
});

// Хуки для использования в компонентах
// useAppDispatch и useAppSelector просто обертки над стандартными хуками
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;