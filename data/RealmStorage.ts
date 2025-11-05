import { Realm } from '@realm/react';

class Deck extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    deckName!: string;
    cards!: Card[];

    static schema = {
        name: 'Deck',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            deckName: 'string',
            cards: 'Card[]'
        }
    }
}

class Card extends Realm.Object {
    // _id!: Realm.BSON.ObjectId;
    name!: string;
    suit!: "Spade"|"Club"|"Heart"|"Diamond";
    value!: number;

    static schema = {
        name: 'Card',
        properties: {
            name: "string",
            suit: "string",
            value: "int"
        }
    }
}

export { Card, Deck };
