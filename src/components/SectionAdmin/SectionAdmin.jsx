import { useState } from "react";
import Headling from "../../components/Headling/Headling";
import styles from './SectionAdmin.module.css';
import cn from 'classnames';

// Компонент секции в админке
// Может сворачиваться и разворачиваться
export function SectionAdmin({ children, title }) {
    const [isOpen, setIsOpen] = useState(true);
    const toggleOpen = () => {
        setIsOpen(prevState => !prevState)
    }

    return <>
        <div className={styles.container}>
            <div className={styles.head} onClick={toggleOpen}>
                <img src="../public/Admin/circle-icon.svg" alt="иконка круга" className={styles.icon} />
                <Headling appearence='admin' className={styles.title} >{title}</Headling>
                <img src="../public/Admin/check_mark-icon.svg" alt="кнопка открытия выпадающего окна" className={cn(styles['check-mark'],
                    {
                        [styles['check-mark-rotate']]: isOpen
                    })} />
            </div>
            {isOpen && <div className={styles.content}>
                {children}
            </div>}
        </div>
    </>
}
