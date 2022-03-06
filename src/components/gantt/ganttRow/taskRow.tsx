import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { TaskType, ZoomType } from "../types";
import Config from "../config";
import Bar from "./bar";
import Task from "./task";

type PropTypes = {
    task: TaskType;
    dayDuration: number;
    lastRow: boolean;
    zoom: ZoomType;
    selectedTasks: TaskType[];
    projectStart: number;
    onTaskEdit: (task: TaskType) => void;
    onTaskSelect: (task: TaskType, selected: boolean) => void;
};

const TaskRow: React.FC<PropTypes> = ({
    task,
    dayDuration,
    lastRow,
    projectStart,
    zoom,
    selectedTasks,
    onTaskEdit,
    onTaskSelect,
}) => {
    const classes = useStyles();
    const [openTaskIds, setOpenTaskIds] = useState<number[]>([]);

    const renderTaskRow = (t: TaskType, level: number) => {
        return (
            <div className={classes.row} key={t.id}>
                <div className={classes.left}>
                    <Task
                        task={t}
                        dayDuration={dayDuration}
                        lastRow={lastRow}
                        active={selectedTasks.some(s => s.id === t.id)}
                        indentLevel={level}
                        isSummary={t.children.length > 0}
                        isOpen={t.children.length > 0 && openTaskIds.includes(t.id)}
                        onTaskEdit={onTaskEdit}
                        onTaskSelect={onTaskSelect}
                        onOpenClick={(taskId: number) =>
                            openTaskIds.includes(taskId)
                                ? setOpenTaskIds(openTaskIds.filter(id => id !== taskId))
                                : setOpenTaskIds([...openTaskIds, taskId])
                        }
                    />
                </div>
                <div className={classes.right}>
                    <Bar
                        zoom={zoom}
                        duration={t.duration}
                        offset={t.start - projectStart}
                        dayDuration={dayDuration}
                        isSummary={t.children.length > 0}
                    />
                </div>
            </div>
        );
    };
    const renderTaskHierarchy: any = (t: TaskType, level: number) => {
        if (!openTaskIds.includes(t.id) || t.children.length === 0) {
            return renderTaskRow(t, level);
        } else {
            return (
                <>
                    {renderTaskRow(t, level)}
                    {t.children.map((childTask: TaskType) =>
                        renderTaskHierarchy(childTask, level + 1)
                    )}
                </>
            );
        }
    };

    return renderTaskHierarchy(task, 0);
};

const useStyles = createUseStyles({
    row: {
        display: "flex",
        flexDirection: Config.direction === "rtl" ? "row-reverse" : "row",
    },
    right: {
        width: "60%",
        ...(Config.direction === "rtl"
            ? { borderLeft: "1px solid #ccc", borderRight: "1px solid #ccc" }
            : {}),
    },
    left: {
        width: "40%",
        ...(Config.direction === "rtl"
            ? {}
            : { borderLeft: "1px solid #ccc", borderRight: "1px solid #ccc" }),
    },
});

export default TaskRow;
