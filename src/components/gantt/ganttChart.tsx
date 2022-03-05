import React, { useEffect, useLayoutEffect, useState } from "react";
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
    const [ganttData, setGanttData] = useState<any>(data);
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

    useEffect(() => {
        setGanttData(data);
    }, [data]);

    const handleIndent = () => {
        let summaryTask: TaskType | undefined = undefined;
        const sortedSelectedTasks = [...selectedTasks].sort(
            (a: TaskType, b: TaskType) => a.order - b.order
        );
        if (sortedSelectedTasks[0].order > 1) {
            summaryTask = ganttData[sortedSelectedTasks[0].order - 1];
        }
        if (summaryTask) {
            let newGanttData = ganttData
                .filter((task: TaskType) => !selectedTasks.some((t: TaskType) => t.id === task.id))
                .map((task: TaskType) =>
                    task.id === summaryTask?.id
                        ? { ...task, children: [...task.children, ...selectedTasks] }
                        : task
                );
            setGanttData(newGanttData);
        }
    };

    return (
        <div className={classes.gantt} id="gantt">
            <ToolBar
                zoom={zoom}
                onZoomChange={(selectedZoom: ZoomType) => setZoom(selectedZoom)}
                onIndent={handleIndent}
            />
            <div className={classes.row} id="ganttRow">
                <div className={classes.left}>
                    <div className={classes.timeLineHeaderGap}></div>
                    <TaskHeader />
                    {ganttData.tasks.map((task: TaskType, index: number) => (
                        <Task
                            key={task.id}
                            task={task}
                            dayDuration={ganttData.project.calendar.dayDuration}
                            rowNumber={index}
                            lastRow={index === ganttData.tasks.length - 1}
                            active={selectedTasks.some(t => t.id === task.id)}
                            onTaskEdit={onTaskEdit}
                            onTaskSelect={(task: TaskType, selected: boolean) =>
                                selected
                                    ? setSelectedTasks([...selectedTasks, task])
                                    : setSelectedTasks(selectedTasks.filter(t => t.id !== task.id))
                            }
                        />
                    ))}
                </div>
                <div className={classes.right} id="ganttRight">
                    <Timeline
                        zoom={zoom}
                        start={ganttData.project.start}
                        end={ganttData.project.end}
                        minCellCount={minGanttCellCount}
                    />
                    <div className={classes.taskHeaderGap}></div>
                    {ganttData.tasks.map((task: TaskType) => (
                        <Bar
                            key={task.id}
                            zoom={zoom}
                            duration={task.duration}
                            offset={task.start - ganttData.project.start}
                            dayDuration={ganttData.project.calendar.dayDuration}
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
