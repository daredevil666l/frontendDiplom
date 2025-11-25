import axios from "axios";
import { PREFIX } from "../helpers/API";

// API для получения всех данных
export const allDataApi = {
    // Метод получения всех данных (залы, фильмы, сеансы)
    getAllData: async () => {
        const response = await axios.get(`${PREFIX}/alldata`);
        return response.data;
    }
}