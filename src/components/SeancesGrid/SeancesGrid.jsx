import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fetchAllData } from '../../store/allDataSlice.slice';
import { useAppDispatch } from '../../store/store';
import Button from '../Button/Button';
import styles from './SeancesGrid.module.css';
import { PopupAddFilm } from '../Popup/PopupAddFilm';
import { deleteFilm } from '../../store/filmOperationsSlice.slice';
import { DraggableFilm } from '../Drag&Drop/DraggableFilm/DraggableFilm';
import { PopupAddSeance } from '../Popup/PopupAddSeance';
import { useFilmColors } from '../../hooks/useFilmColors';
import { HallWithBasket } from '../Drag&Drop/HallWithBasket/HallWithBasket';
import { PopupDeleteSeance } from '../Popup/PopupDeleteSeance';
import { addSeance } from '../../store/seanceOperationsSlice.slice';
import { useAppData } from '../../hooks/useAppData';

// Компонент сетки сеансов (админка)
// Позволяет управлять сеансами с помощью Drag & Drop
export function SeancesGrid() {
    const [showFilmPopup, setShowFilmPopup] = useState(false);
    const [showSeancePopup, setShowSeancePopup] = useState(false);
    const [showDeleteSeancePopup, setShowDeleteSeancePopup] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [selectedHall, setSelectedHall] = useState(null);
    const [selectedSeance, setSelectedSeance] = useState(null);
    const [localSeances, setLocalSeances] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useAppDispatch();
    const { halls, films, seances, refreshData } = useAppData();

    const allSeances = [...seances, ...localSeances];

    const cancel = () => {
        setLocalSeances([]);
        setError(null);
    }

    const handleSave = async () => {

        if (isSaving) {
            return;
        }

        if (localSeances.length === 0) {
            setError('Нет сеансов для сохранения');
            return;
        }

        setIsSaving(true);

        try {
            await Promise.all(
                localSeances.map(seance =>
                    dispatch(addSeance({
                        seanceHallid: seance.seance_hallid,
                        seanceFilmid: seance.seance_filmid,
                        seanceTime: seance.seance_time
                    })).unwrap()
                )
            );

            setLocalSeances([]);
            await refreshData();
        } catch (error) {
            console.error('Сетевая ошибка при сохранении сеансов:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddFilm = () => {
        setShowFilmPopup(true);
    }

    const handleCloseFilmPopup = () => {
        setShowSeancePopup(false)
        setShowFilmPopup(false);
    }

    const handleSuccessCreate = () => {
        setShowFilmPopup(false);
        dispatch(fetchAllData());
    }

    const handleSeanceDelete = (seanceId, film) => {
        setSelectedSeance(seanceId);
        setSelectedFilm(film);
        setShowDeleteSeancePopup(true);
    }

    const handleCloseDeletePopup = () => {
        setShowDeleteSeancePopup(false);
        setSelectedSeance(null);
        setSelectedFilm('');
    };

    const delFilm = async (id) => {
        try {
            await dispatch(deleteFilm(id)).unwrap();
        } catch (err) {
            console.error('Error delete film:', err);
        }
    }

    const handleFilmDropped = (film, hall) => {
        setSelectedHall(hall);
        setSelectedFilm(film);
        setShowSeancePopup(true);
    };

    const handleSeanceAdd = (seanceData) => {

        const newSeance = {
            id: Date.now(),
            seance_hallid: seanceData.hallId,
            seance_filmid: seanceData.filmId,
            seance_time: seanceData.time,
        };

        setLocalSeances(prev => [...prev, newSeance]);
        setShowSeancePopup(false);
        setSelectedFilm(null);
        setSelectedHall(null);
    };

    const filmColors = useFilmColors(films);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.container}>
                <Button appereance='admin' className={styles.add} onClick={handleAddFilm}>
                    Добавить фильм
                </Button>
                <div className={styles.films}>
                    {films.map((film) => (
                        <DraggableFilm
                            key={film.id}
                            film={film}
                            backgroundColor={filmColors[film.id]}
                            onDelete={delFilm}
                        />
                    ))}
                </div>
                <div className={styles['seances-grid']}>
                    {halls.map(hall => (

                        <HallWithBasket
                            key={hall.id}
                            hall={hall}
                            films={films}
                            filmColors={filmColors}
                            onFilmDropped={handleFilmDropped}
                            seances={allSeances}
                            onSeanceDelete={handleSeanceDelete}
                        />

                    ))}
                </div>
                {isSaving ? <div>Выполняется сохранение сеансов...</div> : error ? <div className={styles.error}>{error}</div> : ''}
                <div className={styles.buttons}>
                    <Button appereance="cancel" onClick={cancel}>Отменить</Button>
                    <Button appereance="admin" type="submit" onClick={handleSave} disabled={isSaving}>Сохранить</Button>
                </div>
                {showFilmPopup && (
                    <div className={styles.popupOverlay}>
                        <div className={styles.popupContent}>
                            <PopupAddFilm
                                onClose={handleCloseFilmPopup}
                                onSuccess={handleSuccessCreate}
                            />
                        </div>
                    </div>
                )}
                {showSeancePopup && (
                    <div className={styles.popupOverlay}>
                        <div className={styles.popupContent}>
                            <PopupAddSeance
                                onClose={handleCloseFilmPopup}
                                onSuccessAddLocal={handleSeanceAdd}
                                hall={selectedHall}
                                film={selectedFilm}
                            />
                        </div>
                    </div>
                )}
                {showDeleteSeancePopup && (
                    <div className={styles.popupOverlay}>
                        <div className={styles.popupContent}>
                            <PopupDeleteSeance
                                onClose={handleCloseDeletePopup}
                                onSuccess={handleSuccessCreate}
                                seance={selectedSeance}
                                film={selectedFilm}
                            />
                        </div>
                    </div>
                )}
            </div>
        </DndProvider>
    );
}
