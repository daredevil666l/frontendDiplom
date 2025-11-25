import styles from './Input.module.css';
import cn from 'classnames';

// Компонент поля ввода
// Поддерживает валидацию и стилизацию
function Input({ className, isValid = true, ...props }) {

    return (
        <input {...props} className={cn(styles['input'], className, {
            [styles['invalid']]: !isValid
        })} {...props} />
    );
};

export default Input;
