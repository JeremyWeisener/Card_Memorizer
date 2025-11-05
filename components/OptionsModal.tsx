import React, { useContext } from 'react';
import { View, Text, StyleSheet, ModalProps, FlatList, Pressable, Dimensions } from 'react-native';
import AnimatedModal from './AnimatedModal';
import { ThemeContext } from '@/context/themeContext';
import { SlideInDown, SlideOutDown, SlideOutLeft } from 'react-native-reanimated';

interface option {
    label: string;
    value: string;
}

interface OptionsModalProps extends ModalProps {
    options?: option[],
    onSelection: (selected: option) => void;
    selected?: string;
}

const { height } = Dimensions.get("screen")

const OptionsModal = (props: OptionsModalProps) => {

    const { primary, secondary } = useContext(ThemeContext);


    return (
        <AnimatedModal {...props} position='bottom' entering={SlideInDown} exiting={SlideOutDown} fade containerStyle={[{ backgroundColor: 'rgba(0,0,0,0.3)' }]}>
            <View style={[styles.content, { backgroundColor: primary, borderColor: secondary }]}>
                <FlatList
                    data={props.options}
                    contentContainerStyle={[styles.list]}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => props.onSelection(item)}
                            style={({ pressed }) => [
                                styles.item,
                                {
                                    borderColor: secondary,
                                    backgroundColor: pressed
                                        ? item.value === props.selected ? primary : secondary
                                        : item.value === props.selected ? secondary : primary
                                }
                            ]}>
                            {({ pressed }) => (
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            color: pressed
                                                ? item.value === props.selected ? secondary : primary
                                                : item.value === props.selected ? primary : secondary,
                                        }
                                    ]}>
                                    {item.label}
                                </Text>
                            )}
                        </Pressable>
                    )}
                />
            </View>
        </AnimatedModal>
    )
}

export default OptionsModal

const styles = StyleSheet.create({
    content: {
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        paddingVertical: 30,
        paddingBottom: 50,
        height: height * 0.42,
    },
    list: {

    },
    item: {
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    text: {
        fontSize: 24,
        textAlign: 'center'
    }
})
