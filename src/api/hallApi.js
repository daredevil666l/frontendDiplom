import axios from "axios";
import { PREFIX } from "../helpers/API";

// API для работы с залами
export const hallApi = {
    // Удаление зала
    deleteHall: async (id) => {
        const response = await axios.delete(`${PREFIX}/hall/${id}`);
        return response.data;
    },

    // Создание нового зала
    addHall: async (hallName) => {
        const response = await axios.post(`${PREFIX}/hall`, {
            hallName: hallName
        });
        return response.data;
    },

    // Конфигурация зала (размеры, места)
    configHall: async (params) => {
        const response = await axios.post(
            `${PREFIX}/hall/${params.hallId}`,
            params.formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        );
        return response.data;
    },

    // Настройка цен для зала
    configPrice: async (params) => {
        const response = await axios.post(
            `${PREFIX}/price/${params.hallId}`,
            params.formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    },

    // Открытие зала для продаж
    openHall: async (params) => {
        const response = await axios.post(
            `${PREFIX}/open/${params.hallId}`,
            params.formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        return response.data
    },

    // Получение конфигурации зала для конкретного сеанса
    getConfigHall: async (params) => {
        const response = await axios.get(
            `${PREFIX}/hallconfig?seanceId=${params.seanceId}&date=${params.date}`
        )
        return response.data
    },

    // Покупка билетов
    buyTickets: async (params) => {
        const response = await axios.post(`${PREFIX}/ticket`,
            {
                seanceId: params.seanceId,
                ticketDate: params.ticketDate,
                tickets: JSON.stringify(params.tickets)
            }
        )
        return response
    }
};