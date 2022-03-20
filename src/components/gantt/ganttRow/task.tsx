import React, { SyntheticEvent, useState } from "react";
import { createUseStyles } from "react-jss";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { TaskType } from "types";
import { useLocalDate } from "../utils";
import Config from "config";
import EditTaskModal from "./editTaskModal";

type PropTypes = {
    task: TaskType;
    dayDuration: number;
    lastRow: boolean;
    active: boolean;
    indentLevel: number;
    isSummary: boolean;
    isOpen: boolean;
    onTaskEdit: (task: TaskType) => void;
    onTaskSelect: (task: TaskType, selected: boolean) => void;
    onOpenClick: (taskId: number) => void;
};

const Task: React.FC<PropTypes> = ({
    task,
    dayDuration,
    lastRow,
    active,
    indentLevel,
    isSummary,
    isOpen,
    onTaskEdit,
    onTaskSelect,
    onOpenClick,
}) => {
    const classes = useStyles();
    const { toLocalDate } = useLocalDate();
    const [editModal, setEditModal] = useState({
        visible: false,
    });

    const handleToggle = (e: SyntheticEvent) => {
        onOpenClick(task.id);
        e.stopPropagation();
    };

    return (
        <>
            <div
                className={classnames(
                    classes.taskRow,
                    active ? classes.active : "",
                    task.rowNumber % 2 === 0 ? classes.even : classes.odd,
                    lastRow && classes.lastRow
                )}
                style={{
                    flexDirection: Config.direction === "rtl" ? "row-reverse" : "row",
                }}
                onDoubleClick={() => setEditModal({ visible: true })}
                onClick={() => onTaskSelect(task, !active)}>
                <div className={classes.cell}></div>
                <div className={classnames(classes.cell, classes.name)}>
                    <div
                        style={{
                            width: (indentLevel * 10).toString() + "px",
                        }}
                        className={classes.indentIcon}
                    />

                    {isSummary && isOpen && (
                        <CaretDownOutlined
                            style={{
                                [`margin${Config.direction === "rtl" ? "Right" : "Left"}`]: "-16px",
                            }}
                            onClick={handleToggle}
                        />
                    )}
                    {isSummary && !isOpen && (
                        <CaretRightOutlined
                            style={{
                                [`margin${Config.direction === "rtl" ? "Right" : "Left"}`]: "-16px",
                            }}
                            onClick={handleToggle}
                        />
                    )}
                    <div>{task.name}</div>
                </div>
                <div className={classes.cell}>{toLocalDate(task.start, "YYYY/MM/DD")}</div>
                <div className={classes.cell}>
                    {toLocalDate(task.start + task.duration, "YYYY/MM/DD")}
                </div>
                <div className={classes.cell}>{(task.duration / dayDuration).toFixed(1)}d</div>
            </div>

            <EditTaskModal
                task={task}
                visible={editModal.visible}
                onClose={() => setEditModal({ visible: false })}
                onTaskEdit={onTaskEdit}
            />
        </>
    );
};

const useStyles = createUseStyles({
    taskRow: {
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        height: "30px",
        borderBottom: "1px solid #ccc",
    },
    lastRow: {
        borderBottom: "none",
    },
    cell: {
        width: "20%",
    },
    name: {
        display: "flex",
        alignItems: "center",
    },
    active: {
        background: "#e6f7ff",
    },
    indentIcon: {
        height: "30px",
    },
    even: {},
    odd: {},
});

export default Task;
