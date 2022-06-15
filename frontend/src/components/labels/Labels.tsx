import React, { useState } from "react";
import Toolbar from "./toolbar";
const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee",
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222",
    },
};

export const ThemeContext = React.createContext<any>(null);
const Labels = () => {
    const [dark, setDark] = useState({
        foreground: "#ffffff",
        background: "#222222",
    });

    return (
        //<ThemeContext.Provider value={dark}>
        <>
            <Toolbar />
            <button
                onClick={() =>
                    setDark({
                        foreground: "#ffffff",
                        background: "#222223",
                    })
                }>
                hey
            </button>
        </>
        //</ThemeContext.Provider>
    );
};

export default Labels;
