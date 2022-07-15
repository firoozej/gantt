import { useMutation } from "@apollo/client";

export const useUpdate = ({ mutation, nameSpace }: any) => {
    const [update, { loading }] = useMutation(mutation);

    const updateMutation = async (variables: any) => {
        await update({ variables }).catch(e => {
            return e.message;
        });
    };

    return {
        loading,
        update: updateMutation,
    };
};

