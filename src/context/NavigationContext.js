import { createContext } from 'react';

// Контекст навигации
// Используется для передачи данных между страницами и компонентами
const defaultContext = {
    navigationData: {},
    setNavigationData: () => { },
    clearNavigationData: () => { },
};

export const NavigationContext = createContext(defaultContext);
