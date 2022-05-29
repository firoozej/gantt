import React from "react";
import { Table, TableProps } from "antd";

type PropTypes = {
    useData: () => { loading: boolean; data: any[] };
};

const Grid: React.FC<TableProps<any> & PropTypes> = ({ useData, ...rest }) => {
    const { data, loading } = useData();

    return <Table dataSource={data} loading={loading} rowKey="id" {...rest} />;
};

export { Grid };
