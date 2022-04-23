import { LinkType } from "./LinkType";

type TaskType = {
    id: number;
    sibling: number;
    parent: number | null;
    name: string;
    duration: number;
    start: number;
    end?: number;
    predecessors: { id: number; type: LinkType }[];
    resources: number[];
    children: TaskType[];
};
export type { TaskType };
