import { useDrop } from 'react-dnd';
import styles from './HallWithBasket.module.css';
import { DroppableTimeline } from '../DroppableTimeline/DroppableTimeline';
import { DeleteSeance } from '../DeleteSeance/DeleteSeance';

// Компонент зала с корзиной для удаления сеансов
// Объединяет таймлайн зала и зону удаления
export function HallWithBasket({
    hall,
    films,
    filmColors,
    onFilmDropped,
    seances,
    onSeanceDelete
}) {
    const [{ draggedItem }] = useDrop({
        accept: 'SEANCE',
        drop: (item) => {
            if (item.hallId === hall.id) {
                onSeanceDelete(item.seance, item.film);
            }
        },
        collect: (monitor) => ({
            draggedItem: monitor.getItem(),
        }),
    });

    const shouldShowBasket = draggedItem && draggedItem.hallId === hall.id;

    return (
        <div className={styles.deletSeance}>
            {shouldShowBasket && (
                <DeleteSeance onSeanceDelete={onSeanceDelete} />
            )}
            <DroppableTimeline
                hall={hall}
                films={films}
                filmColors={filmColors}
                onFilmDropped={onFilmDropped}
                seances={seances}
            />
        </div>
    );
}
