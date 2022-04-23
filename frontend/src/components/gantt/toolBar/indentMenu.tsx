import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "ui-ant";
import { TaskType } from "types";
import { TaskTree } from "utils";

type PropTypes = {
    taskTree: TaskTree;
    selectedTasks: TaskType[];
    onTasksChange: (tasks: TaskTree) => void;
};

const IndentMenu: FunctionComponent<PropTypes> = ({ selectedTasks, taskTree, onTasksChange }) => {
    const { t } = useTranslation();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (selectedTasks.length === 0) {
            setDisabled(true);
            return;
        }

        const prevParent = selectedTasks[0].parent;
        for (let index = 0; index < selectedTasks.length; index++) {
            if (selectedTasks[index].parent !== prevParent) {
                setDisabled(true);
                return;
            }
        }

        let disableIndent = false;
        const orderedSelectedTasks: TaskType[] = [...selectedTasks].sort(
            (a: TaskType, b: TaskType) => a.sibling - b.sibling
        );

        for (let index = 0; index < orderedSelectedTasks.length; index++) {
            const nextSelectedTask = orderedSelectedTasks[index + 1]
                ? orderedSelectedTasks[index + 1]
                : null;
            const currentSelectedTask = orderedSelectedTasks[index];
            if (nextSelectedTask && nextSelectedTask.sibling - currentSelectedTask.sibling !== 1) {
                disableIndent = true;
                break;
            }
        }

        const firstSelectedTask: TaskType = orderedSelectedTasks[0];
        const parentTask: TaskType | null = taskTree.findById(firstSelectedTask.parent || 0) as any;
        const summaryTaskExist: boolean =
            (parentTask !== null &&
                parentTask.children.some(
                    (task: TaskType) => task.sibling === firstSelectedTask.sibling - 1
                )) ||
            (parentTask === null &&
                taskTree
                    .getTasks()
                    .some((task: TaskType) => task.sibling === firstSelectedTask.sibling - 1));

        if (summaryTaskExist === false) {
            disableIndent = true;
        }

        setDisabled(disableIndent);
    }, [selectedTasks, taskTree]);

    const handleIndent = () => {
        const orderedSelectedTasks: TaskType[] = [...selectedTasks].sort(
            (a: TaskType, b: TaskType) => a.sibling - b.sibling
        );
        const firstSelectedTask: TaskType = orderedSelectedTasks[0];
        const parentTask: TaskType | null = taskTree.findById(firstSelectedTask.parent || 0) as any;
        const summaryTask = taskTree.findPreviousSibling(parentTask, firstSelectedTask);
        selectedTasks.forEach(selectedTask => {
            taskTree.remove(selectedTask);
        });
        selectedTasks.forEach(selectedTask => {
            taskTree.add(summaryTask, selectedTask);
        });
        onTasksChange(taskTree);
    };

    return (
        <Menu.Item key="1" onClick={handleIndent} disabled={disabled}>
            {t("Indent Task")}
        </Menu.Item>
    );
};

export default IndentMenu;
