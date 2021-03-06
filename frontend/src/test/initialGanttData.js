const initialGanttData = {
    project: {
        start: 1633638600000,
        end: 1633638600000 + 3 * 24 * 60 * 60 * 1000,
        calendar: {
            dayDuration: 8 * 60,
        }
    },
    tasks: [
        {
            id: 1,
            sibling: 1,
            parent: null,
            name: "task1",
            duration: 8 * 60,
            start: 1633638600000,
            children: [],
        },
        {
            id: 2,
            sibling: 2,
            parent: null,
            name: "task2",
            duration: 8 * 60,
            start: 1633638600000,
            children: [],
        },
        {
            id: 3,
            sibling: 3,
            parent: null,
            name: "task3",
            duration: 8 * 60,
            start: 1633638600000,
            children: [
                {
                    id: 4,
                    sibling: 1,
                    parent: 3,
                    name: "task4",
                    duration: 8 * 60,
                    start: 1633638600000,
                    predecessors: [],
                    resources: [],
                    children: [],
                },
                {
                    id: 5,
                    sibling: 2,
                    parent: 3,
                    name: "task5",
                    duration: 8 * 60,
                    start: 1633638600000,
                    predecessors: [],
                    resources: [],
                    children: [
                        {
                            id: 6,
                            sibling: 1,
                            parent: 5,
                            name: "task6",
                            duration: 8 * 60,
                            start: 1633638600000,
                            predecessors: [],
                            resources: [],
                            children: [],
                        },
                    ],
                },
            ],
        },
        {
            id: 7,
            sibling: 4,
            parent: null,
            name: "task7",
            duration: 8 * 60,
            start: 1633638600000,
            children: [],
        },
    ],
};
export { initialGanttData };
