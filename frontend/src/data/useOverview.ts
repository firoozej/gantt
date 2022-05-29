import { useQuery } from "@apollo/client";

export const useOverview = (query: any, nameSpace: string) => {
    const { data, loading } = useQuery(query);
    return {
        data: data ? data[nameSpace] : [],
        loading,
    };
};
