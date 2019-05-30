import React, { Component } from 'react'
import { TextInput, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { grey, white, light_grey, dark_grey } from '../utils/colors'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'


const styles = StyleSheet.create({
    container: {
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
        margin: 25,
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


class AddCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            question: '',
            answer: ''
        }
    }

    static navigationOptions = {

        title: 'AddCard',
        headerStyle: {
            backgroundColor: grey,
            height: 56,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            }
        },
        headerTintColor: white,
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    submit = () => {
        const { deckId, deck } = this.props
        const {question, answer} = this.state
        if (question === '' || answer === '') {
            alert('Both and question and an answer are required.')
            return 
        }

        this.props.dispatch(addCard(deckId, question, answer))
        addCardToDeck(deckId, question, answer)
        this.setState({
            question: '',
            answer: ''
        })
        this.props.navigation.goBack()
    }

    handleChange = (value, label) => {
        console.log(label)
        console.log(value)
        this.setState(() => ({
            [label]: value
        }))
    }

    render() {

        const { question, answer } = this.state

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text style={styles.titleText}>Question -</Text>
                <TextInput
                    value={question}
                    placeholder='Enter Question'
                    style={styles.textInput}
                    onChangeText={(question) => this.handleChange(question, 'question')}
                />

                <Text style={styles.titleText}>Answer -</Text>
                <TextInput
                    value={answer}
                    placeholder='Enter Answer'
                    style={styles.textInput}
                    onChangeText={(answer) => this.handleChange(answer, 'answer')}
                />
                
                <TouchableOpacity style={styles.button} onPress={this.submit}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps(state, { navigation }) {
    const { deckId } = navigation.state.params
    return {
        deckId,
        deck: state[deckId]
    }

}

export default connect(mapStateToProps)(AddCard)