import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "ui-ant";
import { TaskType } from "../types";

type PropTypes = {
    tasks: TaskType[];
    selectedTasks: TaskType[];
    onTasksChange: (tasks: TaskType[]) => void;
};

const IndentMenu: FunctionComponent<PropTypes> = ({ selectedTasks, tasks, onTasksChange }) => {
    const { t } = useTranslation();

    const handleIndent = () => {
        
    };

    return (
        <Menu.Item key="1" onClick={handleIndent}>
            {t("Indent Task")}
        </Menu.Item>
    );
};

export default IndentMenu;
