import {
    Edit,
    SimpleForm,
    TextInput,
    required, useGetList, SelectArrayInputProps, BooleanInput, DateField, DateInput
} from 'react-admin';
import React, {useEffect, useState} from "react";
import {Category} from "../../types";

export const CategoryEdit = (props: SelectArrayInputProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const {data}: any = useGetList<Category>('category', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="name" validate={required()}/>
                <BooleanInput source="status" label="Trạng thái" defaultValue={false}/>
            </SimpleForm>
        </Edit>
    )
};
