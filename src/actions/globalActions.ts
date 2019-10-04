import GeoLocation from "react-native-geolocation-service";

export enum GlobalActionTypes {
    SET_POSITION_DATA = "SET_POSITION_DATA",
    SHOW_ERROR = "SHOW_ERROR",
    ASK_FOR_PERMISSION = "ASK_FOR_PERMISSION",
    SET_LOADING = "SET_LOADING"
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

export interface IAskForPermission {
    type: GlobalActionTypes.ASK_FOR_PERMISSION,
    payload: {
        value: boolean
    }
}

export const askForPermissionActionCreator = (value: boolean): IAskForPermission => {
    return {
        type: GlobalActionTypes.ASK_FOR_PERMISSION,
        payload: {
            value
        }
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

