import React, { useState } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import CssBaseline from '@mui/material/CssBaseline';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Gantt from "./components/gantt/ganttChart";
import TranslationProvider from "./translation/translationProvider";
import { resources } from "translation/resources";
import { initialGanttData } from "test";
import ProjectOverview from "components/project/overview";

const App: React.FC = () => {
    const [hasApiError, setHasApiError] = useState(false);
    const data = { ...initialGanttData };
    i18n.use(initReactI18next)
        .init({
            resources,
            lng: "en",
            interpolation: {
                escapeValue: false,
            },
        });

    const httpLink = new HttpLink({
        uri: "http://localhost:4001/graphql",
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        let errorMessage = "";
        if (graphQLErrors)
            graphQLErrors.forEach(
                ({ message, locations, path }) =>
                    (errorMessage += `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
            );

        if (networkError) errorMessage = `[Network error]: ${networkError}`;
        setHasApiError(true);
    });

    const client = new ApolloClient({
        link: from([errorLink, httpLink]),
        cache: new InMemoryCache(),
    });

    return (
        <div style={{ width: "95%", margin: "20px auto" }}>
            <TranslationProvider local="en-GB">
                <ApolloProvider client={client}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <CssBaseline />
                        <Router>
                            <Routes>
                                <Route path="/projects" element={<ProjectOverview />} />
                                <Route
                                    path="/"
                                    element={
                                        <Gantt
                                            data={data}
                                            onTaskEdit={() => {
                                                console.log("yes");
                                            }}
                                        />
                                    }
                                />
                            </Routes>
                        </Router>
                    </LocalizationProvider>
                </ApolloProvider>
            </TranslationProvider>
        </div>
    );
};

export default App;
