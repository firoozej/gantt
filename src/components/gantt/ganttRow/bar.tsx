import React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import Config from "../config";
import { ZoomType } from "../types";

type PropTypes = {
    offset: number;
    duration: number;
    zoom: ZoomType;
    dayDuration: number;
    isSummary: boolean;
    
};
const Bar: React.FC<PropTypes> = ({ offset, duration, dayDuration, zoom, isSummary }) => {
    const classes = useStyles();
    let left = 0,
        width = 0;
    switch (zoom) {
        case ZoomType.Day:
            left = offset / dayDuration;
            width = duration / dayDuration;
            break;
        case ZoomType.Month:
            left = offset / (30 * dayDuration);
            width = duration / (30 * dayDuration);
            break;
    }
    return (
        <div className={classes.barRow}>
            <div
                className={classnames(classes.bar, isSummary ? classes.summary : "")}
                style={{
                    [Config.direction === "rtl" ? "right" : "left"]: left * Config.cellWidth + "px",
                    width: width * Config.cellWidth + "px",
                }}
            />
        </div>
    );
};

const useStyles = createUseStyles({
    barRow: {
        position: "relative",
        height: "30px",
    },
    bar: {
        position: "absolute",
        backgroundColor: "lightblue",
        height: "20px",
        top: "50%",
        transform: "translateY(-50%)",
    },
    summary: {
        backgroundColor: "white",
        borderWidth: "1px 1px 0 1px",
        borderStyle: "solid",
        borderColor: "lightblue"
    }
});

export default Bar;
