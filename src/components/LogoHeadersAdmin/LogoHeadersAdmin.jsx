import styles from './LogoHeadersAdmin.module.css';

// Логотип для админской части
export function LogoHeadersAdmin() {

    return (<div>
        <div className={styles.head}>идём<span>в</span>кино</div>
        <div className={styles.text}>Администраторррская</div>
    </div>

    );
};

export default LogoHeadersAdmin;
