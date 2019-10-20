import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack';
import { store } from './src/store/store';
import { Root } from './src/root';
import { createAppContainer } from 'react-navigation';
import { StatusBar } from 'react-native';

// Create stack navigator for all our screens
const StackNavigator = createStackNavigator({
    root: Root
}, {
        initialRouteName: "root",
        headerMode: "none"
    });

// TODO: No need for navigation, if status bar doesnt work
// Create a container for our navigator
const AppContainer = createAppContainer(StackNavigator);

// Wrap it with our redux provider
export default () => {
    return (
        <Provider store={store}>
            <StatusBar translucent backgroundColor="transparent" />
            <AppContainer />
        </Provider>
    );
};