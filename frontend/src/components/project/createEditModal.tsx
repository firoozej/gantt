import React, { useRef } from "react";
import { DraggableDialog, Form, TextInput, submitForm, DateInput } from "ui-materialui";
import { useTranslation } from "react-i18next";
import { gql } from "@apollo/client";
import Stack from "@mui/material/Stack";
import { ProjectType } from "types/ProjectType";
import { useCreate, CREATE_PROJECT, useUpdate, UPDATE_PROJECT } from "data";

type PropTypes = {
    project?: ProjectType;
    visible: boolean;
    onClose: () => void;
};

const CreateEditModal: React.FC<PropTypes> = ({ project, visible, onClose }) => {
    const { t } = useTranslation();
    const formRef = useRef<HTMLFormElement>();

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

    const handleConfirm = async (values: any) => {
        console.log(values);
        const variables = {
            ...(project && {
                id: project.id,
            }),
            title: values.title,
            start: values.startDate.toString(),
            ...(values.predictedEnd && {
                predictedEnd: values.predictedEnd.toString(),
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
        <DraggableDialog
            title={project === undefined ? t("Create") : t("Edit")}
            open={visible}
            onOk={() => submitForm(formRef)}
            okButtonProps={{
                "aria-label": "ok",
            }}
            onClose={onClose}
            confirmLoading={createLoading || updateLoading}>
            <Form
                onSubmit={handleConfirm}
                defaultValues={
                    project
                        ? {
                              title: project.title,
                              startDate: new Date(project.start),
                              predictedEnd: project.predictedEnd
                                  ? new Date(project.predictedEnd)
                                  : null,
                          }
                        : { title: "", startDate: null, predictedEnd: null }
                }
                formRef={formRef}>
                <Stack>
                    <TextInput
                        name="title"
                        label={t("Title")}
                        aria-label={t("Title")}
                        rules={{
                            required: {
                                value: true,
                                message: t("{{name}} is required", { name: t("Title") }),
                            },
                        }}
                    />
                    <DateInput
                        name="startDate"
                        label={t("Start Date")}
                        aria-label={t("Start Date")}
                        rules={{
                            required: {
                                value: true,
                                message: t("{{name}} is required", { name: t("Start Date") }),
                            },
                        }}
                    />
                    <DateInput
                        name="predictedEnd"
                        label={t("Predicted End")}
                        aria-label={t("Predicted End")}
                        rules={{
                            validate: (getValues: Function) => {
                                console.log(getValues("predictedEnd"));
                                if (
                                    getValues("predictedEnd") &&
                                    getValues("predictedEnd") < getValues("startDate")
                                ) {
                                    return t("Predicated End should be after Start Date");
                                }
                                return true;
                            },
                        }}
                    />
                </Stack>
            </Form>
        </DraggableDialog>
    );
};

export default CreateEditModal;
