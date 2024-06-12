import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    SelectArrayInputProps,
    useRecordContext
} from 'react-admin';
import React from "react";
import {Size} from "../../types";


const SizeTitle = () => {
    const record = useRecordContext<Size>();
    return record ? <span>{record.name}</span> : null;
};
export const SizeEdit = (props: SelectArrayInputProps) => {
    return (
        <Edit title={<SizeTitle/>}>
            <SimpleForm>
                <TextInput source="name" validate={required()}/>
            </SimpleForm>
        </Edit>
    )
};
