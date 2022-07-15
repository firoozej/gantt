import { useMutation } from "@apollo/client";

export const useCreate = ({ mutation, update }: any) => {
    const [create, { loading }] = useMutation(mutation, {
        update,
    });

    const createMutation = async (variables: any) => {
        await create({ variables }).catch(e => {
            return e.message;
        });
    };

    return {
        loading,
        create: createMutation,
    };
};
