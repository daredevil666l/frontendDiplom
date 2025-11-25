import { useEffect, useRef } from 'react';
import { fetchAllData } from './store/allDataSlice.slice';
import { useDispatch } from 'react-redux';

// Главный компонент приложения
// Загружает данные при первом запуске
export function App({ children }) {
    const dispatch = useDispatch();

    const hasFetched = useRef(false);

    // Эффект для загрузки данных, срабатывает один раз
    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            dispatch(fetchAllData());
        }
    }, [dispatch]);

    return <>{children}</>;
}