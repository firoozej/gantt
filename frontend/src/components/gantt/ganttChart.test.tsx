import { fireEvent, waitFor } from "@testing-library/react";
import { initialGanttData, renderComponent } from "test";
import GanttChart from "./ganttChart";

describe("<ganttChart />", () => {
    let data = { ...initialGanttData };

    it("should indent tasks", async () => {
        const spy = jest.fn();
        const { findByText, getByLabelText, queryByText } = renderComponent({
            component: <GanttChart data={data} onTaskEdit={spy} />,
        });
        fireEvent.click(await findByText("task3"));
        fireEvent.click(await findByText("task7"));

        fireEvent.mouseOver(await findByText("Schedule"));
        fireEvent.click(await findByText("Indent Task"));

        const task2 = queryByText("task3");
        const task3 = queryByText("task7");
        expect(task2).toBeNull();
        expect(task3).toBeNull();

        fireEvent.click(getByLabelText("expand task2"));
        expect(task2).not.toBeNull();
        expect(task3).not.toBeNull();
    });
});
