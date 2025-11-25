import { useDrop } from 'react-dnd';
import styles from './DroppableTimeline.module.css';
import { useTimeline } from '../../../hooks/useTimeline';
import { DraggableSeance } from '../DraggableSeance/DraggableSeance';

// Компонент таймлайна, на который можно перетаскивать фильмы
// Отображает сеансы во времени
export const DroppableTimeline = ({
    hall,
    films = [],
    seances = [],
    filmColors = {},
    onFilmDropped
}) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'FILM',
        drop: (item) => {
            onFilmDropped(item.film, hall);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [hall, onFilmDropped]);

    const { getSeancePosition } = useTimeline();
    const hallSeances = seances.filter(seance => seance.seance_hallid === hall.id);


    const getFilmById = (filmId) => {
        return films.find(film => film.id === filmId);
    };

    return (
        <div className={styles.halls}>

            <div className={styles['hall-name']}>{hall.hall_name}</div>
            <div
                ref={drop}
                className={`${styles.timeline} ${isOver ? styles['drag-over'] : ''}`}
            >
                {hallSeances.sort((a, b) => a.seance_time.localeCompare(b.seance_time))
                    .map(seance => {
                        const film = getFilmById(seance.seance_filmid);

                        if (!film) return null;

                        const position = getSeancePosition(seance.seance_time);


                        return <DraggableSeance
                            key={seance.id}
                            seance={seance}
                            film={film}
                            filmColor={filmColors[film.id]}
                            position={position}
                            hallId={hall.id}
                        />

                    })
                }
            </div>
        </div>
    );
};
