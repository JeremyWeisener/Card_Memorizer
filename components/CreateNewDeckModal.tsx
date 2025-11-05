import { ThemeContext } from '@/context/themeContext';
import React, { useContext } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const CreateNewDeckModal = ({ visible, text, onChange, onClose, onPress }: { visible: boolean, text: string, onChange: (v: string) => void, onClose: () => void, onPress: () => void }) => {

    const { primary, secondary } = useContext(ThemeContext);

    return (
        <Modal
            visible={visible}
            animationType='slide'
            transparent={true}
            onRequestClose={onClose}>
            <View style={[styles.modalView, { backgroundColor: primary, borderColor: secondary }]}>
                <View style={[styles.headerView]}>
                    <Text style={[styles.header, { color: secondary }]}>Create New Deck</Text>
                    <Pressable onPress={onClose}>
                        <Text style={[styles.header, { color: secondary }]}>X</Text>
                    </Pressable>
                </View>
                <TextInput style={[styles.inputText, { color: secondary, borderColor: secondary }]} value={text} onChangeText={(v) => onChange(v)} />
                <Pressable style={[styles.buttonPressable, { borderColor: secondary }]} onPress={onPress}>
                    <Text style={[styles.buttonText, { color: secondary }]}>Create</Text>
                </Pressable>
            </View>

        </Modal>
    )
}

export default CreateNewDeckModal

const styles = StyleSheet.create({
    modalView: {
        // marginVertical: 'auto',
        marginTop: '70%',
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
        width: '85%',
        marginHorizontal: 'auto',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    menuItemText: {
        marginHorizontal: 'auto',
        fontSize: 22,
        fontWeight: 600
    },
    menuItem: {
        width: '50%',
        marginVertical: 15,
        paddingVertical: 10,
        marginHorizontal: 'auto',
        borderRadius: 5,
        borderWidth: 2,
    },
    headerView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    header: {
        fontSize: 24
    },
    buttonPressable: {
        marginHorizontal: 'auto',
        marginVertical: 12,
        padding: 5
    },
    buttonText: {
        fontSize: 20,
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 25
    },
    inputText: {
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 20,
        textAlign: 'center'
    },

})
