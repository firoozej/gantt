import { initialGanttData } from "test";
import { TaskType } from "types";
import { findTaskByRowNumber } from "./findTaskByRowNumber";

describe("find task by order", () => {
    let tasks: TaskType[] = [...initialGanttData.tasks];
    it("should work if it is the first task", () => {
        const task = findTaskByRowNumber(tasks, 1);
        expect(task.id).toBe(1);
    });
    it("should work if it is in first level children", () => {
        const task = findTaskByRowNumber(tasks, 4);
        expect(task.id).toBe(4);
    });
    it("should work if it is in second level children", () => {
        const task = findTaskByRowNumber(tasks, 6);
        expect(task.id).toBe(6);
    });
});
