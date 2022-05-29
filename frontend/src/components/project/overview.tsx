import React, { FunctionComponent, useState } from "react";
import { gql } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Grid, Button } from "ui-ant";
import { useOverview } from "data";
import { PlusOutlined } from "@ant-design/icons";
import CreateEditModal from "./createEditModal";

type PropTypes = {};

const Overview: FunctionComponent<PropTypes> = () => {
    const { t } = useTranslation();
    const [createEditModal, setCreateEditModal] = useState({ visible: false });

    const handleCreate = () => {
        setCreateEditModal({ visible: true });
    };
    const columns = [
        {
            title: t("Id"),
            dataIndex: "id",
            key: "id",
        },
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
            />
            <CreateEditModal
                visible={createEditModal.visible}
                onClose={() => setCreateEditModal({ visible: false })}
                onSave={() => {}}
            />
        </>
    );
};

const PROJECTS_QUERY = gql`
    query {
        projects {
            id
            title
            start
            predictedEnd
        }
    }
`;

export default Overview;
