import React, { FunctionComponent, useState } from "react";
import { gql } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Grid, Button } from "ui-ant";
import { PROJECTS_QUERY, useOverview } from "data";
import { PlusOutlined } from "@ant-design/icons";
import CreateEditModal from "./createEditModal";
import { ProjectType } from "types/ProjectType";

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
    const handleOnRow = (project: ProjectType) => {
        return {
            onClick: () => setCreateEditModal({ visible: true, project }),
        };
    };
    const columns = [
        {
            title: t("Title"),
            dataIndex: "title",
            key: "title",
        },
        {
            title: t("Start"),
            dataIndex: "start",
            key: "start",
        },
        {
            title: t("Predicted End"),
            dataIndex: "predictedEnd",
            key: "predictedEnd",
        },
    ];
    return (
        <>
            <Grid
                columns={columns}
                title={() => (
                    <Button onClick={handleCreate}>
                        <PlusOutlined />
                    </Button>
                )}
                useData={useOverview.bind(null, PROJECTS_QUERY, "projects")}
                onRow={handleOnRow}
            />
            <CreateEditModal
                {...createEditModal}
                onClose={() => setCreateEditModal({ visible: false, project: undefined })}
            />
        </>
    );
};

export default Overview;
