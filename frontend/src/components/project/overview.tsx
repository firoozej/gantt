import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "ui-materialui";
import { PROJECTS_QUERY, useOverview } from "data";
import CreateEditModal from "./createEditModal";
import { ProjectType } from "types/ProjectType";
import { formatDate } from "utils";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";

type PropTypes = {};

const Overview: FunctionComponent<PropTypes> = () => {
    const { t } = useTranslation();

    const [createEditModal, setCreateEditModal] = useState<{
        visible: boolean;
        project: ProjectType | undefined;
    }>({ visible: false, project: undefined });

    const handleCreate = () => {
        setCreateEditModal({ visible: true, project: undefined });
    };
    const handleRowEdit = (project: ProjectType) => setCreateEditModal({ visible: true, project });

    const columns = [
        {
            title: t("Title"),
            dataIndex: "title",
        },
        {
            title: t("Start"),
            dataIndex: "start",
            render: (value: string) => formatDate(value),
        },
        {
            title: t("Predicted End"),
            dataIndex: "predictedEnd",
            render: (value: string) => formatDate(value),
        },
    ];
    return (
        <>
            <Grid
                columns={columns}
                title={
                    <IconButton onClick={handleCreate} size="large" color="primary" data-test="Create Project">
                        <AddBoxIcon />
                    </IconButton>
                }
                useData={useOverview.bind(null, PROJECTS_QUERY, "projects")}
                onRowEdit={handleRowEdit}
                data-test="Projects Grid"
            />
            <CreateEditModal
                {...createEditModal}
                onClose={() => setCreateEditModal({ visible: false, project: undefined })}
            />
        </>
    );
};

export default Overview;
