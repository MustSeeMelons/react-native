import * as Permissions from 'expo-permissions';
import _ from "lodash";
import { store } from '../store/store';
import { setErrorActionCreator } from '../actions/globalActions';

export const checkLocationPermission = async () => {
    try {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        console.log(result);
        // TODO: Is this enough, does it even work?
        if (result.status === "granted" || _.get(result, "permissions.location")) {
            return true;
        } else {
            store.dispatch(setErrorActionCreator(true));
            return false;
        }
    } catch (err) {
        store.dispatch(setErrorActionCreator(true));
        return false;
    }
}