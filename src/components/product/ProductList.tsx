import * as React from 'react';
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    EditButton,
    ChipField,
    SearchInput, DateInput, SelectColumnsButton, DatagridConfigurable, useGetList, BooleanInput, BooleanField,
} from 'react-admin';

import {
    List,
    NumberField,
    ImageField,
    TextField,
    BulkDeleteButton,
    BulkUpdateButton,
} from "react-admin";
import {Theme, useMediaQuery} from "@mui/material";
import {ProductAside} from "./ProductAside";

const visitorFilters = [
    <SearchInput alwaysOn name={"search"} source={"filter"}/>,
    <DateInput source="createdDate" name={"createdDate"}/>,
];

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);

export const ProductList = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <List
            filters={isSmall ? visitorFilters : undefined}
            sort={{field: 'name', order: 'DESC'}}
            perPage={25}
            aside={<ProductAside/>}
            actions={<VisitorListActions/>}
        >

            <DatagridConfigurable
                rowClick="show"
                bulkActionButtons={
                    <>
                        <BulkUpdateButton data={{stock: 100}} label="Refill stock"/>
                        <BulkDeleteButton/>
                    </>
                }
            >
                <TextField source="id" label="Mã SP"/>
                <ImageField sx={{m: "auto"}} source="thumbnail" label="Ảnh"/>
                <TextField source="name" label="Tên SP"/>
                <ChipField source="category.name" label="Danh mục"/>
                <BooleanField source={'status'} label="Trạng thái"/>
                <NumberField
                    source="price"
                    options={{
                        style: "currency",
                        currency: "VND",
                    }}
                    label="Giá"
                />
                <EditButton />
            </DatagridConfigurable>

        </List>)
};

export default ProductList;
