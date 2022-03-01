import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { renderHook } from "test";
import { useLocalDate } from "./useLocalDate";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("generates correct local date", () => {
    act(() => {
        const { hookValue } = renderHook(() => useLocalDate(), {
            contextName: "TranslationProvider",
            contextValue: { local: "en-GB" },
        });
        expect(hookValue.toLocalDate(1644675215 * 1000, "YYYY")).toBe("2022");
        expect(hookValue.toLocalDate(1644675215 * 1000, "DD")).toBe("12");
        expect(hookValue.toLocalDate(1644675215 * 1000, "MM")).toBe("2");
        expect(hookValue.toLocalDate(1644675215 * 1000, "MMMM")).toBe("February");
    });
});

it("generates correct local date in fa-IR", () => {
    act(() => {
        const { hookValue } = renderHook(() => useLocalDate(), {
            contextName: "TranslationProvider",
            contextValue: { local: "fa-IR" },
        });
        expect(hookValue.toLocalDate(1644675215 * 1000, "YYYY")).toBe("۱۴۰۰");
        expect(hookValue.toLocalDate(1644675215 * 1000, "DD")).toBe("۲۳");
        expect(hookValue.toLocalDate(1644675215 * 1000, "MM")).toBe("۱۱");
        expect(hookValue.toLocalDate(1644675215 * 1000, "MMMM")).toBe("بهمن");
        expect(hookValue.toLocalDate(1639408494 * 1000, "MMMM")).toBe("آذر");
    });
});
