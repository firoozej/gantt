import { fireEvent } from "@testing-library/react";
import { Menu } from "ui-ant";
import { renderComponent } from "test";
import IndentMenu from "./indentMenu";

describe("<IndentMenu />", () => {
    let tasks = [
        {
            id: 1,
            order: 0,
            name: "task1",
            duration: 1,
            start: 1,
            predecessors: {},
            resources: [],
            children: [],
        },
        {
            id: 2,
            order: 1,
            name: "task2",
            duration: 1,
            start: 1,
            predecessors: {},
            resources: [],
            children: [],
        },
        {
            id: 3,
            order: 2,
            name: "task3",
            duration: 1,
            start: 1,
            predecessors: {},
            resources: [],
            children: [
                {
                    id: 4,
                    order: 3,
                    name: "task4",
                    duration: 1,
                    start: 1,
                    predecessors: {},
                    resources: [],
                    children: [],
                },
                {
                    id: 5,
                    order: 4,
                    name: "task5",
                    duration: 1,
                    start: 1,
                    predecessors: {},
                    resources: [],
                    children: [],
                },
            ],
        },
    ];

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

    it("should disable indent menu if parent and its children is selected", async () => {
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
