import Axios, { AxiosRequestConfig } from "axios";
import { FORECAST_API_URL, API_KEY } from "../apiConfig";
import { ForecastData } from "../definitions/apiDefinitions";

const config: AxiosRequestConfig = {
    timeout: 30000
}

export const weatherApi = {
    getForecastData: async (latitude: number, longitude: number): Promise<ForecastData> => {
        const response = await Axios.get(`${FORECAST_API_URL}?lat=${latitude}&lon=${longitude}&appId=${API_KEY}`, config);

        return response.data as ForecastData;
    }
}