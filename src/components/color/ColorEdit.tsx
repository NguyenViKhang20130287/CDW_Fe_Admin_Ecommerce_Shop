import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    SelectArrayInputProps,
    useRecordContext
} from 'react-admin';
import {Blog} from "../../types";
import {RichTextInput} from "ra-input-rich-text";
import {MuiColorInput} from "mui-color-input";
import React, {useState} from "react";
import CustomColorInput from "./CustomColorInput";


const ColorTitle = () => {
    const record = useRecordContext<Blog>();
    return record ? <span>{record.name}</span> : null;
};
export const ColorEdit = (props: SelectArrayInputProps) => {
    return (
        <Edit title={<ColorTitle/>}>
            <SimpleForm>
                <TextInput source="name" validate={required()}/>
                <CustomColorInput source="colorCode" />
            </SimpleForm>
        </Edit>
    )
};
