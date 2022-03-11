import { findTaskByOrder } from "./findTaskByOrder";

describe("find task by order", () => {
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
                    children: [
                        {
                            id: 6,
                            order: 5,
                            name: "task6",
                            duration: 1,
                            start: 1,
                            predecessors: {},
                            resources: [],
                            children: [],
                        },
                    ],
                },
            ],
        },
    ];
    it("should work if it is the first task", () => {
        const task = findTaskByOrder(tasks, 0);
        expect(task.id).toBe(1);
    });
    it("should work if it is in first level children", () => {
        const task = findTaskByOrder(tasks, 3);
        expect(task.id).toBe(4);
    });
    it("should work if it is in second level children", () => {
        const task = findTaskByOrder(tasks, 5);
        expect(task.id).toBe(6);
    });
});
