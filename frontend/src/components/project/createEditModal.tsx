import React from "react";
import { Modal, Form, Input, DatePicker } from "ui-ant";
import { useTranslation } from "react-i18next";
import { ProjectType } from "types/ProjectType";
import { useCreate, CREATE_PROJECT } from "data";

type PropTypes = {
    project?: ProjectType;
    visible: boolean;
    onClose: () => void;
    onSave: (project: ProjectType) => void;
};

const CreateEditModal: React.FC<PropTypes> = ({ project, visible, onClose, onSave }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { create, loading, data } = useCreate(CREATE_PROJECT, "createProject");

    const handleConfirm = async () => {
        const values = await form.validateFields();
        await create({
            variables: {
                title: values.title,
                start: values.start.format('YYYY-MM-DD'),
                ...(values.predictedEnd && { predictedEnd: values.predictedEnd.format('YYYY-MM-DD') }),
            },
        });
        console.log(data);
        onSave(data as ProjectType);
        onClose();
    };

    return (
        <Modal
            title={project ? t("Create") : t("Edit")}
            visible={visible}
            onOk={() => form.submit()}
            okButtonProps={{ "aria-label": "ok" }}
            onCancel={onClose}
            confirmLoading={loading}>
            <Form form={form} onFinish={handleConfirm}>
                <Form.Item label={t("Title")} name="title" rules={[{ required: true }]}>
                    <Input aria-label={t("Title")} />
                </Form.Item>
                <Form.Item label={t("Start")} name="start" rules={[{ required: true }]}>
                    <DatePicker aria-label={t("Start")} />
                </Form.Item>
                <Form.Item label={t("Predicted End")} name="predictedEnd">
                    <DatePicker aria-label={t("Predicted End")} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateEditModal;
