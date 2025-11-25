// Хук для работы с таймлайном сеансов
// Рассчитывает позицию сеанса на временной шкале
export const useTimeline = () => {
    const timelineWidth = 720;
    const visibleRange = {
        start: 7 * 60,
        end: 23 * 60
    }

    const getSeancePosition = (seanceTime) => {
        const [hours, minutes] = seanceTime.split(':').map(Number);

        const startMinutes = hours * 60 + minutes;

        const left = ((startMinutes - visibleRange.start) / (24 * 60)) * timelineWidth;

        const clampedLeft = Math.max(0, Math.min(timelineWidth, left));

        return {
            left: `${clampedLeft}px`
        };
    };

    return { getSeancePosition };
};
