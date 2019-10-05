import GeoLocation from "react-native-geolocation-service";

export interface IProcessedWeatherData {
    city?: string;
    current?: {
        currTemp: number;
    },
    hourly: {
        temp: number;
        time: string; // Time of the day
    }[],
    future?: {
        date: number;
        minTemp: number;
        maxTemp: number;
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