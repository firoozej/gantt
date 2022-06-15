import { useEffect, useState } from "react";

const useData = () => {
    const [state, setState] = useState({
        loading: false,
        data: {},
    });
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then(res => res.json())
            .then(
                result => {
                    setState({
                        loading: false,
                        data: result,
                    });
                },
                error => {
                    setState({
                        ...state,
                        loading: false,
                    });
                }
            );
    }, []);
    return { ...state };
};

export { useData };
