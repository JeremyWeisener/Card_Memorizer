import React, { FC, ReactNode } from "react";
import { Dimensions, StyleProp, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    AnimatedStyle,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

interface WipeProps {
    threshold?: number;
    onThreshold: (direction: "left" | "right") => void;
    children: ReactNode;
    style: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

export const Wipe: FC<WipeProps> = ({ children, threshold = 100, onThreshold, style }) => {
    const translationX = useSharedValue(0);

    const TRANSLATE_X_LIMIT = 200;

    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    const childrenArray = React.Children.toArray(children);
    const firstChild = childrenArray[0];
    const secondChild = childrenArray[1];

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            if (translationX.value > 0) {
                return;
            }
            translationX.value = event.translationX;
        })
        .onEnd((event) => {
            const swipeDistance = event.translationX;

            if (swipeDistance <= threshold) {
                const direction: "left" | "right" = swipeDistance > 0 ? "right" : "left";
                runOnJS(onThreshold)(direction);
                translationX.value = 0;
            }

            translationX.value = withSpring(0, {
                damping: 100,
                stiffness: 150,
            });
        })
        .onTouchesCancelled(() => {
            translationX.value = withSpring(0);
        });

    const firstChildAnimatedStyle = useAnimatedStyle(() => {
        if (translationX.value > 0) {
            return {};
        }
        return {
            transform: [{ translateX: translationX.value }, { rotateZ: `${translationX.value / 15}deg` }],
            opacity: translationX.value < 0 ? 1 - (translationX.value * -1) / 3 / 125 : 1,
        };
    });

    const secondChildAnimatedStyle = useAnimatedStyle(() => {
        if (translationX.value > 0) {
            return {};
        }
        return {
            transform: [
                { translateX: screenWidth * 0.75 + translationX.value },
                { translateY: -(screenHeight * 0.27) + translationX.value / 10 },
                { rotateZ: `${translationX.value / 10 + 30}deg` },
            ],
            opacity: (translationX.value * -1) / 3 / 125,
        };
    });

    return (
        <View style={{ flex: 1, margin: "10%", marginTop: "-5%" }}>
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[{ flex: 1, opacity: 1 }, firstChildAnimatedStyle, style]}>
                    {firstChild}
                </Animated.View>
            </GestureDetector>
            <Animated.View
                style={[
                    {
                        flex: 1,
                        opacity: 0,
                        transform: [{ rotateZ: "30deg" }, { translateY: "-27%" }, { translateX: "75%" }],
                    },
                    secondChildAnimatedStyle,
                    style,
                ]}
            >
                {secondChild}
            </Animated.View>
        </View>
    );
};
