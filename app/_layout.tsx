import toastConfig from "@/config/toastConfig";
import { colors } from "@/constants/styles";
import { Card, Deck } from "@/data/RealmStorage";
import { ThemeProvider } from "@/context/themeContext";
import { RealmProvider } from "@realm/react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-get-random-values';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const { primary, secondary } = colors[colorScheme || "light"];
    return (
        <>
            <RealmProvider schema={[Deck, Card]} schemaVersion={1}>
                <GestureHandlerRootView>
                    <ThemeProvider>
                        <Stack>
                            <Stack.Screen
                                name="index"
                                options={{
                                    title: "Card Memorizer",
                                    headerTintColor: secondary,
                                    headerStyle: {
                                        backgroundColor: primary
                                    },
                                    headerTitleStyle: {
                                        fontSize: 24,
                                        color: secondary
                                    },
                                    headerShown: true,
                                }} />
                            <Stack.Screen
                                name="play"
                                options={{
                                    title: "Play",
                                    headerTintColor: secondary,
                                    headerStyle: {
                                        backgroundColor: primary
                                    },
                                    headerTitleStyle: {
                                        fontSize: 24,
                                        color: secondary
                                    },
                                    headerShown: true,
                                }} />
                            <Stack.Screen
                                name="trainingMenu"
                                options={{
                                    title: "Training Menu",
                                    headerTintColor: secondary,
                                    headerStyle: {
                                        backgroundColor: primary
                                    },
                                    headerTitleStyle: {
                                        fontSize: 24,
                                        color: secondary
                                    },
                                    headerShown: true,
                                }} />
                            <Stack.Screen
                                name="training"
                                options={{
                                    title: "Training",
                                    headerTintColor: secondary,
                                    headerStyle: {
                                        backgroundColor: primary
                                    },
                                    headerTitleStyle: {
                                        fontSize: 24,
                                        color: secondary
                                    },
                                    headerShown: true,
                                }} />
                            {/* <Stack.Screen 
                name="settings"
                options={{
                  title: "Settings",
                  headerTintColor:secondary,
                  headerStyle: {
                    backgroundColor: primary
                  },
                  headerTitleStyle: {
                    fontSize: 24,
                    color: secondary
                  },
                  headerShown: true,
                }} /> */}
                            <Stack.Screen
                                name="leaderboard"
                                options={{
                                    title: "Leaderboard",
                                    headerTintColor: secondary,
                                    headerStyle: {
                                        backgroundColor: primary
                                    },
                                    headerTitleStyle: {
                                        fontSize: 24,
                                        color: secondary
                                    },
                                    headerShown: true,
                                }} />
                            <Stack.Screen
                                name="results"
                                options={{
                                    title: "Results",
                                    headerTintColor: secondary,
                                    headerStyle: {
                                        backgroundColor: primary
                                    },
                                    headerTitleStyle: {
                                        fontSize: 24,
                                        color: secondary
                                    },
                                    headerShown: true,
                                }} />
                            <Stack.Screen
                                name="selectMode"
                                options={{
                                    title: "Select Mode",
                                    headerTintColor: secondary,
                                    headerStyle: {
                                        backgroundColor: primary
                                    },
                                    headerTitleStyle: {
                                        fontSize: 24,
                                        color: secondary
                                    },
                                    headerShown: true,
                                }} />
                            <Stack.Screen
                                name="customize"
                                options={{
                                    title: "Custom",
                                    headerTintColor: secondary,
                                    headerStyle: {
                                        backgroundColor: primary
                                    },
                                    headerTitleStyle: {
                                        fontSize: 24,
                                        color: secondary
                                    },
                                    headerShown: true,
                                }} />
                            <Stack.Screen
                                name="info"
                                options={{
                                    title: "Info",
                                    headerTintColor: secondary,
                                    headerStyle: {
                                        backgroundColor: primary
                                    },
                                    headerTitleStyle: {
                                        fontSize: 24,
                                        color: secondary
                                    },
                                    headerShown: true,
                                }} />
                        </Stack>
                        <Toast config={toastConfig} />
                    </ThemeProvider>
                </GestureHandlerRootView>
            </RealmProvider>
        </>
    );
}
