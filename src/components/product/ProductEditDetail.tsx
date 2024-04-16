import * as React from 'react';
import {
    BooleanInput,
    Edit,
    NumberInput,
    required, SelectArrayInput, SelectArrayInputProps, SelectInput,
    TextInput, useGetList,
} from 'react-admin';
import {InputAdornment, Grid} from '@mui/material';
import {useEffect, useState} from "react";
import {RichTextInput} from "ra-input-rich-text";
import {Category} from "../../types";


export const ProductEditDetails = (props: SelectArrayInputProps) => {
    const [category, setCategories] = useState<Category[]>([]);
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
        <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
                <TextInput source="name" fullWidth validate={req}/>
            </Grid>

            <Grid item xs={12} sm={12}>
                <BooleanInput source={"status"} label={"Trạng thái"}/>
            </Grid>

            <Grid item xs={12} sm={4}>
                <NumberInput
                    source="price"
                    label={"Giá"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">đ</InputAdornment>
                        ),
                    }}
                    validate={req}
                    fullWidth/>
            </Grid>
            <Grid item xs={12} sm={8}>
                <SelectInput
                    source="category.id"
                    label="Danh mục"
                    choices={category}
                    optionText="name"
                    optionValue="id"
                    fullWidth
                    validate={req}
                />

            </Grid>
            <Grid item xs={12} sm={12}>
                <RichTextInput source="content" label="Mô tả" validate={req}/>
            </Grid>
        </Grid>
    )
};

const req = [required()];
