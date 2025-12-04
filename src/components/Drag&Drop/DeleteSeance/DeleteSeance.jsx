import { useDrop } from 'react-dnd';
import styles from './DeleteSeance.module.css';

// Компонент корзины для удаления сеансов
// Появляется при перетаскивании сеанса
export const DeleteSeance = ({ onSeanceDelete }) => {
    const [{ isOver, draggedItem }, drop] = useDrop(() => ({
        accept: 'SEANCE',
        drop: (item) => {
            onSeanceDelete(item.seance, item.film);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            draggedItem: monitor.getItem()
        }),
    }), [onSeanceDelete]);

    if (!draggedItem) {
        return null;
    }

    return (
        <div
            ref={drop}
            className={`${styles.trashBin} ${isOver ? styles['drag-over'] : ''}`}
        >
            <img src={`${import.meta.env.BASE_URL}Admin/trash-icon.svg`} alt="икнока мусорки" className={styles.icon} />
        </div>
    );
};
