import React from "react";
import { Select } from "antd";

type PropTypes = {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    value?: any;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    onChange?: (item: any) => any;
    useData: () => { data: any[]; loading: boolean };
    selectIdField?: string;
    selectOptionField: string;
    [key: string]: any;
};

const SelectData: React.FC<PropTypes> = ({
    value,
    onChange,
    useData,
    selectIdField = "id",
    selectOptionField,
    ...rest
}) => {
    const { data, loading } = useData();

    return (
        <Select value={value} onChange={onChange} loading={loading} {...rest}>
            {data.map((item: any) => (
                <Select.Option key={item[selectIdField]} value={item[selectIdField]}>
                    {item[selectOptionField]}
                </Select.Option>
            ))}
        </Select>
    );
};

export { SelectData };
