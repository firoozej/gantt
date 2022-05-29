import { useMutation } from "@apollo/client";

export const useCreate = (mutation: any, nameSpace: string) => {
    const [mutateFunction, { data, loading, error }] = useMutation(mutation);
    return {
        data: data ? data[nameSpace] : [],
        loading,
    };
};
