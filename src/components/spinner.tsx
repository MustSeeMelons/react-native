import React from "react";
import { StyleSheet, ActivityIndicator, View, Dimensions } from "react-native";
import Constants from "expo-constants";

export interface SpinnerProps {
    visible: boolean;
}

var { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: height + Constants.statusBarHeight,
        backgroundColor: "#00000070",
        alignItems: "center",
        justifyContent: "space-around"
    }
})

const Spinner: React.FC<SpinnerProps> = (props) => {
    return (props.visible && <View style={styles.container}>
        <ActivityIndicator color="#349beb" size="large" />
    </View>);
}

export { Spinner }