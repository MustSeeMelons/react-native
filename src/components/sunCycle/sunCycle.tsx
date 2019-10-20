import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Feather } from "expo-vector-icons";
import { SlideView } from "../animated/slideView";
import { SlideViewType } from "../../definitions";

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#ffffff30",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    timeText: {
        color: "#ffffff",
        fontSize: 16,
    },
    cycleContainer: {
        padding: 15,
        justifyContent: "center",
        alignItems: "center"
    }
});

export interface SunCycleProps {
    sunrise: string;
    sunset: string;
}

const SunCycle: React.FC<SunCycleProps> = (props) => {
    return (
        <SlideView slideType={SlideViewType.BOTTOM} style={styles.container}>
            <View style={styles.cycleContainer}>
                <Feather name="sunrise" size={42} color="white" />
                <Text style={styles.timeText}>{props.sunrise}</Text>
            </View>
            <View style={styles.cycleContainer}>
                <Feather name="sunset" size={42} color="white" />
                <Text style={styles.timeText}>{props.sunset}</Text>
            </View>
        </SlideView>
    );
};

export { SunCycle };