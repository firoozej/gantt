import React from "react";
import { Modal, Form, Input, DatePicker } from "ui-ant";
import { gql } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { ProjectType } from "types/ProjectType";
import { useCreate } from "controllers";

type PropTypes = {
    project?: ProjectType;
    visible: boolean;
    onClose: () => void;
    onSave: (project: ProjectType) => void;
};

const CreateEditModal: React.FC<PropTypes> = ({ project, visible, onClose, onSave }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { create, loading } = useCreate(CREATE_PROJECT);

    const handleConfirm = async () => {
        const values = await form.validateFields();
        create({
            variables: {
                title: values.title,
                start: values.start.toString(),
                predictedEnd: values.predictedEnd.toString(),
            },
        });
        onClose();
    };

    return (
        <Modal
            title={project ? t("Create") : t("Edit")}
            visible={visible}
            onOk={() => form.submit()}
            onCancel={onClose}
            confirmLoading={loading}>
            <Form form={form} onFinish={handleConfirm}>
                <Form.Item name="title" rules={[{ required: true }]}>
                    <Input placeholder={t("Title")} />
                </Form.Item>
                <Form.Item name="start" rules={[{ required: true }]}>
                    <DatePicker placeholder={t("Start")} />
                </Form.Item>
                <Form.Item name="predictedEnd">
                    <DatePicker placeholder={t("Predicted End")} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateEditModal;

const CREATE_PROJECT = gql`
    mutation createProject($title: String!, $start: String!, $predictedEnd: String) {
        createProject(title: $title, start: $start, predictedEnd: $predictedEnd) {
            id
        }
    }
`;
