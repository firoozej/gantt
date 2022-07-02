import React, { useState } from "react";
import { Table, TableProps } from "antd";

type PropTypes = {
    useData: (props: any) => { loading: boolean; data: any[], total: number };
};

const Grid: React.FC<TableProps<any> & PropTypes> = ({ useData, ...rest }) => {
    const [page, setPage] = useState(1);
    const { data, total, loading } = useData({ pagination: { pageNumber: page, pageSize: 20 } });

    return (
        <Table
            dataSource={data}
            loading={loading}
            rowKey="id"
            pagination={{
                total,
                current: page,
                onChange: (pageNumber: number) => setPage(pageNumber)
            }}
            {...rest}
        />
    );
};

export { Grid };
