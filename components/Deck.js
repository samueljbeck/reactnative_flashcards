import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { grey, white, light_grey, dark_grey } from '../utils/colors'
import { connect } from 'react-redux'
class Deck extends React.Component {

    constructor(props){
        super(props)
    }

    static navigationOptions = {
        
        title: 'Deck',
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

    handleNavigation(length) { 
        if (length > 0) {
            this.props.navigation.navigate('Card', { deckId: this.props.deckId })
        }
    }
    render() {
        
        const { deckId , deck } = this.props
        length = deck.questions ? deck.questions.length : 0
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>{deck.title}</Text>
                <Text style={styles.countText}>{length} {length === 1 ? 'card' : 'cards'}</Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate('AddCard', { deckId: deckId })}>
                        <Text style={styles.addText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={length === 0 ? styles.startButtonLight : styles.startButton} onPress={() => (this.handleNavigation(length))}>
                        <Text style={styles.startText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        borderWidth: .25,
        borderColor: light_grey
    },

    titleText: {
        fontSize: 45,
        fontWeight: '700'
    },
    countText: {
        fontSize: 25

    },
    startText: {
        fontSize: 20,
        color: white
    },
    startButton: {
        width: '60%',
        backgroundColor: dark_grey,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: '75%',
        margin: 25

    },
    startButtonLight: {
        width: '60%',
        backgroundColor: light_grey,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: '75%',
        margin: 25

    },
    addText: {
        fontSize: 20,
        color: white,
    },
    addButton: {
        backgroundColor: dark_grey,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: '75%',
        margin: 25

    },
    btnContainer: {
        flex: 1,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%'
    }

})

function mapStateToProps (state, {navigation}) {
    const {deckId} = navigation.state.params
    return {
        deckId,
        deck: state[deckId]
    }

}

export default connect(mapStateToProps)(Deck)