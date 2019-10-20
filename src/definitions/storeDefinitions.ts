import GeoLocation from "react-native-geolocation-service";
import { Direction } from "../utils";

export interface IProcessedWeatherData {
    city?: string;
    timestamp: Date; // Update time
    current?: {
        currTemp: number;
        sunrise: string;
        sunset: string;
        description: string;
        wind: {
            dir: Direction;
            speed: number;
        }
    },
    hourly: {
        temp: number;
        time: string; // Time of the day
        icon: string;
        wind: {
            dir: Direction;
            speed: number;
        }
    }[],
    future?: {
        date: number;
        weekDay: number;
        minTemp: number;
        maxTemp: number;
        icon: string;
        recCount: number; // How many data points were used
        wind: {
            dir: Direction;
            speed: number;
        }
    }[];
}

export interface GlobalState {
    position: GeoLocation.GeoPosition;
    displayError: boolean;
    isLoading: boolean;
    processedWeatherData: IProcessedWeatherData;
    isRefreshing: boolean;
}

export const initialGlobalState = {
    position: undefined,
    displayError: false,
    askForPermission: false,
    isLoading: true,
    processedWeatherData: null,
    isRefreshing: false
}

export interface State {
    globalReducer: GlobalState;
}