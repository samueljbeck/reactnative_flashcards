import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import {light_grey} from '../utils/colors'
import { withNavigation } from 'react-navigation';
import React from 'react'
import { connect } from 'react-redux'

const DeckList = ({navigateToDeck, id, decks}) => {
    const length = decks[id].questions ? decks[id].questions.length : 0
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigateToDeck(id)}>
            <Text style={styles.titleText}>{decks[id].title}</Text>
            <Text style={styles.countText}>{length} {length === 1 ? 'card' : 'cards'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .25,
        borderColor: light_grey
    },

    titleText: {
        fontSize: 25,
        fontWeight: '700'
    },
    countText: {
        fontSize: 12

    }

})

function mapStateToProps(decks, props) {
    const { navigateToDeck, id } = props
    return {
        id, 
        decks,
        navigateToDeck
    }
}

export default withNavigation(connect(mapStateToProps)(DeckList))

