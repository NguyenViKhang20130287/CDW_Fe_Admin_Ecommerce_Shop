import React, { useState } from 'react';
import { useInput, InputProps } from 'react-admin';
import { MuiColorInput } from 'mui-color-input';

const CustomColorInput = (props: InputProps) => {
    const {
        field,
        fieldState: { error, isTouched },
        formState: { isSubmitting }
    } = useInput(props);

    const [color, setColor] = useState(field.value || '#ffffff');

    const handleChange = (newColor: string) => {
        setColor(newColor);
        field.onChange(newColor);
    };

    return (
        <div>
            <MuiColorInput
                format={'hex'}
                value={color}
                onChange={handleChange}
                disabled={isSubmitting}
            />
            {isTouched && error && <span>{error.message}</span>}
        </div>
    );
};

export default CustomColorInput;
