import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { getDecks, initialData, setDecks } from '../utils/api';
import { setDecksFromStorage } from '../actions'
import DeckListItem from './DecksListItem'



class Decks extends Component {

    componentDidMount() {
        const { dispatch } = this.props

        getDecks()
            .then((decks) => {
                dispatch(setDecksFromStorage(decks))
            }) 

    }

    navigateToDeck = (id) => {
        console.log(id)
        this.props.navigation.navigate('Deck', { deckId: id });
    }


    render() {
        const { decks } = this.props
        return (
            <View style={{ flex: 1 }}>
                {
                    decks
                    ?<FlatList
                            data={Object.keys(decks).map((id) => {return {key: id }} )}
                            renderItem={({ item }) => <DeckListItem navigateToDeck={(id) => this.navigateToDeck(id)} id={item.key}/>}
                        />  
                    :<Text>Loading...</Text>
                }
            </View>
        )
    }
}


function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks)
