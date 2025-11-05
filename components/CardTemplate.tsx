import React, { memo, useState } from "react";
import {
    Image,
    ImageBackground,
    ImageStyle,
    LayoutChangeEvent,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";

const Suit = ({ suitName, style }: { suitName: string; style?: StyleProp<ImageStyle> }) => {
    switch (suitName) {
        case "Spade":
            return <Image style={[styles.suit, style]} source={require("@/assets/cards/Spade.png")} />;
        case "Club":
            return <Image style={[styles.suit, style]} source={require("@/assets/cards/Club.png")} />;
        case "Heart":
            return <Image style={[styles.suit, style]} source={require("@/assets/cards/Heart.png")} />;
        case "Diamond":
            return <Image style={[styles.suit, style]} source={require("@/assets/cards/Diamond.png")} />;
    }
};

const Value = ({ value, fontSize, color }: { value: number; fontSize: number; color: string }) => {
    switch (value) {
        case 1:
            return (
                <Text style={[styles.value, { fontSize }, { color }]} adjustsFontSizeToFit>
                    A
                </Text>
            );
        case 11:
            return (
                <Text style={[styles.value, { fontSize }, { color }]} adjustsFontSizeToFit allowFontScaling>
                    J
                </Text>
            );
        case 12:
            return <Text style={[styles.value, { fontSize }, { color }]}>Q</Text>;
        case 13:
            return <Text style={[styles.value, { fontSize }, { color }]}>K</Text>;
        default:
            return <Text style={[styles.value, { fontSize }, { color }]}>{value}</Text>;
    }
};

const CardTemplate = ({ value, suit, style }: { value: number; suit: string; style?: StyleProp<ViewStyle> }) => {
    const [parentDimensions, setParentDimensions] = useState({ width: 0, height: 0 });
    const [fontSize, setFontSize] = useState(16);
    const [suitHeight, setSuitHeight] = useState(10);
    const [borderRadius, setBorderRadius] = useState(5);
    const [borderWidth, setBorderWidth] = useState(1);
    const [smallDesign, setSmallDesign] = useState(false);

    const handleLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setParentDimensions({ width, height });

        const fontSizeScale = width < 150 ? 0.5 : width > 300 ? 0.25 : 0.12;
        const borderRadiusScale = 20;
        const borderWidthScale = 100;

        const calculatedSizeForFont = width * fontSizeScale;
        const newFontSize = Math.max(8, Math.min(40, calculatedSizeForFont));

        const calculatedSizeForBorderRadius = Math.min(width, height) / borderRadiusScale;
        const newBorderRadius = Math.max(5, Math.min(20, calculatedSizeForBorderRadius));

        const calculatedSizeForBorderWidth = Math.min(width, height) / borderWidthScale;
        const newBorderWidth = Math.max(1, Math.min(5, calculatedSizeForBorderWidth));

        const newSuitHeight = Math.min(50, Math.max(30, 4000 / width));

        setFontSize(newFontSize);
        setBorderRadius(newBorderRadius);
        setBorderWidth(newBorderWidth);
        setSmallDesign(width < 150);
        setSuitHeight(newSuitHeight);
    };

    return (
        <View
            style={[
                styles.outer,
                { borderColor: "black", backgroundColor: "#f0f0f0" },
                { borderRadius, borderWidth },
                style,
            ]}
            onLayout={handleLayout}
        >
            <View style={[styles.topLeftCorner, smallDesign ? { width: "100%", justifyContent: "center" } : {}]}>
                <Value
                    value={value}
                    fontSize={smallDesign ? fontSize : fontSize}
                    color={suit == "Spade" || suit == "Club" ? "#000" : "#dc143c"}
                />
                <Suit suitName={suit} style={smallDesign ? { height: `${suitHeight}%` } : {}} />
            </View>
            <View style={[styles.center, { width: smallDesign ? "0%" : "70%" }]}>
                {value < 11 && (
                    <>
                        <View style={[styles.centerColumn]}>
                            {value > 3 && value < 11 && <Suit suitName={suit} />}
                            {value > 5 && value < 11 && <Suit suitName={suit} />}
                            {value > 8 && value < 11 && (
                                <Suit suitName={suit} style={{ transform: [{ rotate: "180deg" }] }} />
                            )}
                            {value > 3 && value < 11 && (
                                <Suit suitName={suit} style={{ transform: [{ rotate: "180deg" }] }} />
                            )}
                        </View>
                        <View style={[styles.centerColumn]}>
                            {[2, 3, 7, 8, 10].includes(value) && <Suit suitName={suit} style={{}} />}
                            {[1, 3, 5, 9].includes(value) && <Suit suitName={suit} style={{}} />}
                            {[8].includes(value) && <View style={[styles.suit, { marginVertical: "-270%" }]} />}
                            {[10].includes(value) && <View style={[styles.suit, { marginVertical: "-140%" }]} />}
                            {[2, 3, 8, 10].includes(value) && (
                                <Suit suitName={suit} style={{ transform: [{ rotate: "180deg" }] }} />
                            )}
                            {[7].includes(value) && <View style={[styles.suit, { marginVertical: "-90%" }]} />}
                        </View>
                        <View style={[styles.centerColumn]}>
                            {value > 3 && value < 11 && <Suit suitName={suit} />}
                            {value > 5 && value < 11 && <Suit suitName={suit} />}
                            {value > 8 && value < 11 && (
                                <Suit suitName={suit} style={{ transform: [{ rotate: "180deg" }] }} />
                            )}
                            {value > 3 && value < 11 && (
                                <Suit suitName={suit} style={{ transform: [{ rotate: "180deg" }] }} />
                            )}
                        </View>
                    </>
                )}
                {[11].includes(value) && (
                    <ImageBackground
                        source={require("@/assets/cards/Jack.png")}
                        resizeMode="contain"
                        style={styles.face}
                    />
                )}
                {[12].includes(value) && (
                    <ImageBackground
                        source={require("@/assets/cards/Queen.png")}
                        resizeMode="contain"
                        style={styles.face}
                    />
                )}
                {[13].includes(value) && (
                    <ImageBackground
                        source={require("@/assets/cards/King.png")}
                        resizeMode="contain"
                        style={styles.face}
                    />
                )}
            </View>
            <View style={[styles.bottomRightCorner, { width: smallDesign ? "0%" : "15%" }]}>
                <Value
                    value={value}
                    fontSize={fontSize}
                    color={suit === "Spade" || suit === "Club" ? "#000" : "#dc143c"}
                />
                <Suit suitName={suit} />
            </View>
        </View>
    );
};

export default memo(CardTemplate);
// export default CardTemplate;

const styles = StyleSheet.create({
    outer: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 30,
        paddingHorizontal: 5,
        aspectRatio: 1 / 1.5,
    },
    center: {
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",

        paddingHorizontal: 5,
    },
    centerColumn: {
        display: "flex",
        flexDirection: "column",
        width: "33.3%",
        height: "100%",
        justifyContent: "space-around",
        alignContent: "center",
    },
    topLeftCorner: {
        width: "15%",
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        textAlign: "left",
        paddingHorizontal: 4,
        marginTop: -20,
    },
    bottomRightCorner: {
        width: "15%",
        display: "flex",
        flexDirection: "column",
        transform: [{ rotate: "180deg" }],
        textAlign: "center",
        paddingHorizontal: 4,
        marginBottom: -20,
    },
    suit: {
        width: "80%",
        height: "10%",
        resizeMode: "contain",
        marginHorizontal: "auto",
    },
    value: {
        textAlign: "center",
        width: "100%",
        fontSize: 40,
        letterSpacing: -4,
        fontWeight: 600,
    },
    face: {
        flex: 1,
        justifyContent: "center",
    },
});
