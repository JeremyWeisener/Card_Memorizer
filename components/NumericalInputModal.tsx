import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { Modal, ModalProps, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import OutlineButton from "./OutlineButton";
import { ThemeContext } from "@/context/themeContext";

interface NumericalInputModalProps extends ModalProps {
    header?: string;
    actionText?: string;
    dismissText?: string;
    value?: string;
    placeholder?: string;
    onAction: (v: any) => void;
}

const NumericalInputModal = (props: NumericalInputModalProps) => {
    const { primary, secondary } = useContext(ThemeContext)

    const textInputRef = useRef<TextInput>(null);

    const [inputValue, setInputValue] = useState<string | undefined>(props.value);
    useEffect(() => setInputValue(props.value), [props.value]);
    useEffect(() => {
        const timer = setTimeout(() => {
            textInputRef.current?.focus();
        }, 200);
        return () => clearTimeout(timer);
    }, []);


    const handleSubmit = () => {
        let value = inputValue ? parseInt(inputValue) : 5;
        props.onAction && props.onAction(value);
        props.onDismiss && props.onDismiss();
    };

    return (
        <Modal visible={true} transparent={true} animationType={"slide"} {...props}>
            <View style={styles.wrapper}>
                <View style={[styles.modal, { backgroundColor: primary, borderColor: secondary }]}>
                    <View style={[styles.headerContainer, { borderColor: secondary }]}>
                        <Text style={[styles.header, { color: secondary }]}>
                            {props.header || "Number Input Modal"}
                        </Text>
                    </View>
                    <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
                        <TextInput
                            ref={textInputRef}
                            keyboardType={"numeric"}
                            value={inputValue}
                            onSubmitEditing={handleSubmit}
                            onChangeText={(v) => {
                                setInputValue(v.replace(/[^0-9]/g, ""));
                            }}
                            style={[styles.textInput, { color: secondary, borderColor: secondary }]}
                            placeholder={props.placeholder ? props.placeholder : ""}
                        />
                    </View>
                    <View style={[styles.buttonsContainer, { borderColor: secondary }]}>
                        <OutlineButton
                            text={props.actionText || "Start"}
                            onPress={handleSubmit}
                            color={secondary}
                            buttonStyle={[styles.button]}
                            textStyle={[styles.buttonText]}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default memo(NumericalInputModal);

const styles = StyleSheet.create({
    wrapper: {
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.25)",
    },
    modal: {
        width: "80%",
        height: "auto",
        marginHorizontal: "auto",
        marginTop: "66%",
        borderWidth: 2,
        borderRadius: 15,
        overflow: "hidden",
        flexDirection: "column",

        // padding: 6,
    },
    header: {
        fontSize: 26,
        margin: 10,
    },
    headerContainer: {
        borderBottomWidth: 2,
    },
    textInput: {
        fontSize: 20,
        borderWidth: 1,
        marginHorizontal: 6,
        marginVertical: 6,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    button: {
        width: "100%",
        paddingVertical: 15,
        borderWidth: 0,
        borderRadius: 0,
    },
    buttonText: {
        fontSize: 20,
        marginHorizontal: "auto",
    },
    buttonsContainer: {
        flexDirection: "row",
        borderTopWidth: 2,
    },
});
