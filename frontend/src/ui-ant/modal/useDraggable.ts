import { useState } from "react";
import {
    DraggableBounds,
    DraggableData,
    DraggableEvent,
    DraggableEventHandler,
} from "react-draggable";

export type UseDraggableHanler = (ref: React.RefObject<HTMLDivElement> | null) => {
    bounds: DraggableBounds;
    disabled: boolean;
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    onStart: DraggableEventHandler;
};

const useDraggable: UseDraggableHanler = (ref: React.RefObject<HTMLDivElement> | null) => {
    const [bounds, setBounds] = useState<DraggableBounds>({});
    const [disabled, setDisabled] = useState<boolean>(false);

    const onStart = (event: DraggableEvent, uiData: DraggableData) => {
        const { clientWidth, clientHeight } = window?.document?.documentElement;
        const targetRect = ref?.current?.getBoundingClientRect();
        if (targetRect) {
            setBounds({
                left: -targetRect.left + uiData?.x,
                right: clientWidth - (targetRect?.right - uiData?.x),
                top: -targetRect.top + uiData?.y,
                bottom: clientHeight - (targetRect?.bottom - uiData?.y),
            });
        }
    };

    return {
        bounds,
        disabled,
        setDisabled,
        onStart,
    };
};

export { useDraggable };
