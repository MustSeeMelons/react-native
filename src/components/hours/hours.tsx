import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Ionicons } from "expo-vector-icons";
import { formatNumber, getApiWeatherIcon } from "../../utils";
import { SlideView } from "../animated/slideView";
import { SlideViewType } from "../../definitions";

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#ffffff30"
    },
    hourContainer: {
        margin: 15,
        alignItems: "center"
    },
    timeText: {
        color: "#ffffff",
        fontSize: 16,
    },
    tempText: {
        color: "#ffffff",
        fontSize: 16,
    },
    tempBar: {
        height: 50,
        justifyContent: "flex-end",
        marginBottom: 10,
        marginTop: 5
    }
});

export interface HoursProps {
    data: {
        time: string;
        temp: number;
        icon: string;
    }[]
}

const Hours: React.FC<HoursProps> = (props) => {

    const maxTemp = props.data.reduce((acc, curr) => {
        if (curr.temp > acc) {
            return curr.temp;
        }

        return acc;
    }, 0);

    const barHeigts = props.data.map((data) => {
        return (data.temp * 50) / maxTemp
    });

    return (
        <SlideView slideType={SlideViewType.RIGHT} style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {props.data.map((data, index) => {
                    return (
                        <View key={index} style={styles.hourContainer}>
                            <Ionicons name={getApiWeatherIcon(data.icon)} size={32} color="white" />
                            <Text style={styles.timeText}>{data.time}</Text>
                            <View style={styles.tempBar}>
                                <View style={{
                                    height: barHeigts[index],
                                    width: 5,
                                    borderRadius: 50,
                                    backgroundColor: "#ffffff70"
                                }} />
                            </View>
                            <Text style={styles.tempText}>{formatNumber(data.temp)} &deg;C</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </SlideView>
    );
}

export { Hours };