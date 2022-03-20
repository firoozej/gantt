import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "ui-ant";
import { TaskType } from "types";
import { findTaskByRowNumber } from "./findTaskByRowNumber";

type PropTypes = {
    tasks: TaskType[];
    selectedTasks: TaskType[];
    onTasksChange: (tasks: TaskType[]) => void;
};

const IndentMenu: FunctionComponent<PropTypes> = ({ selectedTasks, tasks, onTasksChange }) => {
    const { t } = useTranslation();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (selectedTasks.length === 0) {
            setDisabled(true);
            return;
        }

        let disableIndent = false;
        const orderedSelectedTasks = [...selectedTasks].sort(
            (a: TaskType, b: TaskType) => a.rowNumber - b.rowNumber
        );
        const selectedTasksIds = selectedTasks.map(task => task.id);

        for (let index = 0; index < orderedSelectedTasks.length; index++) {
            const nextSelectedTaskOrder = orderedSelectedTasks[index + 1]
                ? orderedSelectedTasks[index + 1]
                : null;
            const currentSelectedTaskOrder = orderedSelectedTasks[index];
            if (
                nextSelectedTaskOrder &&
                nextSelectedTaskOrder.rowNumber - currentSelectedTaskOrder.rowNumber !== 1
            ) {
                disableIndent = true;
                break;
            }
            if (
                currentSelectedTaskOrder.children.length > 0 &&
                currentSelectedTaskOrder.children.some(c => !selectedTasksIds.includes(c.id))
            ) {
                disableIndent = true;
                break;
            }
        }

        const firstSelectedTask = orderedSelectedTasks[0];
        if (firstSelectedTask.rowNumber - 1 <= 1) {
            disableIndent = true;
        } else {
            const summaryTask = findTaskByRowNumber(tasks, firstSelectedTask.rowNumber - 1);

            if (summaryTask.children.some(task => selectedTasksIds.includes(task.id))) {
                disableIndent = true;
            }
        }
        setDisabled(disableIndent);
    }, [selectedTasks, tasks]);

    const handleIndent = () => {
        onTasksChange(tasks);
    };

    return (
        <Menu.Item key="1" onClick={handleIndent} disabled={disabled}>
            {t("Indent Task")}
        </Menu.Item>
    );
};

export default IndentMenu;
