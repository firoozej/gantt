import React from "react";
import { useForm, FormProvider } from "react-hook-form";

type PropTypes = {
    defaultValues?: any;
    onSubmit: (data: any, event?: React.BaseSyntheticEvent<object, any, any> | undefined) => any;
    children: React.ReactElement | React.ReactElement[];
    formRef: any;
};

const Form: React.FC<PropTypes> = ({ defaultValues, onSubmit, formRef, children }) => {
    const methods = useForm({
        defaultValues,
    });

    return (
        <FormProvider {...methods}>
            <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
};

const submitForm = (formRef: React.MutableRefObject<HTMLFormElement | undefined>) => {
    (formRef.current as any).dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
    );
};

export { Form, submitForm };
