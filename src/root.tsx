import React, { useEffect, useState, useCallback } from "react";
import { View, RefreshControl } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { setLoadingActionCreator, setErrorActionCreator, setWeatherDataActionCreator, clearWeatherActionCreator, IClearWeather } from './actions/globalActions';
import { connect } from "react-redux";
import { store } from "./store/store";
import { State, IProcessedWeatherData } from "./definitions/storeDefinitions";
import { Spinner } from "./components/spinner";
import { getLocation } from "./services/locationService";
import { weatherApi } from "./services/apiService";
import { processWeatherData } from "./services/weatherDataService";
import { Header } from "./components/header/header";
import { Hours } from "./components/hours/hours";
import { Daily } from "./components/daily/daily";
import { SunCycle } from "./components/sunCycle/sunCycle";
import { NavigationStackOptions } from 'react-navigation-stack';
import { ScrollView } from "react-navigation";
import Constants from "expo-constants";
import { ErrorMessage } from "./components/error/error";
import { isWeatherDataLoaded } from "./selectors/globalSelectors";
import { Dispatch } from "redux";

export interface IRootProps {
    isLoading: boolean;
    displayError: boolean;
    data: IProcessedWeatherData;
    isWeatherDataLoaded: boolean;
    clear: () => void;
}

const fetchData = async () => {
    try {
        const position: Position = await getLocation();

        const weatherData = await weatherApi.getForecastData(
            position.coords.latitude,
            position.coords.longitude
        );

        const data = processWeatherData(weatherData);

        store.dispatch(setWeatherDataActionCreator(data));
        store.dispatch(setLoadingActionCreator(false));
    } catch (e) {
        console.warn(e);
        store.dispatch(setErrorActionCreator(true));
    }
};

const Root: React.FC<IRootProps> = (props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    // useCallback - lock multiple refreshes from happening
    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        props.clear();

        await fetchData();

        setIsRefreshing(false);
    }, [isRefreshing]);

    return (
        <LinearGradient
            style={{
                flexGrow: 1
            }}
            colors={["#5281cc", "#78a4eb", "#349beb"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }
            }
        >
            <Spinner visible={props.isLoading} />
            <ErrorMessage displayError={props.displayError} />
            <View style={{
                flexGrow: 1,
                paddingTop: Constants.statusBarHeight
            }}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        colors={["#349beb", "#349beb"]}
                        size={1} />
                }>
                    {props.isWeatherDataLoaded && <>
                        <Header
                            city={props.data.city}
                            temp={props.data.current.currTemp}
                            timestamp={props.data.timestamp}
                            description={props.data.current.description}
                            wind={props.data.current.wind}
                        />
                        <Hours data={props.data.hourly} />
                        <Daily data={props.data.future} />
                        <SunCycle
                            sunrise={props.data.current.sunrise}
                            sunset={props.data.current.sunset}
                        />
                    </>}
                </ScrollView>
            </View>
        </LinearGradient>
    );
}

const mapStateToProps = (state: State) => {
    return {
        isLoading: state.globalReducer.isLoading,
        displayError: state.globalReducer.displayError,
        data: state.globalReducer.processedWeatherData,
        isWeatherDataLoaded: isWeatherDataLoaded(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        clear: () => { dispatch(clearWeatherActionCreator()) }
    }
}

const ConnectedRoot = connect(mapStateToProps, mapDispatchToProps)(Root);

// Type hack, if wee need it
(ConnectedRoot as any).navigationOptions = {

} as NavigationStackOptions;

export { ConnectedRoot as Root };
