import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";
import { SlideView } from "../animated/slideView";
import { SlideViewType } from "../../definitions";

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: Constants.statusBarHeight / 2,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#ff6745",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    msgWrap: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    msgText: {
        flexGrow: 1,
        fontSize: 28,
        fontWeight: "300",
        color: "#ffffff"
    }
});

export interface ErrorMessageProps {
    displayError: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
    return (
        props.displayError && <SlideView slideType={SlideViewType.TOP} style={styles.container}>
            <View style={styles.msgWrap}>
                <Text style={styles.msgText}>Not great, not terrible</Text>
            </View>
        </SlideView> || null
    );
}