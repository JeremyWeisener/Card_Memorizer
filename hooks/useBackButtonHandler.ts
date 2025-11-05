// hooks/useBackButtonHandler.js
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Href, useRouter } from "expo-router";

interface useBackButtonHandlerProps {
    url: Href;
}

export const useBackButtonHandler = (props: useBackButtonHandlerProps) => {
    const router = useRouter();
    const navigation = useNavigation();

    // Effect
    useEffect(() => {
        const listener = navigation.addListener("beforeRemove", (e) => {
            e.preventDefault();
            router.push(props.url);
        });
        return () => {
            navigation.removeListener("beforeRemove", listener);
        };
    }, [navigation, router, props.url]);
};
