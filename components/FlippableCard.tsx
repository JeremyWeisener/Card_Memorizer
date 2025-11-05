import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

const FlippableCard = ({
    frontComponent,
    backComponent,
    flipped,
    flipDuration,
    onPress,
    style,
}: {
    frontComponent: React.ReactNode;
    backComponent: React.ReactNode;
    flipped: boolean;
    flipDuration: number;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}) => {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setTimeout(() => animation.setValue(!flipped ? 0 : 180), flipDuration);

        Animated.timing(animation, {
            toValue: !flipped ? 0 : 180, // Animate from 0 to 180 degrees
            duration: flipDuration,
            useNativeDriver: true,
        }).start();
    }, [flipped, animation, flipDuration]);

    const handleCardFlip = () => {
        onPress();
    };

    const frontInterpolate = animation.interpolate({
        inputRange: [0, 90, 180],
        outputRange: ["0deg", "90deg", "180deg"],
    });

    const backInterpolate = animation.interpolate({
        inputRange: [0, 90, 180],
        outputRange: ["180deg", "90deg", "0deg"],
    });

    const frontAnimatedStyle = {
        transform: [{ rotateY: frontInterpolate }],
    };

    const backAnimatedStyle = {
        transform: [{ rotateY: backInterpolate }],
    };

    return (
        <TouchableOpacity onPress={handleCardFlip} style={[styles.touchableCard, style, { perspective: 1000 }]}>
            <Animated.View style={[styles.cardFace, frontAnimatedStyle]}>{frontComponent}</Animated.View>
            <Animated.View style={[styles.cardFace, backAnimatedStyle]}>{backComponent}</Animated.View>
        </TouchableOpacity>
    );
};

export default FlippableCard;

const styles = StyleSheet.create({
    touchableCard: {
        height: "100%",
        width: "100%",
        aspectRatio: 1 / 1.43,
        marginHorizontal: "auto",
    },
    cardFace: {
        ...StyleSheet.absoluteFillObject, // Stacks the front and back on top of each other
        backfaceVisibility: "hidden", // Hides the back side of the card during the flip
        justifyContent: "center",
        alignItems: "center",
    },
    front: {
        // Styling for the front face
    },
    back: {
        // Styling for the back face
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});
