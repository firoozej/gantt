import { TaskType } from "../types";

export const findTaskByOrder = (tasks: TaskType[], order: number): TaskType => {
    if (tasks[0].order === order) {
        return tasks[0];
    }
    let task: TaskType = tasks[tasks.length - 1];
    for (let index = 0; index < tasks.length; index++) {
        if (tasks[index].order > order) {
            task = tasks[index - 1];
            break;
        }
    }
    if (task.order === order) return task;
    else return findTaskByOrder(task.children, order);
};
