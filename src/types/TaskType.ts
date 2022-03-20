import { LinkType } from "./LinkType";

type TaskType = {
    id: number;
    rowNumber: number;
    name: string;
    duration: number;
    start: number;
    end?: number;
    predecessors: { id: number; type: LinkType }[];
    resources: number[];
    children: TaskType[];
};
export type { TaskType };
