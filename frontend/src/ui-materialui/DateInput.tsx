import React from "react";
import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import FormControl from "@mui/material/FormControl";
import { Controller, useFormContext } from "react-hook-form";

type PropTypes = { rules?: any; name: string; [key: string]: any };
const DateInput: React.FC<PropTypes> = ({ rules, name, ...rest }) => {
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
                    <MobileDatePicker
                        className="ui-forminput"
                        inputFormat="yyyy-MM-DD"
                        {...rest}
                        {...field}
                        renderInput={params => <TextField size="small" {...params} />}
                    />
                )}
            />
            {errors && errors[name] && <div>{errors[name]?.message}</div>}
        </FormControl>
    );
};

export { DateInput };
