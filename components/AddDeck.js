import React, { Component } from 'react'
import { KeyboardAvoidingView, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {light_grey, dark_grey, white} from '../utils/colors'
import { saveDeckTitle } from '../utils/api';
import { connect } from 'react-redux'
import { addDeck } from '../actions'

class AddDeck extends Component {

    constructor(props) {
        super(props)
        this.state = {
            deck: ''
        }
    }

    submit = () => {
        const { deck } = this.state
        if (deck === '') {
            return
        }
        
        let id = deck.replace(' ', '_')
        this.props.dispatch(addDeck(id, {title:deck, questions:[]}))
        saveDeckTitle(id, deck)
        this.setState({deck: ''})
        this.props.navigation.navigate('Deck', {deckId: id})

    }


    render() {
        const { deck } = this.state
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text style={styles.titleText}>What is the title of your new deck?</Text>
                <TextInput
                    value={deck}
                    placeholder='Deck Title'
                    style={styles.textInput}
                    onChangeText={(deck) => this.setState({ deck })}
                />
                <TouchableOpacity style={styles.button} onPress={this.submit}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',

    },

    titleText: {
        fontSize: 25,
        fontWeight: '700',
        width: '75%'
    },

    textInput: {
        height: 40,
        borderColor: light_grey,
        borderWidth: .5,
        margin: 35,
        width: '80%',
        padding: 5

    },
    submitText: {
        fontSize: 20,
        color: white
    },
    button: {
        width: '60%',
        backgroundColor: dark_grey,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5

    }
})

export default connect()(AddDeck)