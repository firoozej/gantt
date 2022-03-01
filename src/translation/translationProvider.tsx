import React, { Children, FunctionComponent, useState } from "react";
import { TranslationContext } from "./translatioContext";

type PropsType = {
    local: string;
    children: React.ReactNode;
};

type State = {
    local: string;
};

const TranslationProvider: FunctionComponent<PropsType> = ({ local, children }) => {
    const [state, setState] = useState<State>({
        local,
    });

    const setLocal = (newLocal: string) => setState({ local: newLocal });

    const value = {
        local: state.local,
        setLocal,
    };
    return (
        <TranslationContext.Provider value={value}>
            {Children.only(children)}
        </TranslationContext.Provider>
    );
};

export default TranslationProvider;
