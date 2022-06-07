import { CREATE_PROJECT } from "data";

const mocks = [
    {
        request: {
            query: CREATE_PROJECT,
            variables: {
                title: "project1",
                start: "2022-01-01",
                predictedEnd: "2022-06-01"
            },
        },
        result: {
            data: {
                projects: { id: "1", title: "project1", start: "2022-01-01", predictedEnd: "2022-06-01" },
            },
        },
    },
];

export { mocks };
