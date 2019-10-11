import GeoLocation from "react-native-geolocation-service";

export interface IProcessedWeatherData {
    city?: string;
    timestamp: Date; // Update time
    current?: {
        currTemp: number;
        sunrise: number;
        sunset: number;
    },
    hourly: {
        temp: number;
        time: string; // Time of the day
        icon: string;
    }[],
    future?: {
        date: number;
        weekDay: number;
        minTemp: number;
        maxTemp: number;
        icon: string;
        recCount: number; // How many data points were used
    }[];
}

export interface GlobalState {
    position: GeoLocation.GeoPosition;
    displayError: boolean;
    isLoading: boolean;
    askForPermission: boolean;
    processedWeatherData: IProcessedWeatherData;
}

export const initialGlobalState = {
    position: undefined,
    displayError: false,
    askForPermission: false,
    isLoading: true,
    processedWeatherData: null
}

export interface State {
    globalReducer: GlobalState;
}