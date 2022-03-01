import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { TaskType } from "../types";
import { useLocalDate } from "../utils";
import Config from "../config";
import EditTaskModal from "./editTaskModal";

type PropTypes = {
    task: TaskType;
    dayDuration: number;
    rowNumber: number;
    lastRow: boolean;
    onTaskEdit: (task: TaskType) => void;
    onTaskSelect: (task: TaskType) => void;
};

const Task: React.FC<PropTypes> = ({
    task,
    dayDuration,
    rowNumber,
    lastRow,
    onTaskEdit,
    onTaskSelect,
}) => {
    const classes = useStyles();
    const { toLocalDate } = useLocalDate();
    const [editModal, setEditModal] = useState({
        visible: false,
    });

    return (
        <>
            <div
                className={classnames(
                    classes.taskRow,
                    rowNumber % 2 === 0 ? classes.even : classes.odd,
                    lastRow && classes.lastRow
                )}
                style={{
                    flexDirection: Config.direction === "rtl" ? "row-reverse" : "row",
                }}
                onDoubleClick={() => setEditModal({ visible: true })}
                onClick={() => onTaskSelect(task)}
            >
                <div className={classes.task}></div>
                <div className={classes.task}>{task.name}</div>
                <div className={classes.task}>{toLocalDate(task.start, "YYYY/MM/DD")}</div>
                <div className={classes.task}>
                    {toLocalDate(task.start + task.duration, "YYYY/MM/DD")}
                </div>
                <div className={classes.task}>{(task.duration / dayDuration).toFixed(1)}d</div>
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
    task: {
        width: "20%",
        textAlign: "center",
    },
    even: {},
    odd: {},
});

export default Task;
