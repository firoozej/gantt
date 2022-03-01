import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import Config from "../config";

const TaskHeader: FunctionComponent = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <div className={classes.taskHeader}>
            <div className={classes.header}></div>
            <div className={classes.header}>{t("taskHeader_name")}</div>
            <div className={classes.header}>{t("taskHeader_start")}</div>
            <div className={classes.header}>{t("taskHeader_end")}</div>
            <div className={classes.header}>{t("taskHeader_duration")}</div>
        </div>
    );
};

const useStyles = createUseStyles({
    taskHeader: {
        display: "flex",
        justifyContent: "space-between",
        height: "30px",
        flexDirection: Config.direction === "rtl" ? "row-reverse" : "row",
        borderBottom: "1px solid #ccc",
    },
    header: { width: "20%", textAlign: "center" },
});

export default TaskHeader;
