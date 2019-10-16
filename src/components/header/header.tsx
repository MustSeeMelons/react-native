import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { formatNumber, Direction } from "../../utils";
import moment from "moment";

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#ffffff10",
        alignItems: "center"
    },
    tempStyle: {
        fontSize: 38,
        fontWeight: "600",
        color: "#ffffff",
    },
    cityStyle: {
        fontSize: 34,
        fontWeight: "300",
        color: "#ffffff",
    },
    dateStyle: {
        fontSize: 20,
        fontWeight: "400",
        color: "#ffffff",
    },
    descriptionStyle: {
        fontSize: 16,
        fontWeight: "400",
        color: "#ffffff",
    },
    windStyle: {
        fontSize: 14,
        color: "#ffffff",
        fontWeight: "300"
    }
});

export interface HeaderProps {
    city: string;
    temp: number;
    timestamp: Date;
    description: string;
    wind: {
        dir: Direction;
        speed: number;
    }
}

const Header: React.FC<HeaderProps> = (props) => {
    const [currTime, setCurrtime] = useState(moment());

    /*
        We are updating too much, every minute would be ideal, 
        but then extra calculation are needed for the first update
    */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrtime(moment());
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.cityStyle}>{props.city}</Text>
            <Text style={styles.dateStyle}>{currTime.format("MMM Do, HH:mm")}</Text>
            <Text style={styles.descriptionStyle}>{props.description}</Text>
            <Text style={styles.tempStyle}>{formatNumber(props.temp)} &deg;C</Text>
            <Text style={styles.windStyle}>{`${props.wind.dir}, ${formatNumber(props.wind.speed)}m/s`}</Text>
        </View>
    );
}

export { Header };