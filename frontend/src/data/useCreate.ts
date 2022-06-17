import { useMutation } from "@apollo/client";

export const useCreate = (mutation: any, nameSpace: string) => {
    const [create, { data, loading, error }] = useMutation(mutation);
    if(error) {
        console.log(error);
        throw new Error(error.message)
    }
    return {
        data: data ? data[nameSpace] : {},
        loading,
        create,
    };
};
