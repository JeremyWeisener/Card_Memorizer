interface Card{
    value: number,
    suit: "Spade"|"Club"|"Heart"|"Diamond",
    name?: string
}

interface Deck{
    type: "Play"|"Train"|"Full"
    cards: Card[]
}

export { Card, Deck }
