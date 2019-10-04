import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native"
import { setLoadingActionCreator, setErrorActionCreator } from './actions/globalActions';
import { connect } from "react-redux";
import { store } from "./store/store";
import { State } from "./definitions/storeDefinitions";
import { Spinner } from "./components/spinner";
import { checkLocationPermission } from "./services/permissionService";
import { getLocation } from "./services/locationService";
import { weatherApi } from "./services/apiService";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export interface IRootProps {
    isLoading: boolean;
    displayError: boolean;
}

const Root: React.FC<IRootProps> = (props) => {

    // Check if we have permission
    // Ask for permission, if not
    // Show it to the mate

    useEffect(() => {
        (async () => {
            try {
                // TODO looks like this is not needed?
                // await checkLocationPermission();

                const position: Position = await getLocation();

                const weatherData = await weatherApi.getForecastData(
                    position.coords.latitude,
                    position.coords.longitude
                );

                console.log(weatherData);

                store.dispatch(setLoadingActionCreator(false));
            } catch (e) {
                console.warn(e);
                store.dispatch(setErrorActionCreator(true));
            }

        })();
    }, []);

    return (
        <View style={styles.container}>
            <Spinner visible={props.isLoading} />
            <Text>Hello mister.</Text>
            {props.displayError && <Text>Shit hit the fan fam</Text>}
        </View>
    );
}

const mapStateToProps = (state: State) => {
    return {
        isLoading: state.globalReducer.isLoading,
        displayError: state.globalReducer.displayError
    }
}

const ConnectedRoot = connect(mapStateToProps)(Root);

export { ConnectedRoot as Root };
