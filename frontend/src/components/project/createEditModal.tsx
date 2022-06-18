import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker } from "ui-ant";
import { useTranslation } from "react-i18next";
import { ProjectType } from "types/ProjectType";
import { useCreate, CREATE_PROJECT, useUpdate, UPDATE_PROJECT } from "data";
import moment from "moment";

type PropTypes = {
    project?: ProjectType;
    visible: boolean;
    onClose: () => void;
};

const CreateEditModal: React.FC<PropTypes> = ({ project, visible, onClose }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const { create, loading: createLoading } = useCreate({
        mutation: CREATE_PROJECT,
        nameSpace: "createProject",
    });
    const { update, loading: updateLoading } = useUpdate({
        mutation: UPDATE_PROJECT,
        nameSpace: "updateProject",
    });

    useEffect(() => {
        form.resetFields();
    }, [visible]);

    const handleConfirm = async () => {
        const values = await form.validateFields();
        const variables = {
            ...(project && {
                id: project.id,
            }),
            title: values.title,
            start: values.start.format("YYYY-MM-DD"),
            ...(values.predictedEnd && {
                predictedEnd: values.predictedEnd.format("YYYY-MM-DD"),
            }),
        };
        project
            ? await update({ variables })
            : await create({
                  variables,
              });
        onClose();
    };

    return (
        <Modal
            title={project ? t("Create") : t("Edit")}
            visible={visible}
            onOk={() => form.submit()}
            okButtonProps={{ "aria-label": "ok" }}
            onCancel={onClose}
            confirmLoading={createLoading || updateLoading}>
            <Form
                form={form}
                onFinish={handleConfirm}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                layout="horizontal">
                <Form.Item
                    label={t("Title")}
                    name="title"
                    initialValue={project ? project.title : undefined}
                    rules={[{ required: true }]}>
                    <Input aria-label={t("Title")} />
                </Form.Item>
                <Form.Item
                    label={t("Start")}
                    name="start"
                    initialValue={project ? moment(project.start) : undefined}
                    rules={[{ required: true }]}>
                    <DatePicker aria-label={t("Start")} />
                </Form.Item>
                <Form.Item
                    label={t("Predicted End")}
                    name="predictedEnd"
                    initialValue={
                        project && project.predictedEnd ? moment(project.predictedEnd) : undefined
                    }>
                    <DatePicker aria-label={t("Predicted End")} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateEditModal;
