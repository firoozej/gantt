import { DownOutlined } from "@ant-design/icons";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { Dropdown, Menu, Button } from "ui-ant";
import Config from "config";
import { TaskType, ZoomType } from "types";
import { SelectData, TaskTree } from "utils";
import IndentMenu from "./indentMenu";

type PropTypes = {
    zoom: ZoomType;
    selectedTasks: TaskType[];
    taskTree: TaskTree;
    onTasksChange: (taskTree: TaskTree) => void;
    onZoomChange: (zoom: ZoomType) => void;
};

const ToolBar: FunctionComponent<PropTypes> = ({
    zoom,
    selectedTasks,
    taskTree,
    onTasksChange,
    onZoomChange,
}) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <div className={classes.toolBar}>
            <Dropdown
                overlay={
                    <Menu>
                        <IndentMenu
                            taskTree={taskTree}
                            selectedTasks={selectedTasks}
                            onTasksChange={onTasksChange}
                        />
                        <Menu.Item key="2">{t("Outdent Task")}</Menu.Item>
                    </Menu>
                }
                placement="bottomLeft">
                <Button>
                    {t("Schedule")}
                    <DownOutlined />
                </Button>
            </Dropdown>
            <SelectData
                selectOptionField="name"
                useData={() => ({
                    data: [
                        { id: ZoomType.Day, name: t("zoom_day") },
                        { id: ZoomType.Month, name: t("zoom_month") },
                    ],
                    loading: false,
                })}
                value={zoom}
                onChange={(selectedZoom: ZoomType) => onZoomChange(selectedZoom)}
                style={{ width: "200px" }}
            />
        </div>
    );
};

const useStyles = createUseStyles({
    toolBar: {
        ...(Config.direction === "rtl"
            ? { borderRight: "1px solid #ccc" }
            : { borderLeft: "1px solid #ccc" }),
        padding: "10px",
        borderBottom: "1px solid #ccc",
    },
});

export default ToolBar;
