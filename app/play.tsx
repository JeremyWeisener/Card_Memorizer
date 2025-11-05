import CardSelectionModal from "@/components/CardSelectionModal";
import NumericalInputModal from "@/components/NumericalInputModal";
import CardTemplate from "@/components/CardTemplate";
import { Wipe } from "@/components/Wipe";
import { fullDeck } from "@/constants/decks";
import { Deck, Card } from "@/data/RealmStorage";
import { deckMaker } from "@/services/deckMaker";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ResultsModal from "@/components/ResultsModal";
import { useRouter } from "expo-router";
import { ThemeContext } from "@/context/themeContext";

const Play = () => {
    const { primary, secondary } = useContext(ThemeContext);

    const router = useRouter();

    const [deck, setDeck] = useState<Deck>(fullDeck);
    const [cardsRemoved, setCardsRemoved] = useState<Card[]>([]);
    const [cardsSelected, setCardsSelected] = useState<Card[]>([]);
    const [currIndex, setCurrIndex] = useState(0);

    const [showNumericalInputModal, setShowNumericalInputModal] = useState(true);
    const [removedQty, setRemovedQty] = useState(5);

    const [showCardSelectionModal, setShowCardSelectionModal] = useState(false);

    const [showResultsModal, setShowResultsModal] = useState(false);

    const startPlay = (n: number) => {
        setRemovedQty(n);
        const { playDeck, removedCards } = deckMaker.makePlayDeck(n);
        setDeck(playDeck);
        setCardsRemoved(removedCards);
    };

    const onFinish = () => {
        setShowCardSelectionModal(true);
    };

    const calculateResults = (selection: Card[]) => {
        let correct = 0;
        let wrong = 0;

        selection.forEach((c) => {
            cardsRemoved.forEach((rm) => {
                if (c.value === rm.value && c.suit === rm.suit) {
                    correct++;
                }
            });
        });

        wrong = removedQty - correct;

        setShowResultsModal(true);

    };

    return (
        <>
            <View style={[styles.container, { backgroundColor: primary }]}>
                <View style={styles.cardContainer}>
                    <Wipe
                        onThreshold={() => {
                            if (currIndex >= deck.cards.length - 1) {
                                onFinish();
                                return;
                            } else {
                                setCurrIndex(currIndex + 1);
                            }
                        }}
                        threshold={-150}
                        style={{ flexDirection: "row" }}
                    >
                        <CardTemplate
                            value={deck.cards[currIndex].value}
                            suit={deck.cards[currIndex].suit}
                            style={styles.cardStyle}
                        />
                        {currIndex < deck.cards.length - 1 && (
                            <CardTemplate
                                value={deck.cards[currIndex + 1].value}
                                suit={deck.cards[currIndex + 1].suit}
                                style={styles.cardStyle}
                            />
                        )}
                    </Wipe>
                </View>
                <View style={styles.bottomInfo}>
                    {deck?.cards && (
                        <Text style={[styles.remainderText, { color: secondary }]}>
                            x{deck?.cards?.length - currIndex}
                        </Text>
                    )}
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            paddingRight: 30,
                            width: "80%",
                            gap: 5,
                        }}
                    >
                        {new Array(deck?.cards.length - currIndex).fill(null).map((v, i) => (
                            <View
                                key={v + "-" + i}
                                style={{
                                    borderWidth: 2,
                                    borderColor: secondary,
                                    backgroundColor: primary,
                                    borderRadius: 3,
                                    width: "8%",
                                    height: "20%",
                                }}
                            ></View>
                        ))}
                    </View>
                </View>
            </View>
            <CardSelectionModal
                visible={showCardSelectionModal}
                limit={removedQty}
                onDismiss={() => setShowCardSelectionModal(false)}
                onSubmit={(selection: Card[]) => {
                    setCardsSelected(selection);
                    setShowResultsModal(true);
                }}
            />
            <NumericalInputModal
                visible={showNumericalInputModal}
                header="Cards to Remove"
                value={"5"}
                onAction={(n) => startPlay(parseInt(n))}
                onDismiss={() => {
                    setShowNumericalInputModal(false);
                }}
            />
            <ResultsModal
                visible={showResultsModal}
                onDismiss={() => router.back()}
                selectedCards={cardsSelected}
                removedCards={cardsRemoved}
                removedQty={removedQty}
            />
        </>
    );
};

export default Play;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        flexGrow: 5,
    },
    bottomInfo: {
        flexGrow: 1,
        flexDirection: "row",
        marginBottom: 50,
        overflowX: "hidden",
    },
    cardStyle: {
        // flex:1,
        marginHorizontal: "auto",
        marginVertical: "20%",
    },
    remainderText: {
        fontSize: 40,
        textAlignVertical: "center",
        paddingHorizontal: 10,
    },
});
