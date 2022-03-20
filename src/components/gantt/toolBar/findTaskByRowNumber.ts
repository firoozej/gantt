import { TaskType } from "types";

export const findTaskByRowNumber = (tasks: TaskType[], rowNumber: number): TaskType => {
    if (tasks[0].rowNumber === rowNumber) {
        return tasks[0];
    }
    let task: TaskType = tasks[tasks.length - 1];
    for (let index = 0; index < tasks.length; index++) {
        if (tasks[index].rowNumber > rowNumber) {
            task = tasks[index - 1];
            break;
        }
    }
    if (task.rowNumber === rowNumber) return task;
    else return findTaskByRowNumber(task.children, rowNumber);
};
