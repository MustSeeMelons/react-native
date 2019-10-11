import React from "react";
import { Modal, StyleSheet, ActivityIndicator, View } from "react-native";

export interface SpinnerProps {
    visible: boolean;
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#00000040",
        alignItems: "center",
        justifyContent: "space-around"
    }
})

const Spinner: React.FC<SpinnerProps> = (props) => {
    return <Modal transparent={true} visible={props.visible}>
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    </Modal>
}

export { Spinner }