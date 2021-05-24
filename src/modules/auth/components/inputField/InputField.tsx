import React from 'react';
import {TextField} from "@material-ui/core";

interface Props {
        register: any;
        label: string;
        id: string;
        name: string;
        autoComplete: string;
        isAutofocus: boolean;
}

const InputField: React.FC<Props> = ({register, label, id, name, autoComplete, isAutofocus}) => {
    return (
        <TextField
            inputRef={register}
            label={label}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={id}
            name={name}
            autoComplete={autoComplete}
            autoFocus={isAutofocus}
        />
    );
};

export default InputField;
