/* eslint-disable react-hooks/rules-of-hooks */
import { colors } from '@/constants/styles';
import { ThemeContext } from '@/context/themeContext';
import React, { useContext } from 'react';
import { BaseToastProps, ErrorToast, InfoToast, SuccessToast } from 'react-native-toast-message';

interface CustomToastProps extends BaseToastProps {
    text1?: string;
    text2?: string;
}

const toastConfig = {
    error: (props: BaseToastProps) => {
        const { primary, secondary } = useContext(ThemeContext)
        return (
            <ErrorToast
                {...props}
                style={{ backgroundColor: primary, borderLeftColor: 'red' }}
                text1Style={{ color: secondary, fontSize: 18 }}
                text2Style={{ color: secondary, fontSize: 14 }} />
        )
    },
    success: (props: BaseToastProps) => {
        const { primary, secondary } = useContext(ThemeContext)
        return (
            <SuccessToast
                {...props}
                style={{ backgroundColor: primary, borderLeftColor: 'green' }}
                text1Style={{ color: secondary, fontSize: 18 }}
                text2Style={{ color: secondary, fontSize: 14 }} />
        )
    },
    info: (props: BaseToastProps) => {
        const { primary, secondary } = useContext(ThemeContext)
        return (
            <InfoToast
                {...props}
                style={{ backgroundColor: primary, borderLeftColor: 'teal' }}
                text1Style={{ color: secondary, fontSize: 18 }}
                text2Style={{ color: secondary, fontSize: 14 }} />
        )
    },
};

export default toastConfig;
