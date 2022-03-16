import { fireEvent } from "@testing-library/react";
import { Menu } from "ui-ant";
import { initialGanttData, renderComponent } from "test";
import IndentMenu from "./indentMenu";

describe("<IndentMenu />", () => {
    let tasks = [...initialGanttData.tasks];

    it("should disable indent menu if selected tasks are not adjacent", async () => {
        const selectedTasks = [tasks[1], tasks[2].children[0]];
        const spy = jest.fn();
        const { findByText } = renderComponent(
            <Menu>
                <IndentMenu tasks={tasks} selectedTasks={selectedTasks} onTasksChange={spy} />
            </Menu>
        );
        fireEvent.click(await findByText("Indent Task"));
        expect(spy).not.toHaveBeenCalled();
    });

    it("should disable indent menu if summary task is the parent of the selected tasks", async () => {
        const selectedTasks = [tasks[2].children[0], tasks[2].children[1]];
        const spy = jest.fn();
        const { findByText } = renderComponent(
            <Menu>
                <IndentMenu tasks={tasks} selectedTasks={selectedTasks} onTasksChange={spy} />
            </Menu>
        );
        fireEvent.click(await findByText("Indent Task"));
        expect(spy).not.toHaveBeenCalled();
    });

    it("should disable indent menu if parent and some of its children is selected", async () => {
        const selectedTasks = [tasks[2], tasks[2].children[0]];
        const spy = jest.fn();
        const { findByText } = renderComponent(
            <Menu>
                <IndentMenu tasks={tasks} selectedTasks={selectedTasks} onTasksChange={spy} />
            </Menu>
        );
        fireEvent.click(await findByText("Indent Task"));
        expect(spy).not.toHaveBeenCalled();
    });
});
