import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { white, green, red, grey, blue } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Card extends React.Component {

    componentDidMount() {
        clearLocalNotification()
            .then(setLocalNotification())
    }

    constructor(props) {
        super(props) 
        this.state = {
            question: 0,
            correct: 0,
            incorrect: 0,
            answerShowing: false,
            scoreShowing: false
        }        
    }


    static navigationOptions = {

        title: 'Quiz',
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


    handleAswer = (answer) => {
        this.setState((state) => ({
            question: state.question === this.props.deck.questions.length - 1 ? state.question : state.question +1,
            correct: answer === 'correct' ? state.correct + 1 : state.correct,
            incorrect: answer === 'incorrect' ? state.incorrect + 1 : state.incorrect,
            answerShowing: false,
            scoreShowing: state.question === this.props.deck.questions.length - 1 ? true : false
        }))
    }

    handleQAVisibility = () => {
        this.setState((state) => ({
            answerShowing: state.answerShowing === true ? false : true          
        }))
    }

    restartQuiz = () => {
        this.setState(() => ({
            question: 0,
            correct: 0,
            incorrect: 0,
            answerShowing: false,
            scoreShowing: false
        }))
    }

    returnToDeck = () => {
        const {deckId} = this.props
        this.props.navigation.navigate('Deck', { deckId: deckId })
    }
    

    render() {
        const { question, scoreShowing, correct, incorrect, answerShowing } = this.state
        const {deck} = this.props
        return (
            <View style={flex=1}>
                {scoreShowing ?
                    <View style={styles.container}>
                        <Text style={styles.qaText}>{deck.questions.length} questions answered</Text>  
                        <Text style={styles.qaText}>{correct} Correct</Text>
                        <Text style={styles.qaText}>{incorrect} Inorrect</Text>
                        <Text style={styles.qaText}>Score: {Math.round((correct / deck.questions.length) * 100)}%</Text>
                        <TouchableOpacity style={styles.restartButton} onPress={() => this.restartQuiz()}>
                            <Text style={styles.submitText}>RestartQuiz</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.returnButton} onPress={() => this.returnToDeck()}>
                            <Text style={styles.submitText}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                :       
                    <View style={styles.container}>    
                        <Text>Question {question + 1} of {deck.questions.length}</Text>
                        {answerShowing ?
                            <View style={styles.container}>
                                <Text style={styles.qaText}>
                                    {deck.questions[question].answer}
                                </Text>
                                <Text style={styles.showText} onPress={this.handleQAVisibility}>
                                    Show Question
                                </Text>
                            </View>
                        :
                            <View style={styles.container}>
                                <Text style={styles.qaText}>
                                    {deck.questions[question].question}
                                </Text>
                                <Text style={styles.showText} onPress={this.handleQAVisibility}>
                                    Show Answer
                                </Text>
                            </View>
                        }
                        <TouchableOpacity style={styles.correctButton} onPress={() => this.handleAswer('correct')}>
                            <Text style={styles.submitText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.incorrectButton} onPress={() => this.handleAswer('incorrect')}>
                            <Text style={styles.submitText}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',

    },

    showText: {
        fontSize: 20,
        fontWeight: '700',
        width: '75%',
        color: blue
    },

    submitText: {
        fontSize: 20,
        color: white
    },

    qaText: {
        fontSize: 25,
        fontWeight: '700',
        width: '100%',
        margin: 25
    },

    correctButton: {
        width: '60%',
        backgroundColor: green,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 25
    },
    incorrectButton: {
        width: '60%',
        backgroundColor: red,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    restartButton: {
        width: '60%',
        backgroundColor: blue,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    returnButton: {
        width: '60%',
        backgroundColor: grey,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 10
    }

})


function mapStateToProps (state, {navigation}) {
    const {deckId} = navigation.state.params
    return {
        deckId,
        deck: state[deckId]
    }
}

export default connect(mapStateToProps) (Card)