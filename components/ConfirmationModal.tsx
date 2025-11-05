import React, { useContext } from "react";
import { Modal, ModalProps, Pressable, StyleSheet, View } from "react-native";
import OutlineButton from "./OutlineButton";
import { ThemeContext } from "@/context/themeContext";
import AnimatedModal from "./AnimatedModal";
import { SlideInDown, SlideOutDown } from "react-native-reanimated";

interface ConfirmationModalProps extends ModalProps {
    dismissText: string;
    headerText?: string;
    onConfirm: () => void;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {

    const { primary, secondary } = useContext(ThemeContext);

    const submit = () => {
        props.onConfirm();
        props.onDismiss && props.onDismiss()
    }

    return (
        <AnimatedModal {...props} position="bottom" entering={SlideInDown} exiting={SlideOutDown} fade containerStyle={[{ backgroundColor: 'rgba(0,0,0,0.3)' }]}>
            <View style={[styles.body, { borderColor: secondary, backgroundColor: primary }]}>
                <View style={[styles.content]}>
                    <OutlineButton
                        text="Delete"
                        color="red"
                        onPress={submit}
                        outlineWidth={2}
                        backgroundColor="rgba(0,0,0,0)"
                        buttonStyle={[{ paddingVertical: 6 }]}
                    />
                </View>
            </View>
        </AnimatedModal>

    );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'flex-end',
        height: '100%',
        width: '100%',
    },
    header: {},
    body: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingTop: 10,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
    },
    content: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        padding: 20,
        paddingBottom: 80,
    },
    button: {
        paddingHorizontal: 'auto',
        paddingVertical: 10,
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 2,
        borderRadius: 30,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 26,
    }
});
