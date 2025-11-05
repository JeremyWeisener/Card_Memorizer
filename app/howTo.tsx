import { ThemeContext } from '@/context/themeContext'
import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Info = () => {

    const { primary, secondary } = useContext(ThemeContext)

    return (
        <View style={[styles.container, { backgroundColor: primary }]}>
            <Text style={[styles.body, { color: secondary }]}>The idea of this app is based around a concept from The Memory Book by Harry Lorayne & Jerry Lucas where you assign a mnemonic device to each card to help memorize them. </Text>
            <Text style={[styles.body, { color: secondary }]}>First you memorize the word associated with each card. (What training mode is for)</Text>
            <Text style={[styles.body, { color: secondary }]}>Then you put it to the test by removing `x` number of cards from the deck without looking at them, go through every remaining card and at the end you attempt to identify the cards missing.</Text>
        </View>
    )
}

export default Info

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 20
    },
    header: {
        fontSize: 36,
        textAlign: 'center',
        paddingBottom: 10,
    },
    body: {
        fontSize: 16,
        paddingBottom: 8,
    }
})
