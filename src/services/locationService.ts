import { store } from "../store/store";
import { setErrorActionCreator } from "../actions/globalActions";

export const getLocation = async (): Promise<Position> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position: Position) => {
                console.log("POSITIONS:");
                console.log(position);
                return resolve(position);
            },
            (error: PositionError) => {
                console.warn("POSITION ERROR");
                console.warn(error);
                reject(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    });
}