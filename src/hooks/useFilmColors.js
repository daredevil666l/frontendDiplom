import { useMemo } from 'react';

// Хук для генерации цветов фильмов
// Используется для визуального различия фильмов в админке
export const useFilmColors = (films) => {
    const getRandomBalancedColor = (filmId) => {
        const hue = (filmId * 137) % 360;
        const saturation = 70 + Math.floor(Math.random() * 30);
        const lightness = 40 + Math.floor(Math.random() * 30);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    const filmColors = useMemo(() => {
        const colors = {};
        films.forEach(film => {
            colors[film.id] = getRandomBalancedColor(film.id);
        });
        return colors;
    }, [films]);

    return filmColors;
};
