import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ModalProps, Modal, Dimensions, Pressable, TextInput } from 'react-native';
import Animated, { FadeIn, runOnJS, SlideInUp, SlideOutUp, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import OutlineButton from './OutlineButton';
import { ThemeContext } from '@/context/themeContext';
import CardTemplate from './CardTemplate';

interface RenameModalProps extends ModalProps {
    header?: React.ReactNode;
    onSubmit: (s: string) => void;
    value: string | undefined,
}

const RenameModal = (props: RenameModalProps) => {

    const { primary, secondary } = useContext(ThemeContext);

    const textInputRef = useRef<TextInput>(null);

    const [value, setValue] = useState(props.value);

    const submit = () => {
        value && props.onSubmit(value);
        props.onDismiss && props.onDismiss();
    }

    useEffect(() => {
        setValue(props.value);
    }, [props.value])

    useEffect(() => {
        if (props.visible == false) { return () => { } }
        const timer = setTimeout(() => {
            textInputRef?.current?.focus();
        }, 100);
        return () => clearTimeout(timer);
    }, [props.visible]);

    return (
        <Modal transparent={true} {...props} visible={props.visible} animationType="none">
            <Pressable onPress={props.onDismiss} style={[{ "backgroundColor": "rgba(0,0,0,0.3)" }]}>
                <Animated.View style={[
                    styles.wrapper,
                ]} entering={SlideInUp} exiting={SlideOutUp}>
                    <View style={[styles.body, { borderColor: secondary, backgroundColor: primary }]}>
                        <View style={[styles.content]}>
                            {props.header}
                            <TextInput
                                ref={textInputRef}
                                style={[styles.input, { color: secondary, borderColor: secondary }]}
                                value={value}
                                onChangeText={(text) => setValue(text)}
                                onSubmitEditing={submit}
                                keyboardType="default"
                            />
                            <OutlineButton
                                text="Rename"
                                color="white"
                                onPress={submit}
                                buttonStyle={[
                                    styles.button,
                                ]} />
                        </View>
                    </View>
                </Animated.View>
            </Pressable>
        </Modal>
    )
}

export default RenameModal;

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        width: '100%',

    },
    body: {
        height: 'auto',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        justifyContent: 'flex-end',
        overflow: 'hidden',
        paddingTop: '15%',
    },
    content: {
        padding: 10,
    },
    input: {
        borderWidth: 1,
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        borderRadius: 10,
    },
    button: {
        marginBottom: 10,
        paddingVertical: 10,
        marginHorizontal: '10%'
    }
})
