import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import OptionsModal from './OptionsModal';
import { ThemeContext } from '@/context/themeContext';

interface PickerProps {
    options?: {
        label: string,
        value: any
    }[],
    actionOption?: {
        label: string,
        value: any
    },
    selected?: string,
    placeHolder: string,
    onSelection: (v: any) => void,
    onClose?: () => void,
    style?: StyleProp<ViewStyle>
}

const Picker = ({ options, actionOption, selected, placeHolder, style, onSelection, onClose }: PickerProps) => {

    const { primary, secondary } = useContext(ThemeContext);

    const [show, setShow] = useState(false);
    const [finalOptions, setFinalOptions] = useState(options);

    useEffect(() => {
        if (actionOption !== undefined) {
            let newOptions = options?.concat(actionOption)
            setFinalOptions(newOptions)
        }
    }, [options, actionOption])

    return (
        <View style={[styles.view, style]}>
            <Pressable
                style={({ pressed }) => [styles.pressable, { backgroundColor: primary }]}
                onPress={() => setShow(true)}>
                {({ pressed }) => (
                    <>
                        <Text style={[styles.text, {
                            color: secondary
                        }]}>{selected ? selected : placeHolder}</Text>

                        <Text style={[styles.symbol, {
                            color: pressed ? primary : secondary,
                            backgroundColor: pressed ? secondary : primary
                        }]}>▼</Text>
                    </>
                )}
            </Pressable>
            <OptionsModal
                visible={show}
                options={finalOptions}
                selected={selected}
                onDismiss={() => (setShow(false))}
                onSelection={(v) => { setShow(false); onSelection(v.value) }}
            />

        </View>
    )
}

export default Picker

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    pressable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    text: {
        fontSize: 20,
        borderRadius: 20,
    },
    symbol: {
        fontSize: 20,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 6,
    }
})
