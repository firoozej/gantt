import { TaskType } from "types";

class TaskTree {
    tasks: TaskType[];
    constructor(_tasks: TaskType[]) {
        this.tasks = _tasks;
    }
    add(parentTask: TaskType | null, taskToAdd: TaskType) {
        if (parentTask) {
            this.traversBF((task: TaskType) => {
                if (task.id === parentTask.id) {
                    task.children = [
                        ...task.children,
                        { ...taskToAdd, sibling: task.children.length + 1 },
                    ];
                    return "BREAK";
                }
            });
        } else {
            this.tasks = [...this.tasks, { ...taskToAdd, sibling: this.tasks.length + 1 }];
        }
    }
    remove(taskToRemove: TaskType) {
        this.traversBF((task: TaskType) => {
            if (task.id === taskToRemove.id) {
                this.tasks = this.tasks.filter(task => task.id !== taskToRemove.id);
                this.tasks = this.tasks.map((task, index) => ({
                    ...task,
                    sibling: index + 1,
                }));
                return "BREAK";
            }

            if (task.children.some(task => task.id === taskToRemove.id)) {
                task.children = task.children.filter(task => task.id === taskToRemove.id);
                task.children = task.children.map((task, index) => ({
                    ...task,
                    sibling: index + 1,
                }));
                return "BREAK";
            }
        });
    }
    traversBF(fn: (task: TaskType) => string | void) {
        const arr: TaskType[] = [...this.tasks.filter((task: TaskType) => task.parent === null)];
        while (arr.length > 0) {
            let task = arr.shift();
            if (task) {
                arr.push(...task.children);
                const res = fn(task);
                if (res === "BREAK") break;
            }
        }
    }
    traversDF(fn: (task: TaskType) => string | void) {
        const arr: TaskType[] = [...this.tasks.filter((task: TaskType) => task.parent === null)];
        while (arr.length > 0) {
            let task = arr.shift();
            if (task) {
                arr.unshift(...task.children);
                const res = fn(task);
                if (res === "BREAK") break;
            }
        }
    }
    getTasks() {
        return this.tasks;
    }
    findById(taskId: number) {
        let foundTask = null;
        this.traversBF((task: TaskType) => {
            if (task.id === taskId) {
                foundTask = task;
            }
        });
        return foundTask;
    }
    findPreviousSibling(parentTask: TaskType | null, task: TaskType) {
        let foundTask = null;
        if (parentTask === null) {
            foundTask = this.tasks.filter(t => t.sibling === task.sibling - 1);
        } else {
            foundTask  = parentTask.children.filter(t => t.sibling === task.sibling - 1)
        }
        return foundTask.length ? foundTask[0] : null;
    }
}
export { TaskTree };
