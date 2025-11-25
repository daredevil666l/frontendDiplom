// Компонент попапа для добавления нового фильма
// Позволяет загрузить постер, указать название, длительность, описание и страну производства

import { useRef, useState } from "react";
import Button from "../Button/Button";
import Headling from "../Headling/Headling";
import Input from "../Input/Input";
import styles from "./Popup.module.css";
import cn from 'classnames';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addFilm } from "../../store/filmOperationsSlice.slice";


export function PopupAddFilm({ onClose, onSuccess }) {
    const [error, setError] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { loading: hallsLoading } = useAppSelector(state => state.filmOperations);

    // Обработчик клика по кнопке загрузки
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // Обработчик выбора файла
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setError(null)
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    // Удаление выбранного постера
    const handleRemovePoster = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Отправка формы
    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        const form = e.currentTarget;
        const formData = new FormData(form);

        const filmName = formData.get('filmName');
        const filmDuration = formData.get('filmDuration');
        const filmDescription = formData.get('filmDescription');
        const filmOrigin = formData.get('filmOrigin');

        // Валидация полей
        if (!filmName?.trim() || !filmDescription?.trim() || !filmOrigin?.trim()) {
            setError('Заполните все текстовые поля');
            return;
        }

        const duration = parseInt(filmDuration);
        if (!filmDuration?.trim() || isNaN(duration) || duration <= 0) {
            setError('Укажите корректную продолжительность фильма');
            return;
        }

        if (!selectedFile) {
            setError('Постер фильма обязателен');
            return;
        }

        await handleAddFilm(formData);
    }

    // Логика добавления фильма через API
    const handleAddFilm = async (formData) => {
        try {
            const res = await dispatch(addFilm(formData)).unwrap();

            if (!res.success) {
                setError(res.error);
            }
            else {
                onSuccess?.();
                navigate('/admin/cabinet');
            }
        } catch (e) {
            console.error('Error creating hall:', e);
            setError(e.response?.data?.message || 'Ошибка при создании зала');
        }
    }

    return <div className={styles.popup}>
        <div className={styles.head}>
            <Headling appearence="admin"> Добавление фильма</Headling>
            <img src="../public/Admin/close-icon.svg" alt="иконка крестика" className={styles.icon} onClick={onClose || (() => navigate('/admin/cabinet'))} />
        </div>
        <form className={styles.form} onSubmit={submit}>
            <div className={styles['input-block']}>
                <label htmlFor="filmName" className={styles.title}>Название фильма</label>
                <Input id="filmName" name="filmName" placeholder="Например, «Гражданин Кейн»»" className={styles.input} />
            </div>
            <div className={styles['input-block']}>
                <label htmlFor="filmDuration" className={styles.title}>Продолжительность фильма (мин.)</label>
                <Input id="filmDuration" name="filmDuration" className={styles.input} />

            </div>
            <div className={styles['input-block']}>
                <label htmlFor="filmDescription" className={styles.title}>Описание фильма</label>
                <textarea name="filmDescription" id="filmDescription" className={cn(styles.input, styles.description)}></textarea>
            </div>
            <div className={styles['input-block']}>
                <label htmlFor="filmOrigin" className={styles.title}>Страна</label>
                <Input id="filmOrigin" name="filmOrigin" className={styles.input} />
            </div>
            {hallsLoading ? <div className={styles.loading}>Добавление фильма...</div> : error ? <div className={styles.error} >{error}</div> : null}
            <div className={styles.buttons}>
                <Button type="submit" appereance="admin">Добавить фильм</Button>
                <Button type="button" appereance="admin" onClick={handleUploadClick} disabled={hallsLoading}>Загрузить постер</Button>
                <input
                    type="file"
                    name="filePoster"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
                <Button type="button" appereance="cancel" onClick={onClose || (() => navigate('/admin/cabinet'))}>Отменить</Button>
            </div>

        </form>
        {previewUrl && (
            <div className={styles['preview-container']}>
                <div className={styles.preview}>
                    <img src={previewUrl} alt="Предпросмотр постера" className={styles['preview-image']} />
                    <img src="../../Admin/close-icon.svg" alt="иконка крестика" onClick={handleRemovePoster} className={styles['remove-icon']} />
                </div>
            </div>
        )}
    </div>
}
