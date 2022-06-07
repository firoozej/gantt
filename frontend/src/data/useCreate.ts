import { useMutation } from "@apollo/client";

export const useCreate = (mutation: any, nameSpace: string) => {
    const [create, { data, loading, error }] = useMutation(mutation);
    if(error) {
        throw new Error("Failed")
    }
    return {
        data: data ? data[nameSpace] : [],
        loading,
        create,
    };
};
