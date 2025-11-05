import React from "react";
import { Image, ImageStyle, StyleProp, StyleSheet } from "react-native";

const CardBacking = ({ mode, style }: { mode: string; style?: StyleProp<ImageStyle> }) =>
    mode === "dark" ? (
        <Image style={[styles.image, style]} source={require("@/assets/cards/PlayingCardBacking-Black-Alpha.png")} />
    ) : (
        <Image style={[styles.image, style]} source={require("@/assets/cards/PlayingCardBacking-White-Alpha.png")} />
    );

export default CardBacking;

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});
