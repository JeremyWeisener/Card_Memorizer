import { Dimensions, FlatList, Modal, ModalProps, StyleSheet, Text, View } from "react-native";
import React, { useContext, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardTemplate from "./CardTemplate";
import { Card } from "@/data/RealmStorage";
import { deckMaker } from "@/services/deckMaker";
import OutlineButton from "./OutlineButton";
import { ThemeContext } from "@/context/themeContext";

// TODO: Save Results

interface ResultsModalProps extends ModalProps {
    removedCards: Card[];
    selectedCards: Card[];
    removedQty: number;
}

const ResultsModal = (props: ResultsModalProps) => {
    const { primary, secondary } = useContext(ThemeContext);

    const { GAP_SIZE, NUM_COLUMNS, CARD_WIDTH, CONTAINER_PADDING } = useMemo(() => {
        const deviceWidth = Dimensions.get("window").width;
        const NUM_COLUMNS = 5;
        const GAP_SIZE = 3;
        const TOTAL_GAP_SPACE = NUM_COLUMNS * GAP_SIZE;
        const CONTAINER_PADDING = 13; 13;
        const CARD_WIDTH = (deviceWidth - TOTAL_GAP_SPACE - (CONTAINER_PADDING * 2)) / NUM_COLUMNS;
        return { GAP_SIZE, NUM_COLUMNS, CARD_WIDTH, CONTAINER_PADDING }
    }, [])

    const removedCards = deckMaker.sortCards(props.removedCards);
    const selectedCards = deckMaker.sortCards(props.selectedCards);

    return (
        <Modal {...props}>
            <SafeAreaView style={[{ flex: 1, backgroundColor: primary }]}>
                <View style={[styles.wrapper, { backgroundColor: primary }]}>
                    <View style={[styles.headerWrapper]}>
                        <Text style={[styles.header, { color: secondary }]}>Results</Text>
                    </View>
                    <View style={[styles.listWrapper, { flex: 3 }]}>
                        <Text style={[styles.listHeader, { color: secondary, marginVertical: 10 }]}>Removed</Text>
                        <FlatList
                            contentContainerStyle={[styles.cardList, { paddingHorizontal: CONTAINER_PADDING }]}
                            columnWrapperStyle={[]}
                            numColumns={NUM_COLUMNS}
                            data={removedCards}
                            keyExtractor={(c, i) => c.value + c.suit + i}
                            renderItem={({ item }: { item: Card }) => (
                                <CardTemplate
                                    style={[
                                        {
                                            borderRadius: 10,
                                            borderWidth: 5,
                                            borderColor: deckMaker.deckContainsCard(selectedCards, item)
                                                ? "green"
                                                : primary,
                                            maxWidth: CARD_WIDTH,
                                            margin: GAP_SIZE / 2,
                                        },
                                    ]}
                                    suit={item.suit}
                                    value={item.value}
                                />
                            )}
                        />
                    </View>
                    <View style={[styles.listWrapper, { flex: 3 }]}>
                        <Text style={[styles.listHeader, { color: secondary, marginVertical: 10 }]}>Selected</Text>
                        <FlatList
                            contentContainerStyle={[styles.cardList, { paddingHorizontal: CONTAINER_PADDING }]}
                            columnWrapperStyle={[]}
                            numColumns={NUM_COLUMNS}
                            data={selectedCards}
                            keyExtractor={(c, i) => c.value + c.suit + i}
                            renderItem={({ item }: { item: Card }) => (
                                <CardTemplate
                                    style={[
                                        {
                                            borderRadius: 10,
                                            borderWidth: 5,
                                            borderColor: deckMaker.deckContainsCard(removedCards, item)
                                                ? "green"
                                                : primary,
                                            maxWidth: CARD_WIDTH,
                                            margin: GAP_SIZE / 2,
                                        },
                                    ]}
                                    suit={item.suit}
                                    value={item.value}
                                />
                            )}
                        />
                    </View>
                    <View style={[styles.buttonWrapper]}>
                        <OutlineButton
                            text="Finish"
                            onPress={props.onDismiss}
                            color={secondary}
                            buttonStyle={[styles.button]} />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default ResultsModal;

const styles = StyleSheet.create({
    wrapper: {
        height: "100%",
        width: "100%",
        flex: 1,
        justifyContent: "center",
    },
    modal: {},
    headerWrapper: {
        // flex: 1,
        justifyContent: "center",
        marginVertical: 10,
    },
    header: {
        fontSize: 32,
        textAlign: "center",
        marginVertical: -10,
    },
    removedCards: {},
    selectedCards: {},
    cardList: {
        justifyContent: "flex-start",
        height: "auto",
        width: "100%",

        overflow: "scroll",
        // borderWidth: 1,
        // borderColor: "red",
    },
    listWrapper: {
        flex: 1,
        justifyContent: "center",
    },
    listHeader: {
        fontSize: 26,
        textAlign: "left",
        paddingLeft: 20,
    },
    button: {
        width: '50%',
        marginHorizontal: 'auto',
        paddingVertical: 10,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: "center",
    },
    correct: {},
    wrong: {},
});
