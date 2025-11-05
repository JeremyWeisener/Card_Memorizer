import React from 'react';
import { View, Text, StyleSheet, Pressable, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

interface OutlineButtonProps extends PressableProps {
    text: string;
    color: string;
    outlineWidth?: number | string;
    backgroundColor?: string;
    fontSize?: number | string;
    textStyle?: StyleProp<TextStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
}

const OutlineButton = (props: OutlineButtonProps) => {

    return (
        <Pressable
            {...props}
            style={({ pressed }) => [
                styles.button,
                { borderColor: props.color },
                props.buttonStyle,
                pressed ? { ...styles.activeButton, backgroundColor: props.color } : {}]}
            onPress={props.onPress}>
            {({ pressed }) => (
                <Text style={[
                    { color: props.color },
                    styles.text,
                    props.textStyle,
                    pressed ? { ...styles.activeText, color: 'rgba(0,0,0,0)' } : {}
                ]}>
                    {props.text}
                </Text>
            )}
        </Pressable>
    )
}

export default OutlineButton

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        borderRadius: 30,
        backgroundColor: 'rgba(0,0,0,0)',
        paddingVertical: 'auto'
    },
    activeButton: {

    },
    text: {
        textAlign: 'center',
        fontSize: 24,
    },
    activeText: {

    }
})
