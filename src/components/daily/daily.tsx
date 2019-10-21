import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { formatNumber, getDayName, remapNumberRange, getApiWeatherIcon } from "../../utils";
import { SlideView } from "../animated/slideView";
import { SlideViewType } from "../../definitions";
import { Ionicons } from "expo-vector-icons";

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#ffffff30"
    },
    dayContainer: {
        alignItems: "center",
        margin: 15
    },
    dateText: {
        color: "#ffffff",
        fontSize: 16,
    },
    tempText: {
        color: "#ffffff",
        fontSize: 16,
    },
    textBarContainer: {
        flexGrow: 0
    },
    tempratureBar: {
        alignItems: "center",
        margin: 2
    },
    spaceContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 50,
        height: 50
    },
    iconDivider: {
        position: "absolute",
        left: 25,
        width: 3,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#ffffff70",
        transform: [{
            rotate: "45deg"
        }]
    },
    dayIcon: {
        margin: 5,
        alignSelf: "flex-start"
    },
    nightIcon: {
        margin: 5,
        alignSelf: "flex-end"
    }
});

export interface DailyProps {
    data: {
        date: number;
        weekDay: number;
        minTemp: number;
        maxTemp: number;
        icon: {
            day: string;
            night: string;
        }
    }[]
}

const Daily: React.FC<DailyProps> = (props) => {

    const maxTemp = props.data.reduce((acc, curr) => {
        if (curr.maxTemp > acc) {
            return curr.maxTemp;
        }

        return acc;
    }, 0);

    const minTemp = props.data.reduce((acc, curr) => {
        if (curr.minTemp < acc) {
            return curr.minTemp;
        }

        return acc;
    }, Number.MAX_VALUE);

    const rangeMapper = remapNumberRange(minTemp, maxTemp, 0, 50);

    const barOpts = props.data.map((data) => {
        const offset = rangeMapper(data.minTemp);
        return {
            height: rangeMapper(data.maxTemp), // - offset,
            offset: offset // Not used, could be used if would want make the bar offset from the bottom
        }
    });

    return (
        <SlideView slideType={SlideViewType.LEFT} style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {props.data.map((data, index) => {
                    return (
                        <View key={index} style={{
                            ...styles.dayContainer
                        }}>
                            <Text style={styles.dateText}>{getDayName(data.weekDay)}</Text>
                            <View style={styles.iconContainer}>
                                <Ionicons style={styles.dayIcon} size={20} name={getApiWeatherIcon(data.icon.day)} color="white" />
                                <View style={styles.iconDivider} />
                                <Ionicons style={styles.nightIcon} size={20} name={getApiWeatherIcon(data.icon.night)} color="white" />
                            </View>
                            <View style={styles.spaceContainer}>
                                <View style={styles.textBarContainer}>
                                    <Text style={styles.tempText}>{formatNumber(data.maxTemp)} &deg;C</Text>
                                    <View style={styles.tempratureBar}>
                                        <View style={{
                                            height: barOpts[index].height,
                                            width: 5,
                                            borderRadius: 50,
                                            backgroundColor: "#ffffff70"
                                        }} />
                                    </View>
                                    <Text style={styles.tempText}>{formatNumber(data.minTemp)} &deg;C</Text>
                                </View>
                            </View>

                        </View>
                    );
                })}
            </ScrollView>
        </SlideView>
    );
}

export { Daily };