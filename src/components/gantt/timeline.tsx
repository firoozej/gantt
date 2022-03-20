import React, { FunctionComponent } from "react";
import moment from "moment";
import classnames from "classnames";
import { ZoomType } from "types";
import Config from "config";
import { useLocalDate } from "./utils";
import { createUseStyles } from "react-jss";

type PropTypes = {
    zoom: ZoomType;
    start: number;
    end: number;
    minCellCount: number;
};

const Timeline: FunctionComponent<PropTypes> = ({ zoom, start, end, minCellCount }) => {
    const classes = useStyles();
    const { toLocalDate } = useLocalDate();
    let firstRow: string[] = [];
    let secondRow: string[] = [];
    let current: number = start;
    switch (zoom) {
        case ZoomType.Day:
            while (current <= end || secondRow.length < minCellCount) {
                firstRow = [...firstRow, toLocalDate(current, "MMMM")];
                secondRow = [...secondRow, toLocalDate(current, "D")];
                current = Number(moment(current).add(1, "days").format("x"));
            }
            break;
        case ZoomType.Month:
            while (current <= end || secondRow.length < minCellCount) {
                firstRow = [...firstRow, toLocalDate(current, "YYYY")];
                secondRow = [...secondRow, toLocalDate(current, "MM")];
                current = Number(moment(current).add(1, "months").format("x"));
            }
            break;
    }

    return (
        <div className={classes.timelineRow}>
            <div className={classes.level1Timeline}>
                {firstRow.map((r, index) => {
                    if (firstRow[index + 1] && r === firstRow[index + 1]) return null;
                    return (
                        <div
                            key={index}
                            className={classnames(
                                classes.cell,
                                index === firstRow.length - 1 ? classes.lastCell : ""
                            )}
                            style={{
                                width: Config.cellWidth * firstRow.filter(x => x === r).length,
                            }}
                        >
                            {r}
                        </div>
                    );
                })}
            </div>
            <div className={classes.level2Timeline}>
                {secondRow.map((r, index) => (
                    <div
                        key={index}
                        className={classnames(
                            classes.cell,
                            index === secondRow.length - 1 ? classes.lastCell : ""
                        )}
                    >
                        {r}
                    </div>
                ))}
            </div>
        </div>
    );
};

const useStyles = createUseStyles({
    timelineRow: {
        height: "auto",
        borderBottom: "1px solid #ccc",
    },
    level1Timeline: {
        borderBottom: "1px solid #ccc",
        display: "flex",
        flexDirection: Config.direction === "rtl" ? "row-reverse" : "row",
        height: "30px",
    },
    level2Timeline: {
        flexDirection: Config.direction === "rtl" ? "row-reverse" : "row",
        display: "flex",
        height: "30px",
    },
    cell: {
        width: Config.cellWidth,
        ...(Config.direction === "rtl"
            ? { borderLeft: "1px solid #ccc" }
            : { borderRight: "1px solid #ccc" }),
        textAlign: "center",
    },
    lastCell: {
        borderRight: "none",
    },
});

export default Timeline;
