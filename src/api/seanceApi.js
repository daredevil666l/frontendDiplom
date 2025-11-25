import axios from "axios";
import { PREFIX } from "../helpers/API";

// API для работы с сеансами
export const seanceApi = {
    // Добавление нового сеанса
    addSeance: async (formData) => {
        const response = await axios.post(`${PREFIX}/seance`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    },
    // Удаление сеанса
    deleteSeance: async (id) => {
        const response = await axios.delete(`${PREFIX}/seance/${id}`);
        return response.data;
    },
};