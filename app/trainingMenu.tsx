import CardTemplate from "@/components/CardTemplate";
import { Card, Deck } from "@/data/RealmStorage";
import RealmService from "@/services/realmService";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import CreateNewDeckModal from "@/components/CreateNewDeckModal";
import Picker from "@/components/Picker";
import Edit from "@/icons/Edit";
import Trash from "@/icons/Trash";
import { useRealm } from "@realm/react";
import Toast from "react-native-toast-message";
import { useBackButtonHandler } from "@/hooks/useBackButtonHandler";
import ConfirmationModal from "@/components/ConfirmationModal";
import OutlineButton from "@/components/OutlineButton";
import RenameModal from "@/components/RenameModal";
import { ThemeContext } from "@/context/themeContext";

const Training = () => {
    const { primary, secondary } = useContext(ThemeContext);

    const realm = useRealm();
    const realmService = RealmService.getInstance();
    useEffect(() => {
        realmService.initialize(realm);
    }, []);

    const router = useRouter();

    useBackButtonHandler({ url: "/" });

    const [availableDecks, setAvailableDecks] = useState<Deck[]>();

    const [activeDeck, setActiveDeck] = useState<Deck>();
    const [activeCard, setActiveCard] = useState<Card>({ value: 0, suit: "Spade", name: "Sid" } as Card);
    const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

    const [newDeckModalVisible, setNewDeckModalVisible] = useState(false);
    const [showRenameDeckModal, setShowRenameDeckModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [showRenameCardModal, setShowRenameCardModal] = useState(false);

    useEffect(() => {
        getAvailableDecks();
        const defaultDeck = realmService.findDeck(realm, "Default");
        setActiveDeck(defaultDeck);
    }, []);

    const getAvailableDecks = () => {
        const allDecks = realmService.getAllDecks(realm);
        setAvailableDecks(allDecks);
    };

    const findAndSetDeck = (name: string) => {
        const foundDeck = realmService.findDeck(realm, name);
        if (!foundDeck) {
            Toast.show({
                type: "error",
                text1: "Deck Not Found",
                text2: `Couldn't find deck name ${name}`,
                topOffset: 100,
            });
            return;
        }
        setActiveDeck(foundDeck);
    };

    const handleDeckSelection = (name: string) => {
        if (name === "NEW") {
            setNewDeckModalVisible(true);
        } else if (name === activeDeck?.deckName) {
            return;
        } else {
            findAndSetDeck(name);
        }
    };

    const deleteActiveDeck = () => {
        if (activeDeck?.deckName === "Default") {
            return;
        }
        if (activeDeck) {
            const deckName = `${activeDeck.deckName}`;
            realmService.deleteDeck(realm, activeDeck);
            const defaultDeck = realmService.findDeck(realm, "Default");
            setActiveDeck(defaultDeck);
            getAvailableDecks();
            Toast.show({
                type: "success",
                text1: "Success",
                text2: `Deck ${deckName} successfully delete.`,
            });
        } else {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: `No deck selected.`,
            });
        }
    };

    const createNewDeck = (newDeckName: string) => {
        const res = realmService.addDeck(realm, newDeckName);
        if (res) {
            setNewDeckModalVisible(false);
            findAndSetDeck(newDeckName);
            getAvailableDecks();
            Toast.show({
                type: "success",
                text1: "Created Deck",
                text2: `Created deck ${newDeckName}`,
                topOffset: 100,
            });
        } else {
            Toast.show({
                type: "error",
                text1: "Failed to create deck",
                text2: "Deck already exists",
                topOffset: 100,
            });
        }
    };

    const renameDeck = (newName: string) => {
        const res = realmService.renameDeck(realm, newName, activeDeck)
        if (!res) {
            Toast.show({
                type: "error",
                text1: "Rename Deck",
                text2: "Failed to rename deck",
                topOffset: 100
            })

        }
    }

    return (
        <View style={[styles.container, { backgroundColor: primary }]}>
            <SafeAreaView style={styles.cardContainer}>
                <View style={styles.deckSelector}>
                    <View style={{ flex: 3 }}>
                        <Picker
                            options={availableDecks?.map((d) => ({ value: d.deckName, label: d.deckName }))}
                            selected={activeDeck?.deckName}
                            placeHolder={"Not Selected"}
                            actionOption={{ value: "NEW", label: "Add new..." }}
                            onSelection={(v) => handleDeckSelection(v)}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                        <Edit
                            width={42}
                            height={42}
                            color={secondary}
                            fill={secondary}
                            style={{ padding: 10, marginVertical: "auto" }}
                            //onPress={() => setShowRenameDeckModal(true)}
                            onPress={() => setShowRenameDeckModal(true)}
                        />
                        <Trash
                            width={42}
                            height={42}
                            fill={secondary}
                            color={secondary}
                            style={{ padding: 10, marginVertical: "auto" }}
                            onPress={() => setShowConfirmationModal(true)}
                        />
                    </View>
                </View>
                <FlatList
                    contentContainerStyle={{ borderWidth: 2, borderTopColor: secondary }}
                    data={activeDeck?.cards}
                    keyExtractor={(item) => item.suit + item.value}
                    renderItem={({ item, index }: { item: Card; index: number }) => (
                        <Pressable
                            onPress={() => {
                                setActiveCard(item);
                                setActiveCardIndex(index);
                                setShowRenameCardModal(true);
                            }}
                        >
                            <View
                                style={{
                                    height: 100,
                                    flexDirection: "row",
                                    paddingVertical: 5,
                                    borderWidth: 2,
                                    borderBottomColor: secondary,
                                }}
                            >
                                <View style={{ width: 100, alignContent: "center", justifyContent: "center" }}>
                                    <CardTemplate value={item.value} suit={item.suit} />
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 40,
                                            textAlignVertical: "center",
                                            height: "100%",
                                            color: secondary,
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    )}
                />
                <OutlineButton
                    text="Start"
                    onPress={() => {
                        router.navigate({
                            pathname: "./training",
                            params: { trainingDeck: JSON.stringify(activeDeck) }
                        })
                    }}
                    outlineWidth={2}
                    color={secondary}
                    backgroundColor={primary}
                    buttonStyle={[styles.button]}
                />
            </SafeAreaView>

            <ConfirmationModal
                visible={showConfirmationModal}
                dismissText="Delete"
                onDismiss={() => { setShowConfirmationModal(false) }}
                onConfirm={deleteActiveDeck}
            />

            <RenameModal
                visible={newDeckModalVisible}
                onDismiss={() => setNewDeckModalVisible(false)}
                value={""}
                actionText="Create"
                onSubmit={(s) => createNewDeck(s)}
                header={(
                    <Text style={{ fontSize: 24, marginBottom: 10, textAlign: 'center', color: secondary }}>Create New Deck</Text>
                )}
            />

            <RenameModal
                visible={showRenameDeckModal}
                onDismiss={() => setShowRenameDeckModal(false)}
                value={activeDeck?.deckName}
                onSubmit={(v) => renameDeck(v)}
            />
            <RenameModal
                visible={showRenameCardModal}
                onDismiss={() => setShowRenameCardModal(false)}
                value={activeCard.name}
                onSubmit={(s) => {
                    activeDeck && realmService.updateCardInDeck(realm, activeDeck, activeCardIndex, s);
                }}
                header={(
                    <View style={{ height: 200, width: "50%", marginHorizontal: 'auto', marginBottom: 20, }}>
                        <CardTemplate
                            value={activeCard.value || 1}
                            suit={activeCard.suit || "Spade"}
                            style={{ marginHorizontal: "auto" }}
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default Training;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        flex: 1,
        marginTop: -20,
    },
    startButtonText: {
        marginHorizontal: "auto",
        fontSize: 22,
        fontWeight: 600,
    },
    startButton: {
        width: "90%",
        marginVertical: 5,
        marginTop: 20,
        paddingVertical: 20,
        marginHorizontal: "auto",
        borderRadius: 5,
        borderWidth: 2,
    },
    button: {
        margin: 20,
        paddingVertical: 10
    },
    deckSelector: {
        width: "100%",
        flexDirection: "row",
    },
    deckSelectorText: {
        fontSize: 24,
        textAlign: "center",
        paddingVertical: 5,
    },
    deckSelectorItem: {
        backgroundColor: "blue",
        color: "white",
    },
});
