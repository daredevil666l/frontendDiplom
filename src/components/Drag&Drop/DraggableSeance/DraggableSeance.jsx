import { useDrag } from 'react-dnd';
import styles from './DraggableSeance.module.css';

// Компонент перетаскиваемого сеанса
// Отображается на таймлайне
export const DraggableSeance = ({
    seance,
    film,
    filmColor,
    position,
    hallId
}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'SEANCE',
        item: {
            seance: seance,
            hallId: hallId,
            film: film
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [seance, hallId]);

    return (
        <div
            ref={drag}
            className={`${styles.seance} ${isDragging ? styles.dragging : ''}`}
            style={{
                backgroundColor: filmColor,
                left: position.left
            }}
        >
            <span className={styles.name}>{film.film_name}</span>
            <span className={styles.time}>{seance.seance_time}</span>
        </div>
    );
};
