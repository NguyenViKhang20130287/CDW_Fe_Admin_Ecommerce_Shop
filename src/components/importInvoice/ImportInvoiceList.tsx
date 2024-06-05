import * as React from 'react';
import {
    ArrayInput,
    Create, CreateButton,
    DatagridConfigurable,
    DateField,
    ExportButton,
    FilterButton,
    List,
    NumberField,
    Pagination,
    SelectColumnsButton,
    TextField,
    TextInput,
    TopToolbar
} from 'react-admin';
import {Stack} from '@mui/material';
// import ImportButton from "./ImportButton";

const ListActions = () => (
    <TopToolbar>
        <CreateButton label={'Nhập kho'}/>
        {/*<ImportButton/>*/}
        <SelectColumnsButton/>
        <FilterButton/>
        <ExportButton label={"Xuất File"}/>
    </TopToolbar>
);

const postFilters = [
    <TextInput sx={{marginLeft: '20px'}} label="Tìm kiếm..." source="q" alwaysOn/>,
];

const ImportInvoiceList = () => {
    return (
        <List
            sort={{field: 'id', order: 'ASC'}}
            perPage={10}
            pagination={false}
            component="div"
            actions={<ListActions/>}
            filters={postFilters}
            sx={{backgroundColor: 'white'}}
        >
            <DatagridConfigurable>
                <TextField source="id"/>
                <TextField source="product.name" label={"Tên sản phẩm"}/>
                <TextField source="color.name" label={"Màu sắc"}/>
                <TextField source="size.name" label={"Kích thước"}/>
                <NumberField source="importPrice" label={"Giá nhập"}/>
                <NumberField source="quantity" label={"Số lượng"}/>
                <DateField source="createdAt" label={"Ngày nhập"}/>

            </DatagridConfigurable>
            <Pagination/>
        </List>
    )
};


export default ImportInvoiceList;
