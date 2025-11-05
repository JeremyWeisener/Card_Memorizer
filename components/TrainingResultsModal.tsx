import { Dimensions, FlatList, Modal, ModalProps, StyleSheet, Text, View } from "react-native";
import React, { useContext, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/data/RealmStorage";
import CardTemplate from "./CardTemplate";
import OutlineButton from "./OutlineButton";
import { ThemeContext } from "@/context/themeContext";

interface TrainingResultsModalProps extends ModalProps {
    missedCards: Card[];
    totalTime: number;
    onPress: () => void;
}

const TrainingResultsModal = (props: TrainingResultsModalProps) => {
    const { primary, secondary } = useContext(ThemeContext)


    const { GAP_SIZE, NUM_COLUMNS, CARD_WIDTH, CONTAINER_PADDING } = useMemo(() => {
        const deviceWidth = Dimensions.get("window").width;
        const NUM_COLUMNS = props.missedCards.length > 3 ? 4 : props.missedCards.length;
        const GAP_SIZE = 4;
        const TOTAL_GAP_SPACE = NUM_COLUMNS * GAP_SIZE;
        const CONTAINER_PADDING = 13;
        const CARD_WIDTH = (deviceWidth - TOTAL_GAP_SPACE - (CONTAINER_PADDING * 2)) / NUM_COLUMNS;
        return { GAP_SIZE, NUM_COLUMNS, CARD_WIDTH, CONTAINER_PADDING }
    }, [])

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const ms = milliseconds % 1000;
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
    };

    return (
        <Modal style={styles.modal} {...props}>
            <View style={[styles.wrapper, { backgroundColor: primary }]}>
                <SafeAreaView style={[styles.container]}>
                    <View style={[styles.header]}>
                        <Text style={[styles.title, { color: secondary }]}>RESULTS</Text>
                        <Text style={[styles.subTitle, { color: secondary }]}>{formatTime(props.totalTime)}</Text>
                        <Text style={[styles.subTitle, { color: secondary }]}>Missed Cards</Text>
                    </View>
                    <View style={[styles.body]}>
                        <FlatList
                            contentContainerStyle={[styles.list, { paddingHorizontal: CONTAINER_PADDING }]}
                            columnWrapperStyle={[styles.list]}
                            data={props.missedCards}
                            numColumns={NUM_COLUMNS}
                            keyExtractor={(item, i) => i + item.suit + item.value}
                            renderItem={({ item, index }) => (
                                <CardTemplate
                                    style={[
                                        {
                                            margin: GAP_SIZE / 2,
                                            maxWidth: CARD_WIDTH,
                                            maxHeight: CARD_WIDTH * 1.4,
                                        },
                                    ]}
                                    suit={item.suit}
                                    value={item.value}
                                />
                            )}
                        />
                    </View>
                    <View style={[styles.footer]}>
                        <OutlineButton
                            text="Acknowledge"
                            onPress={props.onPress}
                            color={secondary}
                            buttonStyle={[{ width: '50%', marginHorizontal: 'auto' }]}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

export default TrainingResultsModal;

const styles = StyleSheet.create({
    modal: {},
    wrapper: {},
    container: {
        maxWidth: 1920,
    },
    header: { height: "20%" },
    body: {
        height: "70%",
        alignContent: 'center'
    },
    list: {
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
    },
    footer: { height: "10%" },
    title: {
        fontSize: 32,
        textAlign: "center",
        marginVertical: 5,
    },
    subTitle: {
        fontSize: 28,
        textAlign: "center",
        marginVertical: 5,
    },
    button: {
        height: "60%",
        width: "50%",
        borderWidth: 2,
        borderRadius: 100,
        marginVertical: "auto",
        marginHorizontal: "auto",
    },
    buttonText: {
        textAlign: "center",
        fontSize: 24,
        marginVertical: "auto",
    },
});
