import React, { useRef } from "react";
import { Modal, ModalProps } from "antd";
import Draggable from "react-draggable";
import { useDraggable } from "./useDraggable";

const DraggableModal: React.FC<ModalProps> = props => {
    const ref = useRef(null);
    const { bounds, onStart } = useDraggable(ref);

    return (
        <Modal
            {...props}
            modalRender={modal => (
                <Draggable bounds={bounds} onStart={onStart}>
                    <div ref={ref}>{modal}</div>
                </Draggable>
            )}
        >
            {props.children}
        </Modal>
    );
};

export { DraggableModal };
