import { useDrop } from 'react-dnd';
import styles from './DeleteSeance.module.css';
import trashIcon from '../../../assets/Admin/trash-icon.svg';

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
            <img src={trashIcon} alt="икнока мусорки" className={styles.icon} />
        </div>
    );
};
