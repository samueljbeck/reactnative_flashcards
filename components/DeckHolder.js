import React from 'react';
import { Platform } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { grey, amber } from '../utils/colors'
import Decks from './Decks'
import AddDeck from './AddDeck'
import Deck from './Deck'
import AddCard from './AddCard'
import Card from './Card'


const Tabs = {
  Decks: {
    screen: Decks, 
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ grey }) => <Ionicons name='list-box' size={30} color={grey} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ grey }) => <FontAwesome name='plus-square' size={30} color={grey} />
    },
  }

}

const navigationOptions = {

  tabBarOptions: {
    activeTintColor: amber,
    style: {
      height: 56,
      backgroundColor: grey,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}


const TabNav = createAppContainer(Platform.OS === 'ios' ? createBottomTabNavigator(Tabs, navigationOptions) : createMaterialTopTabNavigator(Tabs, navigationOptions))

const DeckHolder = createAppContainer(createStackNavigator({
  Home: {
    screen: TabNav,
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck,
  },
  AddCard: {
    screen: AddCard,
  },
  Card: {
    screen: Card
  }
}))

export default DeckHolder