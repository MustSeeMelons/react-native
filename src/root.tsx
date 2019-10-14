import React, { useEffect } from "react";
import { StyleSheet, View, Text, StatusBar, ScrollView } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { setLoadingActionCreator, setErrorActionCreator, setWeatherDataActionCreator } from './actions/globalActions';
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
// import { ScrollView } from "react-navigation";

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-around",
    }
});

export interface IRootProps {
    isLoading: boolean;
    displayError: boolean;
    data: IProcessedWeatherData;
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
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.rootView}>
            <LinearGradient
                style={{
                    flexGrow: 1
                }}
                colors={["#5281cc", "#78a4eb", "#349beb"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }
                }
            >
                <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
                <ScrollView>
                    <Spinner visible={props.isLoading} />
                    {!props.isLoading && <>
                        <Header
                            city={props.data.city}
                            temp={props.data.current.currTemp}
                            timestamp={props.data.timestamp}
                            description={props.data.current.description}
                        />
                        <Hours data={props.data.hourly} />
                        <Daily data={props.data.future} />
                        <SunCycle
                            sunrise={props.data.current.sunrise}
                            sunset={props.data.current.sunset}
                        />
                    </>}
                    {/* Make err component */}
                    {props.displayError && <Text>Shit hit the fan fam</Text>}
                </ScrollView>
            </LinearGradient>
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

// Type hack
(ConnectedRoot as any).navigationOptions = {

} as NavigationStackOptions;

export { ConnectedRoot as Root };
