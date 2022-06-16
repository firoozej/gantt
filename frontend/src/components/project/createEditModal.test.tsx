import { fireEvent } from "@testing-library/react";
import { CREATE_PROJECT } from "data";
import { renderComponent } from "test";
import CreateEditModal from "./createEditModal";

describe("Create Project: <CreateEditModal />", () => {
    it("should call onSave with correct data", async () => {
        const spy = jest.fn();
        const { findByLabelText, findByText } = renderComponent({
            component: <CreateEditModal visible={true} onClose={jest.fn()} onSave={spy} />,
            mocks: [
                {
                    request: {
                        query: CREATE_PROJECT,
                        variables: {
                            title: "project1",
                            start: "2022-01-01",
                            predictedEnd: "2022-06-01",
                        },
                    },
                    result: {
                        data: {
                            projects: {
                                id: "1",
                                title: "project1",
                                start: "2022-01-01",
                                predictedEnd: "2022-06-01",
                            },
                        },
                    },
                },
            ],
        });

        fireEvent.change(await findByLabelText("Title"), { target: { value: "project1" } });
        fireEvent.change(await findByLabelText("Start"), { target: { value: "2022-01-01" } });
        fireEvent.change(await findByLabelText("Predicted End"), { target: { value: "2022-06-01" } });
        fireEvent.click(await findByText("OK"));
        expect(spy).toHaveBeenCalledWith({ id: "1", title: "project1" });
    });
});
