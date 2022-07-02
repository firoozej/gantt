import { useMutation } from "@apollo/client";
import { message } from "ui-ant";

export const useCreate = ({ mutation, update }: any) => {
    const [create, { loading, error }] = useMutation(mutation, {
        update,
    });
    if (error) {
        message.error("Error Occured!");
    }
    return {
        loading,
        create,
    };
};
