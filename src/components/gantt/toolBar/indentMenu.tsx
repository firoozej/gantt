import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "ui-ant";
import { TaskType } from "components/gantt/types";
import { findTaskByOrder } from "./findTaskByOrder";

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
        let orders = selectedTasks.map(t => t.order);
        orders.sort((a, b) => a - b);

        for (let index = 0; index < orders.length; index++) {
            if (orders[index + 1] && orders[index + 1] - orders[index] > 1) {
                disableIndent = true;
                break;
            }
        }
        if (orders[0] - 1 >= 0) {
            const summaryTask = findTaskByOrder(tasks, orders[0] - 1);
            const selectedTasksIds = selectedTasks.map(task => task.id);
            if (summaryTask.children.some(task => selectedTasksIds.includes(task.id))) {
                disableIndent = true;
            }
        }
        setDisabled(disableIndent);
    }, [selectedTasks, tasks]);

    const handleIndent = () => {};

    return (
        <Menu.Item key="1" onClick={handleIndent} disabled={disabled}>
            {t("Indent Task")}
        </Menu.Item>
    );
};

export default IndentMenu;
