import { act, fireEvent, waitFor } from "@testing-library/react";
import { CREATE_PROJECT } from "data";
import moment from "moment";
import { renderComponent } from "test";
import CreateEditModal from "./createEditModal";

describe("Create Project: <CreateEditModal />", () => {
    it("should call onSave with correct data", async () => {
        const spy = jest.fn();
        const { findByLabelText } = renderComponent({
            component: <CreateEditModal visible={true} onClose={() => {}} onSave={spy} />,
            mocks: [
                {
                    request: {
                        query: CREATE_PROJECT,
                        variables: {
                            title: "project1",
                            start: "2022-01-01",
                            //predictedEnd: "2022-06-01",
                        },
                    },
                    result: {
                        data: {
                            createProject: {
                                id: "1",
                                title: "project1",
                                start: "2022-01-01",
                                // predictedEnd: "2022-06-01",
                            },
                        },
                    },
                },
            ],
        });
        const title = await findByLabelText("Title");
        const start = await findByLabelText("Start");
        const end = await findByLabelText("Predicted End");

        fireEvent.change(title, { target: { value: "project1" } });
        fireEvent.mouseDown(start);
        fireEvent.change(start, {
            target: { value: "2022-01-01" },
        });
        fireEvent.click(document.querySelector(".ant-picker-cell-selected") as HTMLElement);
        fireEvent.mouseDown(end);
        fireEvent.change(end, {
            target: { value: "2022-06-01" },
        });
        fireEvent.click(document.querySelector(".ant-picker-cell-selected") as HTMLElement);
        fireEvent.click(await findByLabelText("ok"));

        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith({ id: "1", title: "project1", start: "2022-01-01" });
        });
    });
});
