import React from "react";
import { Modal } from "ui-ant";
import { TaskType } from "types";

type PropTypes = {
    task: TaskType;
    visible: boolean;
    onClose: () => void;
    onTaskEdit: (task: TaskType) => void;
};
const EditTaskModal: React.FC<PropTypes> = ({ task, visible, onClose, onTaskEdit }) => {
    const handleConfirm = () => {
        onTaskEdit(task);
        onClose();
    };

    return (
        <Modal title={task.name} visible={visible} onOk={handleConfirm} onCancel={onClose}>
            test
        </Modal>
    );
};

export default EditTaskModal;
