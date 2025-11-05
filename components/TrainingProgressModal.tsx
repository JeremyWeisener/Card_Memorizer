import { Modal, ModalProps, Pressable, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/context/themeContext";

interface TrainingProgressModalProps extends ModalProps { }

const TrainingProgressModal = (props: TrainingProgressModalProps) => {
    const { primary, secondary } = useContext(ThemeContext);

    const [show, setShow] = useState(false);

    return (
        <>
            <View style={[styles.open]}>
                <Pressable style={[styles.arrow, styles.up]} onPress={() => setShow(true)} />
            </View>
            <Modal visible={show} transparent={true} animationType="slide" {...props}>
                <View style={[styles.backDrop]}>
                    <View
                        style={[
                            styles.drawer,
                            { backgroundColor: primary, borderColor: secondary, borderBottomColor: primary },
                        ]}
                    >
                        <Pressable style={[styles.arrow, styles.down]} onPress={() => setShow(false)} />
                        <View style={[styles.drawerContent, { backgroundColor: `${secondary}50` }]}>
                            {props.children}
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default TrainingProgressModal;

const styles = StyleSheet.create({
    open: {
        width: "100%",
        height: 40,
    },
    arrow: {
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderTopLeftRadius: 5,
        borderTopColor: "white",
        borderLeftColor: "white",
        height: 36,
        width: 36,
        marginHorizontal: "auto",
    },
    up: {
        transform: "rotate(45deg)",
        marginTop: 10,
    },
    down: {
        transform: "rotate(-135deg)",
        marginTop: 0,
    },
    backDrop: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
    },
    drawer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        height: "45%",
        flexDirection: "column",
    },
    drawerContent: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 25,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 10,
    },
});
