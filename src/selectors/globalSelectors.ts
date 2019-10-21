import { State } from "../definitions/storeDefinitions";

export const isWeatherDataLoaded = (state: State) => {
    return state.globalReducer.processedWeatherData !== null;
}