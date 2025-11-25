import styles from './Button.module.css';
import cn from 'classnames';

// Компонент кнопки
// Поддерживает разные размеры и стили
function Button({ children, className, appereance = 'small', ...props }) {

    return (
        <button className={cn(styles.button, styles.accent, className, {
            [styles.small]: appereance === 'small',
            [styles.big]: appereance === 'big',
            [styles.admin]: appereance === 'admin',
            [styles.cancel]: appereance === 'cancel'
        })} {...props}>{children}</button>
    );
}

export default Button;
