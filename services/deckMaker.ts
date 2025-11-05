import { fullDeck } from "@/constants/decks";
import { Deck, Card } from "@/data/RealmStorage";

interface makeDeckResponse {
    playDeck: Deck;
    removedCards: Card[];
}

export const deckMaker: {
    shuffle: (array: Card[]) => Card[];
    makePlayDeck: (remove: number) => makeDeckResponse;
    selectRandomCards: (count: number) => number[];
    sortCards: (cards: Card[]) => Card[];
    deckContainsCard: (deck: Card[], card: Card) => boolean;
} = {
    shuffle(array: Card[]) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    },
    selectRandomCards: (count: number) => {
        let min = 0;
        let max = 51;

        if (min > max) {
            [min, max] = [max, min];
        }
        const rangeSize = max - min + 1;

        if (count > rangeSize) { count = rangeSize; }

        const fullRange = Array.from({ length: rangeSize }, (_, i) => min + i);

        // 2. Fisher-Yates Shuffle (Partial Shuffle up to 'count' is slightly more efficient)
        for (let i = 0; i < count; i++) {
            const j = Math.floor(Math.random() * (rangeSize - i)) + i;

            [fullRange[i], fullRange[j]] = [fullRange[j], fullRange[i]];
        }

        const res = fullRange.slice(0, count);

        return res;
    },
    makePlayDeck: (remove: number) => {
        const cleanDeck = {
            ...fullDeck,
            cards: [...fullDeck.cards] as Card[],
        } as Deck;
        const randomCards = deckMaker.selectRandomCards(remove);
        let removedCards = [] as Card[];

        randomCards
            .sort((a, b) => (a > b ? -1 : 0))
            .forEach((v, i) => {
                let card = cleanDeck.cards.at(v - i);
                if (card) {
                    removedCards.push(card);
                    cleanDeck.cards.splice(v - i, 1);
                }
            });

        deckMaker.shuffle(cleanDeck.cards);
        const playDeck = cleanDeck;

        return { playDeck, removedCards };
    },
    sortCards(cards: Card[]) {
        const groupedCards = cards.reduce(
            (accumulator: any, card: Card) => {
                const key = card.suit;
                if (!accumulator[key]) {
                    accumulator[key] = [];
                }
                accumulator[key].push(card);
                return accumulator;
            },
            { Spade: [], Club: [], Heart: [], Diamond: [] },
        );

        const result = Object.values(groupedCards)
            .map((group) => group.sort((a, b) => a["value"] - b["value"]))
            .flat() as Card[];

        return result;
    },
    deckContainsCard(deck: Card[], card: Card) {
        return deck.findIndex((dc) => dc.suit === card.suit && dc.value === card.value) >= 0;
    },
};
