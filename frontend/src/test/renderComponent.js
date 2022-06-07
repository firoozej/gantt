import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import TranslationProvider from "translation/translationProvider";

export function renderComponent({ component, options = {}, mocks = [] }) {
    i18next.use(initReactI18next).init({
        resources: {},
        lng: "en",
        interpolation: {
            escapeValue: false,
        },
    });
    const renderResult = render(
        <TranslationProvider local="en-GB">
            <MockedProvider mocks={mocks} addTypename={false}>
                {component}
            </MockedProvider>
        </TranslationProvider>,
        options
    );

    return {
        ...renderResult,
        rerender: newComponent => {
            return renderResult.rerender(
                <TranslationProvider local="en-GB">{newComponent}</TranslationProvider>
            );
        },
    };
}
