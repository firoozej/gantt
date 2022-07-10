import { waitFor, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UPDATE_PROJECT } from "data";
import { renderComponent } from "test";
import CreateEditModal from "./createEditModal";

describe("<CreateEditModal />", () => {
    it("Title and Start Date should be required", async () => {
        const user = userEvent.setup();
        await act(async () => {
            renderComponent({
                component: <CreateEditModal visible={true} onClose={() => {}} />,
            });
        });

        await act(async () => user.click(await screen.findByLabelText("ok")));

        expect(await screen.findByText("Title is required")).toBeVisible();
        expect(await screen.findByText("Start Date is required")).toBeVisible();
    });

    it("Predicated End should be after Start Date", async () => {
        const user = userEvent.setup();
        await act(async () => {
            renderComponent({
                component: (
                    <CreateEditModal
                        visible={true}
                        project={{
                            id: "1",
                            title: "project1",
                            start: "2022-02-01",
                            predictedEnd: "2022-01-01",
                            tasks: [],
                        }}
                        onClose={() => {}}
                    />
                ),
            });
        });

        await act(async () => user.click(await screen.findByLabelText("ok")));

        expect(await screen.findByText("Predicated End should be after Start Date")).toBeVisible();
    });

    it("Should call update project", async () => {
        const user = userEvent.setup();
        let endpointCalled = false;
        const onClose = jest.fn();
        await act(async () => {
            renderComponent({
                component: (
                    <CreateEditModal
                        visible={true}
                        project={{
                            id: "1",
                            title: "project1",
                            start: "2022-01-01",
                            predictedEnd: "2022-06-01",
                            tasks: [],
                        }}
                        onClose={onClose}
                    />
                ),
                mocks: [
                    {
                        request: {
                            query: UPDATE_PROJECT,
                            variables: {
                                id: "1",
                                title: "project1",
                                start: "2022-01-01",
                                predictedEnd: "2022-06-01",
                            },
                        },
                        result: () => {
                            endpointCalled = true;
                            return {
                                data: {
                                    updateProject: {
                                        id: "1",
                                        title: "project1",
                                        start: "2022-01-01",
                                        predictedEnd: "2022-06-01",
                                    },
                                },
                            };
                        },
                        delay: 20,
                    },
                ],
            });
        });
        
        await act(async () => user.click(await screen.findByLabelText("ok")));

        await waitFor(async () => {
            expect(await screen.findByRole("progressbar")).toBeInTheDocument();
        });
        await waitFor(() => expect(endpointCalled).toBeTruthy());
        await waitFor(() => expect(screen.queryByRole("progressbar")).not.toBeInTheDocument());
        await waitFor(() => expect(onClose).toHaveBeenCalled());
    });
});
