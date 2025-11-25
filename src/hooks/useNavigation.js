import { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

// Хук для использования навигации
// Упрощает доступ к контексту навигации
export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};
