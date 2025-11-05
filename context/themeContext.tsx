import { useColorScheme } from 'react-native';
import React, {
    createContext,
    useMemo,
} from 'react';
import { colors } from '@/constants/styles';

export const ThemeContext = createContext({
    primary: colors['light'].primary,
    secondary: colors['light'].secondary,
    colorScheme: "light"
});

export const ThemeConsumer = ({ children }) => (
    <ThemeContext.Consumer>
        {(context) => {
            if (context === undefined) {
                throw new Error('ThemeConsumer must be used within a ThemeProvider');
            }
            return children(context);
        }}
    </ThemeContext.Consumer>
);

export const ThemeProvider = ({ children }) => {

    const colorScheme = useColorScheme() || "light";

    const MemoizedValue = useMemo(() => ({
        primary: colors[colorScheme].primary,
        secondary: colors[colorScheme].secondary,
        colorScheme
    }), [colorScheme]);

    return (
        <ThemeContext.Provider value={MemoizedValue}>
            {children}
        </ThemeContext.Provider>
    );
};

