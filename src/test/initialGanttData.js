const initialGanttData = {
    project: {
        start: 1633638600000,
        end: 1633638600000 + 3 * 24 * 60 * 60 * 1000,
        calendar: {
            dayDuration: 8 * 60 * 60 * 1000,
        },
    },
    resources: [
        {
            id: 1,
            name: "cnc1",
        },
        {
            id: 2,
            name: "cnc2",
        },
    ],
    tasks: [
        {
            id: 1,
            rowNumber: 1,
            name: "task1",
            duration: 1,
            start: 1,
            predecessors: {},
            resources: [],
            children: [],
        },
        {
            id: 2,
            rowNumber: 2,
            name: "task2",
            duration: 1,
            start: 1,
            predecessors: {},
            resources: [],
            children: [],
        },
        {
            id: 3,
            rowNumber: 3,
            name: "task3",
            duration: 1,
            start: 1,
            predecessors: {},
            resources: [],
            children: [
                {
                    id: 4,
                    rowNumber: 4,
                    name: "task4",
                    duration: 1,
                    start: 1,
                    predecessors: {},
                    resources: [],
                    children: [],
                },
                {
                    id: 5,
                    rowNumber: 5,
                    name: "task5",
                    duration: 1,
                    start: 1,
                    predecessors: {},
                    resources: [],
                    children: [
                        {
                            id: 6,
                            rowNumber: 6,
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
    ],
};
export { initialGanttData };
