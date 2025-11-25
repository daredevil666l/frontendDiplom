import styles from './Headling.module.css';
import cn from 'classnames';

// Компонент заголовка
// Используется для единообразного оформления заголовков
function Headling({ children, className, appearence, ...props }) {

    return (
        <div className={cn(className, styles['head'], {
            [styles.client]: appearence === 'client',
            [styles.admin]: appearence === 'admin'
        })} {...props}> {children}
        </div>
    );
};

export default Headling;
