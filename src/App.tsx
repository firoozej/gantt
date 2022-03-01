import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import "antd/dist/antd.css";
import Gantt from "./components/gantt/ganttChart";
import TranslationProvider from "./translation/translationProvider";
import { resources } from "translation/resources";

const App: React.FC = () => {
    const data = {
        project: {
            start: 1633638600000,
            end: 1633638600000 + 3 * 24 * 60 * 60 * 1000,
            calendar: {
                dayDuration: 8 * 60 * 60 * 1000,
            },
        },
        resources: [
            {
                id: 1,
                name: "cnc1",
            },
            {
                id: 2,
                name: "cnc2",
            },
        ],
        tasks: [
            {
                id: 1,
                order: 1,
                name: "task1",
                duration: 2 * 24 * 60 * 60 * 1000,
                start: 1633725000000,
                predecessors: {},
                isSummary: false,
                resources: [],
            },
            {
                id: 2,
                order: 2,
                name: "task2",
                duration: 3 * 24 * 60 * 60 * 1000,
                start: 1633811400000,
                isSummary: false,
                predecessors: {},
                resources: [],
            },
        ],
    };
    i18n.use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources,
            lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
            // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
            // if you're using a language detector, do not define the lng option

            interpolation: {
                escapeValue: false, // react already safes from xss
            },
        });
    return (
        <div style={{ width: "95%", margin: "20px auto" }}>
            <TranslationProvider local="en-GB">
                <Gantt
                    data={data}
                    onTaskEdit={() => {
                        console.log("yes");
                    }}
                />
            </TranslationProvider>
        </div>
    );
};

export default App;
