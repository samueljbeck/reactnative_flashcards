import { ADD_DECK, ADD_CARD, GET_DECKS, GET_DECK, SET_DECKS }  from '../actions'

function decks(state = {}, action) {
    switch(action.type) {
        case ADD_DECK :
            return {
                ...state,
                ...action.newDeck
            }
        case ADD_CARD:
            return {
                ...state,
                [action.deckId]:{
                    title: state[action.deckId].title,
                    questions: state[action.deckId].questions.concat({
                        question: action.question,
                        answer: action.answer
                    })
                }
            }
        case GET_DECKS:
            return {
                ...state,
            }
        case GET_DECK:
            return {
                ...state,
            }
        case SET_DECKS:
            return {
                ...state,
                ...action.decks
            }
    }
}

export default decks