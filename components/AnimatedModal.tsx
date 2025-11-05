import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ModalProps, StyleProp, ViewStyle, Dimensions } from 'react-native';
import Animated, { EntryOrExitLayoutType, FadeIn, runOnJS, SlideInUp, SlideOutUp, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

interface AnimatedModalProps extends ModalProps {
    entering?: EntryOrExitLayoutType;
    exiting?: EntryOrExitLayoutType;
    fade?: boolean;
    position: "top" | "bottom";
    containerStyle?: StyleProp<ViewStyle>;
}

const { height } = Dimensions.get("screen");

const AnimatedModal = (props: AnimatedModalProps) => {

    return (
        <Modal {...props} transparent={true} animationType={props.fade ? 'fade' : 'none'}>
            <Pressable onPress={props.onDismiss}
                style={[
                    styles.wrapper,
                    props.containerStyle,
                    { justifyContent: (props.position === 'bottom' ? "flex-end" : "flex-start") }
                ]}>
                <Animated.View
                    style={[
                        styles.view,
                        { justifyContent: (props.position === 'bottom' ? "flex-end" : "flex-start") }
                    ]}
                    entering={props.entering}
                    exiting={props.exiting}
                    onStartShouldSetResponder={(event) => true}
                    onTouchEnd={e => e.stopPropagation()}
                >
                    {props.children}
                </Animated.View>
            </Pressable>
        </Modal>
    )
}

export default AnimatedModal;

const styles = StyleSheet.create({
    wrapper: {
        height: height,
        width: '100%',
        //justifyContent: 'flex-end'
    },
    view: {
        width: '100%',
    }
})
