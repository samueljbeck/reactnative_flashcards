export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const GET_DECK = 'GET_DECK'
export const GET_DECKS = 'GET_DECKS'
export const SET_DECKS = 'SET_DECKS'

export function addCard (deckId, question, answer) {
    return {
        type: ADD_CARD,
        deckId,
        question,
        answer,
    }
}

export function addDeck (key, deck) {
    newDeck = {[key]: deck}
    return {
        type: ADD_DECK,
        newDeck,
    }
}

export function getDeck (id) {
    return {
        type: GET_DECK,
        deck
    }
}

export function getDecks () {
    return {
        type: GET_DECKS,
        decks
    }
}

export function setDecksFromStorage (decks) {
    return {
        type: SET_DECKS,
        decks
    }
}