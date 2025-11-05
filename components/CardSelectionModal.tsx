import { fullDeck } from "@/constants/decks";
import { Card } from "@/data/RealmStorage";
import React, { useContext, useState } from "react";
import { FlatList, Modal, ModalProps, Pressable, StyleSheet, Text, View } from "react-native";
import CardTemplate from "./CardTemplate";
import OutlineButton from "./OutlineButton";
import { ThemeContext } from "@/context/themeContext";

interface CardSelectionModalProps extends ModalProps {
    onSubmit: (selected: Card[]) => void;
    limit: number;
}

const CardSelectionModal = (props: CardSelectionModalProps) => {
    const { primary, secondary } = useContext(ThemeContext);


    const [selectedCards, setSelectedCards] = useState<Card[]>([]);

    const handleSelection = (card: Card, action: "remove" | "add") => {
        if (action === "remove") {
            let index = getCardIndex(card);
            let newList = [...selectedCards];
            newList.splice(index, 1);
            setSelectedCards(newList);
        }
        if (action === "add") {
            if (selectedCards.length >= props.limit) {
                return;
            }
            setSelectedCards([...selectedCards, card]);
        }
    };

    const getCardIndex = (card: Card) => {
        return selectedCards.findIndex((c) => c.value === card.value && c.suit === card.suit);
    };

    return (
        <Modal animationType="slide" transparent={true} {...props}>
            <View style={styles.wrapper}>
                <View style={[styles.modal, { backgroundColor: primary, borderColor: secondary }]}>
                    <View style={[styles.header, { borderColor: secondary }]}>
                        <Text style={[styles.headerText, { color: secondary }]}>Select Missing Cards</Text>
                        <Pressable onPress={props.onDismiss}>
                            <Text style={[styles.headerText, { color: secondary }]}>X</Text>
                        </Pressable>
                    </View>
                    <FlatList
                        contentContainerStyle={[styles.body]}
                        columnWrapperStyle={{ marginHorizontal: "auto" }}
                        numColumns={4}
                        data={fullDeck?.cards as Card[]}
                        keyExtractor={(item) => item.suit + item.value}
                        renderItem={({ item, index }: { item: Card; index: number }) =>
                            getCardIndex(item) >= 0 ? (
                                <Pressable
                                    key={item.suit + item.value + index}
                                    style={[styles.bodyItem, { backgroundColor: "green" }]}
                                    onPress={() => handleSelection(item, "remove")}
                                >
                                    <CardTemplate value={item.value} suit={item.suit} />
                                </Pressable>
                            ) : (
                                <Pressable
                                    key={item.suit + item.value + index}
                                    style={[styles.bodyItem, { backgroundColor: primary }]}
                                    onPress={() => handleSelection(item, "add")}
                                >
                                    <CardTemplate value={item.value} suit={item.suit} />
                                </Pressable>
                            )
                        }
                    ></FlatList>
                    <View style={styles.footer}>
                        <OutlineButton
                            text="Submit"
                            onPress={() => props.onSubmit(selectedCards)}
                            color={secondary}
                            buttonStyle={[styles.button]}
                            textStyle={[styles.buttonText]}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CardSelectionModal;

const styles = StyleSheet.create({
    wrapper: {
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.25)",
    },
    modal: {
        height: "85%",
        width: "95%",
        marginHorizontal: "auto",
        marginVertical: "auto",
        borderRadius: 25,
        borderWidth: 2,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: 24,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    body: {
        padding: 10,
        overflow: "scroll",
    },
    bodyItem: {
        width: "25%",
        paddingVertical: 10,
        // margin: 2,

        paddingHorizontal: 6,
        borderRadius: 10,
        backgroundColor: "green",

        borderWidth: 3,
    },
    footer: {},
    button: {
        marginVertical: 20,
        width: '50%',
        marginHorizontal: 'auto',
        paddingVertical: 5
    },
    buttonText: {
    }
});
