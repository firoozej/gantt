import { useQuery } from "@apollo/client";

export const useOverview = (query: any, nameSpace: string, variables: any) => {
    const { data, loading } = useQuery(query, { variables });

    return {
        data: data ? data[nameSpace].data : [],
        total: data ? data[nameSpace].total : 0,
        loading,
    };
};
