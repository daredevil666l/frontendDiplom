import axios from "axios";
import { PREFIX } from "../helpers/API";

// API для работы с фильмами
export const filmApi = {
    // Добавление нового фильма
    addFilm: async (formData) => {
        const response = await axios.post(`${PREFIX}/film`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    },
    // Удаление фильма по ID
    deleteFilm: async (id) => {
        const response = await axios.delete(`${PREFIX}/film/${id}`);
        return response.data;
    },
};