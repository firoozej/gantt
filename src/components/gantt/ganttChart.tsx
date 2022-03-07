import React, { useEffect, useLayoutEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { TaskType, ZoomType } from "./types";
import Config from "./config";
import TaskHeader from "./ganttRow/taskHeader";
import Timeline from "./timeline";
import TaskRow from "./ganttRow/taskRow";
import ToolBar from "./toolBar/toolBar";

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

    return (
        <div className={classes.gantt} id="gantt">
            <ToolBar
                zoom={zoom}
                selectedTasks={selectedTasks}
                tasks={ganttData.tasks}
                onZoomChange={(selectedZoom: ZoomType) => setZoom(selectedZoom)}
                onTasksChange={(tasks: TaskType[]) => setGanttData({ ...ganttData, tasks })}
            />
            <div className={classes.row} id="ganttRow">
                <div className={classes.left}>
                    <div className={classes.timeLineHeaderGap}></div>
                    <TaskHeader />
                </div>
                <div className={classes.right} id="ganttRight">
                    <Timeline
                        zoom={zoom}
                        start={ganttData.project.start}
                        end={ganttData.project.end}
                        minCellCount={minGanttCellCount}
                    />
                    <div className={classes.taskHeaderGap}></div>
                </div>
            </div>
            {ganttData.tasks.map((task: TaskType, index: number) => (
                <TaskRow
                    key={task.id}
                    task={task}
                    dayDuration={ganttData.project.calendar.dayDuration}
                    lastRow={false}
                    zoom={zoom}
                    selectedTasks={selectedTasks}
                    onTaskEdit={onTaskEdit}
                    projectStart={ganttData.project.start}
                    onTaskSelect={(task: TaskType, selected: boolean) =>
                        selected
                            ? setSelectedTasks([...selectedTasks, task])
                            : setSelectedTasks(selectedTasks.filter(t => t.id !== task.id))
                    }
                />
            ))}
        </div>
    );
};

const useStyles = createUseStyles({
    gantt: {
        overflow: "scroll",
        borderTop: "1px solid #ccc",
    },
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
    taskHeaderGap: {
        height: "30px",
    },
    timeLineHeaderGap: {
        height: "61px",
        borderBottom: "1px solid #ccc",
    },
});

export default Gantt;
