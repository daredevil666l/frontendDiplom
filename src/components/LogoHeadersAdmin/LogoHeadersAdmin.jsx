import styles from './LogoHeadersAdmin.module.css';
import Button from '../Button/Button';
import { useNavigate, useLocation } from 'react-router-dom';

// Логотип для админской части
export function LogoHeadersAdmin() {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginPage = location.pathname.includes('/admin/login');

    return (<div className={styles.container}>
        <div>
            <div className={styles.head}>идём<span>в</span>кино</div>
            <div className={styles.text}>Администраторррская</div>
        </div>
        {!isLoginPage && (
            <Button appereance="admin" onClick={() => navigate('/admin/login')}>выйти</Button>
        )}
    </div>

    );
};

export default LogoHeadersAdmin;
