import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { Dropdown, Menu, Button } from "ui-ant";
import Config from "./config";
import { ZoomType } from "./types";
import SelectData from "./utils/selectData";

type PropTypes = {
    zoom: ZoomType;
    onZoomChange: (zoom: ZoomType) => void;
    onIndent: () => void;
};

const ToolBar: FunctionComponent<PropTypes> = ({ zoom, onZoomChange, onIndent }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    
    return (
        <div className={classes.toolBar}>
            <Dropdown
                overlay={
                    <Menu>
                        <Menu.Item key="1" onClick={() => onIndent()}>{t("Indent")}</Menu.Item>
                    </Menu>
                }
                placement="bottomLeft">
                <Button>{t("Schedule")}</Button>
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
        borderTop: "1px solid #ccc",
        padding: "10px",
    },
});

export default ToolBar;
