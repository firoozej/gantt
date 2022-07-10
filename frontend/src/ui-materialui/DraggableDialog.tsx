import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";

function PaperComponent(props: PaperProps) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

type PropTypes = {
    title: React.ReactNode;
    open: boolean;
    onClose: Function;
    onOk: Function;
    okButtonProps?: any;
    confirmLoading?: boolean;
};

const DraggableDialog: React.FC<PropTypes> = ({
    open,
    onClose,
    onOk,
    title,
    okButtonProps,
    confirmLoading = false,
    children,
}) => {
    const { t } = useTranslation();
    return (
        <div>
            <Dialog
                open={open}
                onClose={() => onClose()}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title">
                <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>{children}</DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()}>{t("Cancel")}</Button>
                    <LoadingButton
                        onClick={() => onOk()}
                        loading={confirmLoading}
                        size="small"
                        variant="contained"
                        aria-label="ok"
                        {...okButtonProps}>
                        {t("OK")}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export { DraggableDialog };
