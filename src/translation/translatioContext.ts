import React from "react";

type PropsType = {
    local: string;
    setLocal: (locale: string) => void;
};
const TranslationContext = React.createContext<PropsType>({
    local: "fa-IR",
    setLocal: (newLocal: string) => newLocal,
});

export { TranslationContext };
