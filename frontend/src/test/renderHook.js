import { render } from "@testing-library/react";
import TranslationProvider from "translation/translationProvider";

const TestHook = ({ children, hook }) => {
    return children(hook());
};

export function renderHook(hook, { contextName, contextValue } = {}) {
    let hookValue = null;

    const children = (props) => {
        hookValue = props;
        return <p>child</p>;
    };

    const childrenMock = jest.fn().mockImplementation(children);

    let result = {};

    if (contextName === "TranslationProvider") {
        result = render(
            <TranslationProvider {...contextValue}>
                <TestHook children={childrenMock} hook={hook} />
            </TranslationProvider>,
        );
    } else {
        result = render(<TestHook children={childrenMock} hook={hook} />);
    }

    return {
        ...result,
        hookValue,
    };
}
