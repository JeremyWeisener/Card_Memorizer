import { StyleSheet, Text, View, ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    AnimatedStyle,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import React from "react";

interface PullFlickProps extends ViewProps {
    onPull: () => void;
    onFlick: () => void;
}

const PullFlick = (props: PullFlickProps) => {
    const translationY = useSharedValue(0);

    const TRANSLATE_Y_LIMIT = 250;

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translationY.value = event.translationY * 1.7;
        })
        .onEnd((event) => {
            if (Math.abs(translationY.value) > TRANSLATE_Y_LIMIT) {
                const direction = translationY.value > 0 ? "Down" : "Up";
                if (direction === "Up") {
                    runOnJS(props.onFlick)();
                } else {
                    runOnJS(props.onPull)();
                }
            }

            translationY.value = withSpring(0);
        })
        .onTouchesCancelled((event) => {
            translationY.value = withSpring(0);
        });

    const swipeVeritcalAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translationY.value }],
            opacity: 1 - Math.abs(translationY.value) / 400,
        };
    });

    return (
        <View style={[styles.wrapper]}>
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[swipeVeritcalAnimatedStyle]}>{props.children}</Animated.View>
            </GestureDetector>
        </View>
    );
};

export default PullFlick;

const styles = StyleSheet.create({
    wrapper: {
        height: "100%",
        width: "100%",
    },
});
