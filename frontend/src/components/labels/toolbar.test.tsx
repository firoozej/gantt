import { render } from "@testing-library/react";
import Toolbar from "./toolbar";
import * as hooks from "./useData";

describe("Create Project: <CreateEditModal />", () => {
    it("should call onSave with correct data", async () => {
        jest.spyOn(hooks, "useData").mockImplementation(() => ({
            data: {title: "title2"},
            loading: false,
        }));
        const { findByText } = render(<Toolbar />);
        expect(await findByText('title2')).toBeInTheDocument();
    });
});
