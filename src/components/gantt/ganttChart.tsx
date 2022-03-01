import React, { useLayoutEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { TaskType, ZoomType } from "./types";
import Config from "./config";
import TaskHeader from "./ganttRow/taskHeader";
import Timeline from "./timeline";
import Task from "./ganttRow/task";
import Bar from "./ganttRow/bar";
import ToolBar from "./toolBar";

type PropTypes = {
    onTaskEdit: (task: TaskType) => void;
    data: any;
};
const Gantt: React.FC<PropTypes> = ({ onTaskEdit, data }) => {
    const classes = useStyles();
    const [minGanttCellCount, setMinGanttCellCount] = useState(0);
    const [zoom, setZoom] = useState<ZoomType>(ZoomType.Day);
    const [selectedTasks, setSelectedTasks] = useState<TaskType[]>([]);

    useLayoutEffect(() => {
        const resize = () => {
            const ganttEl = document.querySelector(`#gantt #ganttRow #ganttRight`);
            setMinGanttCellCount(ganttEl ? ganttEl.clientWidth / Config.cellWidth : 0);
        };
        window.addEventListener("resize", resize);
        resize();
    }, []);

    return (
        <div className={classes.gantt} id="gantt">
            <ToolBar
                zoom={zoom}
                onZoomChange={(selectedZoom: ZoomType) => setZoom(selectedZoom)}
                onIndent={() => {}}
            />
            <div className={classes.row} id="ganttRow">
                <div className={classes.left}>
                    <div className={classes.timeLineHeaderGap}></div>
                    <TaskHeader />
                    {data.tasks.map((task: TaskType, index: number) => (
                        <Task
                            key={task.id}
                            task={task}
                            dayDuration={data.project.calendar.dayDuration}
                            rowNumber={index}
                            onTaskEdit={onTaskEdit}
                            onTaskSelect={(task: TaskType) =>
                                setSelectedTasks([...selectedTasks, task])
                            }
                            lastRow={index === data.tasks.length - 1}
                        />
                    ))}
                </div>
                <div className={classes.right} id="ganttRight">
                    <Timeline
                        zoom={zoom}
                        start={data.project.start}
                        end={data.project.end}
                        minCellCount={minGanttCellCount}
                    />
                    <div className={classes.taskHeaderGap}></div>
                    {data.tasks.map((task: TaskType) => (
                        <Bar
                            key={task.id}
                            zoom={zoom}
                            duration={task.duration}
                            offset={task.start - data.project.start}
                            dayDuration={data.project.calendar.dayDuration}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const useStyles = createUseStyles({
    gantt: {
        overflow: "scroll",
    },
    row: {
        display: "flex",
        flexDirection: Config.direction === "rtl" ? "row-reverse" : "row",
    },
    right: {
        width: "60%",
        borderTop: "1px solid #ccc",
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
    taskHeaderGap: {
        height: "30px",
    },
    timeLineHeaderGap: {
        height: "62px",
        borderTop: "1px solid #ccc",
        borderBottom: "1px solid #ccc",
    },
});

export default Gantt;
