import styles from './Seances.module.css'
import { NavLink } from 'react-router-dom';
import { useNavigation } from '../../hooks/useNavigation';
import { useAppData } from '../../hooks/useAppData';


// Компонент отображения сеансов
// Группирует сеансы по фильмам и залам
export function Seances() {
    const { films, seances, halls } = useAppData();
    const { navigationData, setNavigationData } = useNavigation();

    const seancesByFilm = seances.reduce((acc, seance) => {
        if (!acc[seance.seance_filmid]) {
            acc[seance.seance_filmid] = [];
        }
        acc[seance.seance_filmid].push(seance);
        return acc;
    }, {});

    const schedule = films.filter((film) => {
        const filmSeances = seancesByFilm[film.id] || [];
        return filmSeances.length > 0;
    }).map(film => {
        const filmSeances = seancesByFilm[film.id] || [];
        const seancesWithHall = filmSeances.map(seance => {
            const hall = halls.find(h => h.id === seance.seance_hallid);
            return { seance, hall }
        })
            .filter((item) => !!item.hall && item.hall.hall_open === 1)
            .sort((a, b) => a.seance.seance_time.localeCompare(b.seance.seance_time))
        return {
            film,
            seances: seancesWithHall
        };
    }).filter(item => item.seances.length > 0);

    const handleHallClickSeance = (seance, film) => {

        setNavigationData(prev => ({
            ...prev,
            seance: seance,
            film: film,
        }))
    };

    return <div className={styles.container}>
        {schedule.map(({ film, seances }) => (
            <div className={styles.film}
                key={film.id}>
                <div className={styles.content}>
                    <img src={film.film_poster} className={styles.poster} />
                    <div className={styles.info}>
                        <div className={styles.name}>{film.film_name}</div>
                        <div>{film.film_description}</div>
                        <div className={styles['second-info']}>
                            <div>{film.film_duration}&nbsp;минут</div>
                            <div>{film.film_origin}</div>
                        </div>
                    </div>
                </div>
                {Object.entries(
                    seances.reduce((acc, { seance, hall }) => {
                        if (!acc[hall.hall_name]) {
                            acc[hall.hall_name] = []
                        }
                        acc[hall.hall_name].push(seance);
                        return acc
                    }, {}))
                    .map(([hallName, hallSeances]) => (
                        <div key={hallName} className={styles.hall}>
                            <div className={styles['hall-name']}>{hallName}</div>
                            <div className={styles.seances}>
                                {hallSeances
                                    .sort((a, b) => a.seance_time.localeCompare(b.seance_time))
                                    .map(seance => (
                                        <NavLink to={navigationData.date
                                            ? `/hallconfig?seanceId=${seance.id}&date=${navigationData.date}`
                                            : '/'} key={seance.id}
                                            className={styles['seance-time']}
                                            onClick={() => handleHallClickSeance(seance, film)}
                                        >
                                            {seance.seance_time}
                                        </NavLink>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
            </div>
        ))}
    </div>
}
