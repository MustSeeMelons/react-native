import GeoLocation from "react-native-geolocation-service";
import { IProcessedWeatherData } from "../definitions/storeDefinitions";

export enum GlobalActionTypes {
    SET_POSITION_DATA = "SET_POSITION_DATA",
    SHOW_ERROR = "SHOW_ERROR",
    REFRESH = "REFRESH", // Notify our slide view to do the slide out
    CLEAR_WEATHER = "CLEAR_WEATHER",
    SET_LOADING = "SET_LOADING", // API call in progress flag
    SET_WEATHER = "SET_WEATHER"
}

export interface ISetPositionData {
    type: GlobalActionTypes.SET_POSITION_DATA,
    payload: {
        position: GeoLocation.GeoPosition
    }
};

export const setPositionDataActionCreator = (position: GeoLocation.GeoPosition): ISetPositionData => {
    return {
        type: GlobalActionTypes.SET_POSITION_DATA,
        payload: {
            position
        }
    }
}

export interface IShowError {
    type: GlobalActionTypes.SHOW_ERROR,
    payload: {
        value: boolean
    }
}

export const setErrorActionCreator = (value: boolean): IShowError => {
    return {
        type: GlobalActionTypes.SHOW_ERROR,
        payload: {
            value
        }
    }
}

export interface IClearWeather {
    type: GlobalActionTypes.CLEAR_WEATHER
}

export const clearWeatherActionCreator = (): IClearWeather => {
    return {
        type: GlobalActionTypes.CLEAR_WEATHER
    }
}

export interface ISetLoading {
    type: GlobalActionTypes.SET_LOADING,
    payload: {
        value: boolean
    }
}

export const setLoadingActionCreator = (value: boolean): ISetLoading => {
    return {
        type: GlobalActionTypes.SET_LOADING,
        payload: {
            value
        }
    }
}

export interface ISetWeather {
    type: GlobalActionTypes.SET_WEATHER,
    payload: {
        data: IProcessedWeatherData
    }
}

export const setWeatherDataActionCreator = (data: IProcessedWeatherData): ISetWeather => {
    return {
        type: GlobalActionTypes.SET_WEATHER,
        payload: {
            data
        }
    }
}

export interface IRefresh {
    type: GlobalActionTypes.REFRESH,
    payload: {
        value: boolean
    }
}

export const refreshActionCreator = (value: boolean): IRefresh => {
    return {
        type: GlobalActionTypes.REFRESH,
        payload: {
            value
        }
    }
}
