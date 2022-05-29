import { TaskType } from "./TaskType";

type ProjectType = {
    id: string;
    title: string;
    start: string;
    predictedEnd: string;
    tasks: TaskType[];
};
export type { ProjectType };
