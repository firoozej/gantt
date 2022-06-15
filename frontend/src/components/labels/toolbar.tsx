import React from "react";
import SubToolbar from "./subToolbar";
import { useData } from "./useData";

const Toolbar = () => {
    const { data, loading } = useData();
    //console.log("rerender toolbar");
    console.log(data);
    return (
        <>
            <label aria-label="title">{(data as any).title}</label>
            <SubToolbar />
        </>
    );
};
export default Toolbar;
