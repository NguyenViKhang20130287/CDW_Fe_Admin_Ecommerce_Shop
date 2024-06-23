import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    useGetList,
    SelectArrayInputProps,
    Labeled,
    ReferenceManyField,
    Datagrid, TextField, NumberField, EditButton, BooleanInput, useRecordContext
} from 'react-admin';
import React, {useEffect, useState} from "react";
import {Category, Promotion} from "../../types";
import ThumbnailField from "../product/ThumbnailField";


const CategoryTitle = () => {
    const record = useRecordContext<Category>();
    return record ? <span>{record.name}</span> : null;
};
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
        <Edit title={<CategoryTitle/>}>
            <SimpleForm>
                <TextInput source="name" validate={required()}/>
                <BooleanInput source="status" label="Trạng thái" defaultValue={false}/>
                <Labeled label="Sản phẩm thuộc danh mục" fullWidth>
                    <ReferenceManyField
                        reference="product"
                        target="category"
                        perPage={20}
                    >
                        <Datagrid
                            sx={{
                                '& .column-thumbnail': {
                                    width: 25,
                                    padding: 0,
                                },
                            }}
                        >
                            <ThumbnailField source="thumbnail" label="Ảnh" />
                            <TextField source="name" label={"Tên sản phẩm"} />
                            <NumberField
                                source="price"
                                options={{
                                    style: "currency",
                                    currency: "VND",
                                }}
                                label="Giá"
                            />
                            <NumberField source="quantity" label={"Số lượng"} />
                            <EditButton />
                        </Datagrid>
                    </ReferenceManyField>
                </Labeled>
            </SimpleForm>
        </Edit>
    )
};
