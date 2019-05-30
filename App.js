import React from 'react';
import { View} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import TitleStatusBar from './components/TitleStatusBar'
import { setLocalNotification } from './utils/helpers'
import DeckHolder from './components/DeckHolder'



export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>          
          <TitleStatusBar />
          <DeckHolder />
        </View>
      </Provider>
    );
  }
}

