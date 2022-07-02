import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker } from "ui-ant";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { gql } from "@apollo/client";
import { ProjectType } from "types/ProjectType";
import { useCreate, CREATE_PROJECT, useUpdate, UPDATE_PROJECT } from "data";

type PropTypes = {
    project?: ProjectType;
    visible: boolean;
    onClose: () => void;
};

const CreateEditModal: React.FC<PropTypes> = ({ project, visible, onClose }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const updateCache = (cache: any, { data }: any) => {
        cache.modify({
            fields: {
                projects(existing: any = []) {
                    const newItem = cache.writeFragment({
                        data: data["createProject"],
                        fragment: gql`
                            fragment NewProject on Project {
                                id
                                title
                                start
                                predictedEnd
                            }
                        `,
                    });
                    return [...existing.data, newItem];
                },
            },
        });
    };

    const { create, loading: createLoading } = useCreate({
        mutation: CREATE_PROJECT,
        nameSpace: "createProject",
        update: updateCache,
    });
    const { update, loading: updateLoading } = useUpdate({
        mutation: UPDATE_PROJECT,
        nameSpace: "updateProject",
    });

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible, form]);

    const handleConfirm = async () => {
        const values = await form.validateFields();
        const variables = {
            ...(project && {
                id: project.id,
            }),
            title: values.title,
            start: values.startDate.format("YYYY-MM-DD"),
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
                    rules={[{ required: true, message: t("{{name}} is required", {name: t("Title")}) }]}>
                    <Input aria-label={t("Title")} />
                </Form.Item>
                <Form.Item
                    label={t("Start Date")}
                    name="startDate"
                    initialValue={project ? moment(project.start) : undefined}
                    rules={[{ required: true, message: t("{{name}} is required", {name: t("Start Date")}) }]}>
                    <DatePicker aria-label={t("Start Date")} />
                </Form.Item>
                <Form.Item
                    label={t("Predicted End")}
                    name="predictedEnd"
                    initialValue={
                        project && project.predictedEnd ? moment(project.predictedEnd) : undefined
                    }
                    dependencies={["start"]}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (value && value < getFieldValue("start")) {
                                    return Promise.reject(
                                        new Error(
                                            t("Predicated End should be after Start Date")
                                        )
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}>
                    <DatePicker aria-label={t("Predicted End")} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateEditModal;
