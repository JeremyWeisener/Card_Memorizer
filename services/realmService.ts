import { Deck } from '@/data/RealmStorage';
import { useRealm } from "@realm/react";
import Realm from "realm";

import { fullDeck } from '@/constants/decks';

class RealmService {
    private static instance: RealmService;

    private constructor() { }

    public static getInstance(): RealmService {
        if (!RealmService.instance) {
            RealmService.instance = new RealmService();
        }
        return RealmService.instance;
    }

    public addDeck(realm: Realm, deckName: string) {
        const deckExists = realm.objects<Deck>('Deck').filtered('deckName == $0', deckName)[0];
        if (deckExists) {
            return false;
        }
        realm.write(() => {
            realm.create("Deck", {
                _id: new Realm.BSON.ObjectId(),
                deckName: deckName,
                cards: fullDeck.cards
            })
        })
        return true;
    }

    public updateDeck(realm: Realm, deck: Deck) {
        realm.write(() => {
            deck = deck;
        })
    }

    public updateCardInDeck(realm: Realm, deck: Deck, cardIndex: number, newName: string) {
        realm.write(() => {
            deck.cards[cardIndex].name = newName;
        })
    }

    public findDeck(realm: Realm, deckName: string): Deck {
        return realm.objects<Deck>('Deck').filtered('deckName == $0', deckName)[0];
    }

    public getAllDecks(realm: Realm): Deck[] {
        return Array.from(realm.objects<Deck>('Deck'));
    }

    public deleteDeck(realm: Realm, deck: Deck): boolean {
        realm.write(() => {
            realm.delete(deck);
        })
        return true;
    }

    public renameDeck(realm: Realm, newName: string, deck?: Deck) {
        if (!deck) { return false; }
        realm.write(() => {
            deck.deckName = newName;
        })
        return true;
    }

    public initialize(realm: Realm) {
        const defaultExists = realm.objects<Deck>('Deck').filtered('deckName == $0', "Default")[0];
        if (!defaultExists) {
            realm.write(() => {
                realm.create("Deck", {
                    _id: new Realm.BSON.ObjectId(),
                    deckName: 'Default',
                    cards: [...fullDeck.cards]
                })
            })
        }
    }
}

export const useRealmService = () => {
    const realm = useRealm();
    const realmService = RealmService.getInstance();
    realmService.initialize(realm);
    return { realm, realmService }
}

export default RealmService
