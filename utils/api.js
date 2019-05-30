import { AsyncStorage } from 'react-native'
const DECKS_IN_APP = 'DECKS_IN_APP'

export function getDecks() {
    return AsyncStorage.getItem(DECKS_IN_APP)   
        .then((decks) => {
           if (decks === null) {
                setDecks()
                return initialData
            } else {
                return JSON.parse(decks)
            }
        })


           
            
}

export function setDecks() {
    AsyncStorage.setItem(DECKS_IN_APP, JSON.stringify(initialData))
}

export function getDeck(id) {
    return AsyncStorage.getItem(DECKS_IN_APP)
}

export function saveDeckTitle(key, title) {
    return AsyncStorage.mergeItem(DECKS_IN_APP, JSON.stringify({
        [key]: {title: title, 
        questions: []}
    }))
}

export function addCardToDeck(deckId, question, answer) {
    AsyncStorage.getItem(DECKS_IN_APP)
        .then((result) => {
            let decks = JSON.parse(result)
            decks[deckId].questions.push({question: question, answer: answer})
            AsyncStorage.mergeItem(DECKS_IN_APP, JSON.stringify(decks))
        })
}

export const initialData = {
    Deck1: {
        title: 'Deck 1',
        questions:[
            {
                question: 'How to Add a Deck',
                answer: 'Open the Add Deck Tab on the Home screen'
            },
            {
                question: 'How to Add a Card',
                answer: 'Open the a Deck and click the Add Card Button'
            }
        ]

    },
    Deck2: {
        title: 'Deck 2',
        questions: [
            {
                question: 'How to View a Card',
                answer: 'Open the Deck and select Start Quiz'
            },
            {
                question: 'How to Delete a Deck',
                answer: 'Open the a Deck and Long Press the Title'
            }
        ]

    }
}
