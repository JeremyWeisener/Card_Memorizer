import { Deck, Card } from "@/data/RealmStorage";
import { deckMaker } from "@/services/deckMaker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useMemo, useReducer, useState } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import CardTemplate from "@/components/CardTemplate";
import TrainingProgressModal from "@/components/TrainingProgressModal";
import CardBacking from "@/components/CardBacking";
import PullFlick from "@/components/PullFlick";
import FlippableCard from "@/components/FlippableCard";
import TrainingResultsModal from "@/components/TrainingResultsModal";
import { ThemeContext } from "@/context/themeContext";
import OutlineButton from "@/components/OutlineButton";

enum TrainingActionType {
    WRONG = "WRONG",
    RIGHT = "RIGHT",
    SHUFFLE = "SHUFFLE",
    CLEAR = "CLEAR",
}

interface TrainingAction {
    type: TrainingActionType;
}

interface TrainingState {
    wrongCards: Card[];
    rightCards: Card[];
    remainingCards: Card[];
}

const Training = () => {
    const { primary, secondary, colorScheme } = useContext(ThemeContext)

    const { trainingDeck } = useLocalSearchParams();

    const router = useRouter();

    const { CARD_WIDTH, GAP_SIZE, NUM_COLUMNS, FLIP_DURATION } = useMemo(() => {
        const deviceWidth = Dimensions.get("window").width;
        const NUM_COLUMNS = 12;
        const GAP_SIZE = 4;
        const TOTAL_GAP_SPACE = NUM_COLUMNS * GAP_SIZE;
        const CARD_WIDTH = (deviceWidth - TOTAL_GAP_SPACE - 69) / NUM_COLUMNS;
        const FLIP_DURATION = 250;
        return { CARD_WIDTH, GAP_SIZE, NUM_COLUMNS, FLIP_DURATION }
    }, [])


    const [state, dispatch] = useReducer(
        (state: TrainingState, action: TrainingAction) => {
            const card = { ...state.remainingCards[0] } as Card;
            switch (action.type) {
                case "WRONG":
                    return {
                        ...state,
                        wrongCards: [...state.wrongCards, card],
                        remainingCards: [
                            ...state.remainingCards.filter((c) => c.suit + c.value !== card.suit + card.value),
                            card,
                        ],
                    };
                case "RIGHT":
                    return {
                        ...state,
                        rightCards: [...state.rightCards, card],
                        remainingCards: state.remainingCards.splice(1),
                    };
                case "SHUFFLE":
                    return {
                        ...state,
                        remainingCards: [...deckMaker.shuffle(state.remainingCards)],
                    };
                case "CLEAR":
                    return {
                        ...state,
                        rightCards: [],
                        wrongCards: [],
                        remainingCards: (JSON.parse(trainingDeck as string) as Deck).cards,
                    };
                default:
                    return { ...state };
            }
        },
        {
            rightCards: [],
            wrongCards: [],
            remainingCards: (JSON.parse(trainingDeck as string) as Deck).cards,
        },
    );

    const [flipped, setFlipped] = useState(false);
    const deck = useMemo(() => JSON.parse(trainingDeck as string) as Deck, [trainingDeck]);
    const [showResults, setShowResults] = useState(false);
    const [startTime, setStartTime] = useState(Date.now());

    const easyDispatch = (type: TrainingActionType) => {
        switch (type) {
            case TrainingActionType.WRONG:
            case TrainingActionType.RIGHT:
            case TrainingActionType.SHUFFLE:
                if (0 < state.remainingCards.length - 1) {
                    setFlipped(false);
                    setTimeout(() => {
                        dispatch({ type });
                    }, FLIP_DURATION / 2);
                } else {
                    dispatch({ type });
                    setShowResults(true);
                }
                break;
            case TrainingActionType.CLEAR:
                setFlipped(false);
                setTimeout(() => {
                    dispatch({ type });
                }, FLIP_DURATION / 2);
                break;
            default:
                dispatch({ type });
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: primary }]}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={[styles.cardContainer]}>
                    <PullFlick
                        onPull={() => easyDispatch(TrainingActionType.WRONG)}
                        onFlick={() => easyDispatch(TrainingActionType.RIGHT)}
                    >
                        <FlippableCard
                            flipped={flipped}
                            flipDuration={FLIP_DURATION}
                            onPress={() => setFlipped(!flipped)}
                            frontComponent={
                                <CardTemplate
                                    suit={state.remainingCards[0] && state.remainingCards[0].suit}
                                    value={state.remainingCards[0] && state.remainingCards[0].value}
                                    style={[styles.card]}
                                />
                            }
                            backComponent={
                                <View style={[{ height: "100%", width: "100%" }]}>
                                    <CardBacking mode={colorScheme} />
                                    <Text
                                        style={[
                                            styles.cardBackingText,
                                            {
                                                color: secondary,
                                                backgroundColor: `${primary}CC`,
                                            },
                                        ]}
                                    >
                                        {state.remainingCards[0] && state.remainingCards[0].name}
                                    </Text>
                                </View>
                            }
                        />
                    </PullFlick>
                </View>
                <TrainingProgressModal>
                    <View style={[styles.progressModalView]}>
                        <View style={styles.bottomInfo}>
                            <View style={styles.drawerContent}>
                                <FlatList
                                    contentContainerStyle={[styles.tinyCardContainer]}
                                    columnWrapperStyle={[]}
                                    numColumns={NUM_COLUMNS}
                                    data={deck.cards}
                                    keyExtractor={(card, i) => card.suit + card.value + i}
                                    renderItem={({ item }) => (
                                        <View
                                            style={[
                                                styles.tinyCard,
                                                {
                                                    borderColor: secondary,
                                                    backgroundColor: deckMaker.deckContainsCard(state.rightCards, item)
                                                        ? "green"
                                                        : deckMaker.deckContainsCard(state.wrongCards, item)
                                                            ? "red"
                                                            : primary,
                                                    margin: GAP_SIZE / 2,
                                                    width: CARD_WIDTH,
                                                    height: CARD_WIDTH * 1.4,
                                                },
                                            ]}
                                        ></View>
                                    )}
                                />
                            </View>
                        </View>
                        <ScrollView horizontal={true} style={[styles.buttonMenu]}>
                            <OutlineButton
                                text="Shuffle"
                                onPress={() => easyDispatch(TrainingActionType.SHUFFLE)}
                                color={secondary}
                                buttonStyle={[styles.button, { backgroundColor: primary }]}
                                textStyle={[styles.buttonText]}
                            />
                            <OutlineButton
                                text={"Clear"}
                                onPress={() => easyDispatch(TrainingActionType.CLEAR)}
                                color={secondary}
                                buttonStyle={[styles.button, { backgroundColor: primary }]}
                                textStyle={[styles.buttonText]}
                            />
                        </ScrollView>
                    </View>
                </TrainingProgressModal>
                <TrainingResultsModal
                    visible={showResults}
                    missedCards={state.wrongCards}
                    totalTime={Date.now() - startTime}
                    onPress={() => {
                        setShowResults(false);
                        router.push({ pathname: "/trainingMenu" });
                    }}
                />
            </SafeAreaView>
        </View>
    );
};

export default Training;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    cardContainer: {
        height: "80%",
        paddingTop: "10%",
    },
    card: {
        marginHorizontal: "auto",
        marginVertical: "auto",
    },
    cardBackingText: {
        position: "absolute",
        top: "40%",
        left: "5%",
        width: "90%",
        textAlign: "center",
        paddingVertical: "5%",
        fontSize: 42,
    },
    progressModalView: {
        flex: 1,
        justifyContent: "space-around",
    },
    remainderText: {
        fontSize: 24,
        textAlign: "center",
        paddingHorizontal: 10,
    },
    tinyCard: {
        borderRadius: 3,
        borderWidth: 2,
    },
    tinyCardContainer: {
        width: "100%",
        height: "auto",
        justifyContent: "center",
    },
    drawerContent: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        gap: 5,
        marginHorizontal: "auto",
    },
    bottomInfo: {
        flexDirection: "row",
        overflowX: "hidden",
    },
    buttonMenu: {
        flexGrow: 0,
        height: 50,
        flexDirection: "row",
        marginBottom: 20,
        overflow: "scroll",
    },
    button: {
        height: 40,
        width: 150,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderRadius: 20,
        marginVertical: "auto",
        marginRight: 10,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 24,
        marginVertical: "auto",
    },
});
