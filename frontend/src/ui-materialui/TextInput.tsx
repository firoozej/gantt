import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Controller, useFormContext } from "react-hook-form";

type PropTypes = { rules?: any; name: string; [key: string]: any };
const TextInput: React.FC<PropTypes> = ({ rules, name, ...rest }) => {
    const {
        control,
        formState: { errors },
        getValues,
    } = useFormContext();

    return (
        <FormControl margin="dense">
            <Controller
                name={name}
                control={control}
                rules={{
                    ...rules,
                    validate: rules.validate ? rules.validate.bind(null, getValues) : undefined,
                }}
                render={({ field }) => (
                    <TextField
                        className="ui-form-input"
                        variant="outlined"
                        size="small"
                        {...rest}
                        {...field}
                    />
                )}
            />
            {errors && errors[name] && <p>{errors[name]?.message}</p>}
        </FormControl>
    );
};

export { TextInput };
