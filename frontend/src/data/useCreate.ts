import { useMutation } from "@apollo/client";

export const useCreate = ({ mutation, nameSpace }: any) => {
    const [create, { loading }] = useMutation(mutation);
    return {
        loading,
        create,
    };
};
