import React, { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native"
import { setLoadingActionCreator, setErrorActionCreator, setWeatherDataActionCreator } from './actions/globalActions';
import { connect } from "react-redux";
import { store } from "./store/store";
import { State, IProcessedWeatherData } from "./definitions/storeDefinitions";
import { Spinner } from "./components/spinner";
import { getLocation } from "./services/locationService";
import { weatherApi } from "./services/apiService";
import { processWeatherData } from "./services/weatherDataService";
import { formatNumber } from "./utils";
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export interface IRootProps {
    isLoading: boolean;
    displayError: boolean;
    data: IProcessedWeatherData;
}

const Root: React.FC<IRootProps> = (props) => {
    useEffect(() => {
        (async () => {
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

        })();
    }, []);

    // TODO make proper components with some style to all if this
    const renderData = () => {
        if (!props.isLoading) {
            const data = props.data;

            const futureTemps = props.data.hourly.map((hourly, index) => {
                return (
                    <Text key={index}>{`${hourly.time}: ${formatNumber(hourly.temp)}`}</Text>
                );
            });

            const tempsByDay = props.data.future.map((future, index) => {
                return (
                    <Text key={index}>{`${future.date}: ${formatNumber(future.minTemp)} => ${formatNumber(future.maxTemp)}`}</Text>
                );
            });

            return (
                <>
                    <Text>{data.city}</Text>
                    <Text>{formatNumber(data.current.currTemp)}</Text>
                    {futureTemps}
                    {tempsByDay}
                </>
            );
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView >
                <Spinner visible={props.isLoading} />
                {renderData()}
                {props.displayError && <Text>Shit hit the fan fam</Text>}
            </ScrollView>
        </View>
    );
}

const mapStateToProps = (state: State) => {
    return {
        isLoading: state.globalReducer.isLoading,
        displayError: state.globalReducer.displayError,
        data: state.globalReducer.processedWeatherData
    }
}

const ConnectedRoot = connect(mapStateToProps)(Root);

export { ConnectedRoot as Root };
