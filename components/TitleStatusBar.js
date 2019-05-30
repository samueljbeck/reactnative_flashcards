import React, { Component } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { dark_grey } from '../utils/colors'
import { Constants } from 'expo'
import { connect } from 'react-redux'

export default class TitleStatusBar extends Component {


    render() {
        return (
            <View style={styles.titleView}>
                <StatusBar backgroundColor={dark_grey} barStyle="light-content"/>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    titleView: {
        backgroundColor: dark_grey,
        height: Constants.statusBarHeight,
    }
})
