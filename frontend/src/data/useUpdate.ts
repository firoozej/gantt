import { useMutation } from "@apollo/client";

export const useUpdate = ({ mutation, nameSpace }: any) => {
    const [update, { loading }] = useMutation(mutation);
    return {
        loading,
        update,
    };
};

