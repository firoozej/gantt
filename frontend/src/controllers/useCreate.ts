import { useMutation } from "@apollo/client";

const useCreate = (gql: any) => {
    const [create, { data, loading, error }] = useMutation(gql);
    if(error) {
        throw new Error("Error in create");
    }
    return { create, data, loading };
};

export { useCreate };
