import GeoLocation from "react-native-geolocation-service";

export interface GlobalState {
    position: GeoLocation.GeoPosition;
    displayError: boolean;
    isLoading: boolean;
    askForPermission: boolean;
}

export const initialGlobalState = {
    position: undefined,
    displayError: false,
    askForPermission: false,
    isLoading: true
}

export interface State {
    globalReducer: GlobalState;
}