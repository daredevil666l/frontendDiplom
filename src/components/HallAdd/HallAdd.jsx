import { useState } from 'react';
import Button from '../Button/Button';
import styles from './HallAdd.module.css'
import { useAppDispatch } from '../../store/store';
import { fetchAllData } from '../../store/allDataSlice.slice';
import { deleteHall } from "../../store/hallOperationsSlice.slice";
import { PopupCreateHall } from '../Popup/PopupCreateHall';
import { useAppData } from '../../hooks/useAppData';

// Компонент добавления зала
// Отображает список залов и кнопку создания нового
export function HallAdd() {
    const { halls } = useAppData();
    const dispatch = useAppDispatch();
    const [showPopup, setShowPopup] = useState(false);

    // Удаление зала
    const delHall = async (id) => {
        try {
            await dispatch(deleteHall(id)).unwrap();
        } catch (err) {
            console.error('Error delete halls:', err);
        }
    }

    const handleCreateHall = () => {
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    }

    const handleSuccessCreate = () => {
        setShowPopup(false);
        dispatch(fetchAllData());
    }

    return <>
        {halls && <div>
            <div className={styles.title}>Доступные залы:</div>
            <div className={styles.halls}>
                {halls.map((hall) => (
                    <div key={hall.id} className={styles.hall}>
                        <div >- {hall.hall_name}</div>
                        <img src="../public/Admin/delete-icon.svg" alt="иконка удаления зала" className={styles.icon} onClick={() => delHall(hall.id)} />
                    </div>
                ))}
            </div>
        </div>}
        <Button appereance="admin" onClick={() => handleCreateHall()}>Создать зал</Button>
        {showPopup && (
            <div className={styles.popupOverlay}>
                <div className={styles.popupContent}>
                    <PopupCreateHall
                        onClose={handleClosePopup}
                        onSuccess={handleSuccessCreate}
                    />
                </div>
            </div>
        )}
    </>
}
