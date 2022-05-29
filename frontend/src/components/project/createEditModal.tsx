import React from "react";
import { Modal, Form, Input, DatePicker } from "ui-ant";
import { useTranslation } from "react-i18next";
import { ProjectType } from "types/ProjectType";
import { gql } from "@apollo/client";

type PropTypes = {
    project?: ProjectType;
    visible: boolean;
    onClose: () => void;
    onSave: (project: ProjectType) => void;
};

const CreateEditModal: React.FC<PropTypes> = ({ project, visible, onClose, onSave }) => {
    const { t } = useTranslation();
    const {data, loading} = useCreat();
    const [form] = Form.useForm();
    const handleConfirm = async () => {
        const values = await form.validateFields();
        
        onClose();
    };

    return (
        <Modal
            title={project ? t("Create") : t("Edit")}
            visible={visible}
            onOk={() => form.submit()}
            onCancel={onClose}>
            <Form form={form} onFinish={handleConfirm}>
                <Form.Item name="title">
                    <Input />
                </Form.Item>
                <Form.Item name="start">
                    <DatePicker />
                </Form.Item>
                <Form.Item name="predictedEnd">
                    <DatePicker />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateEditModal;

const CREATE_PROJECT = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;
