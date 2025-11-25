import { useState } from 'react';
import { NavigationContext } from './NavigationContext';

// Провайдер контекста навигации
// Оборачивает приложение и предоставляет доступ к данным навигации
export function NavigationProvider({ children }) {
    const [navigationData, setNavigationData] = useState({});

    const clearNavigationData = () => {
        setNavigationData({});
    };

    return (
        <NavigationContext.Provider value={{ navigationData, setNavigationData, clearNavigationData }}>
            {children}
        </NavigationContext.Provider>
    );
}
