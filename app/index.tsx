import CardBacking from '@/components/CardBacking';
import { ThemeContext } from '@/context/themeContext';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const Index = () => {
    const router = useRouter();
    const { primary, secondary, colorScheme } = useContext(ThemeContext);

    return (
        <View style={[styles.baseContainer, { backgroundColor: primary }]}>
            <CardBacking mode={colorScheme || "light"} style={{ flex: 1, height: '30%' }} />
            <FlatList
                contentContainerStyle={styles.menuContainer}
                data={[
                    { label: "Play", value: "play" },
                    { label: "Training", value: "trainingMenu" },
                    { label: "Info", value: "info" }
                ]}
                keyExtractor={item => item.value}
                renderItem={({ item }: { item: { label: string, value: string } }) => (
                    <Pressable
                        key={item.value}
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? secondary : primary },
                            { ...styles.menuItem, borderColor: secondary }
                        ]}
                        onPress={() => { router.push(`./${item.value}`) }}>
                        {({ pressed }) => (
                            <Text style={pressed ? { ...styles.menuItemText, color: primary } : { ...styles.menuItemText, color: secondary }}>
                                {item.label}
                            </Text>
                        )}
                    </Pressable>
                )}
            />
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 36,
        textAlign: 'center'
    },
    menuContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: -100,
    },
    menuItem: {
        width: 300,
        paddingHorizontal: 40,
        borderWidth: 2,
        height: 50,
        borderRadius: 25,
        marginBottom: 17,
    },
    menuItemText: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    footerContainer: {
        flex: 1,
    },
})
