import { fireEvent, waitFor } from "@testing-library/react";
import { CREATE_PROJECT } from "data";
import { renderComponent } from "test";
import CreateEditModal from "./createEditModal";

describe("<CreateEditModal />", () => {
    it("Title and Start Date should be required", async () => {
        const { findByLabelText, findByText } = renderComponent({
            component: <CreateEditModal visible={true} onClose={() => {}} />,
        });

        fireEvent.click(await findByLabelText("ok"));

        expect(await findByText("Title is required")).toBeVisible();
        expect(await findByText("Start Date is required")).toBeVisible();
    });
    it.only("Predicated End should be after Start Date", async () => {
        const { findByLabelText, findByText } = renderComponent({
            component: <CreateEditModal visible={true} onClose={() => {}} />,
        });

        const title = await findByLabelText("Title");
        const start = await findByLabelText("Start Date");
        const end = await findByLabelText("Predicted End");

        fireEvent.change(title, { target: { value: "project1" } });

        fireEvent.mouseDown(start);
        fireEvent.change(start, {
            target: { value: "2022-02-01" },
        });
        fireEvent.click(document.querySelectorAll(".ant-picker-cell-selected")[0] as HTMLElement);

        fireEvent.mouseDown(end);
        fireEvent.change(end, {
            target: { value: "2022-01-01" },
        });
        fireEvent.click(document.querySelectorAll(".ant-picker-cell-selected")[1] as HTMLElement);

        fireEvent.click(await findByLabelText("ok"));

        expect(await findByText("Predicated End should be after Start Date")).toBeVisible();
    });
    it("Should call create project", async () => {
        let endpointCalled = false;
        const { findByLabelText } = renderComponent({
            component: <CreateEditModal visible={true} onClose={() => {}} />,
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
                    result: () => {
                        endpointCalled = true;
                        return {
                            data: {
                                createProject: {
                                    id: "1",
                                    title: "project1",
                                    start: "2022-01-01",
                                    predictedEnd: "2022-06-01",
                                },
                            },
                        };
                    },
                },
            ],
        });

        const title = await findByLabelText("Title");
        const start = await findByLabelText("Start Date");
        const end = await findByLabelText("Predicted End");

        fireEvent.change(title, { target: { value: "project1" } });

        fireEvent.mouseDown(start);
        fireEvent.change(start, { target: { value: "2022-01-01" } });
        fireEvent.click(document.querySelectorAll(".ant-picker-cell-selected")[0] as HTMLElement);

        fireEvent.mouseDown(end);
        fireEvent.change(end, { target: { value: "2022-06-01" } });
        fireEvent.click(document.querySelectorAll(".ant-picker-cell-selected")[1] as HTMLElement);

        fireEvent.click(await findByLabelText("ok"));

        await waitFor(() => expect(endpointCalled).toBeTruthy());
    });
});
