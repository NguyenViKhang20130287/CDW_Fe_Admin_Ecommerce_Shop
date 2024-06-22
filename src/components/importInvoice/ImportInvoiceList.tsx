import * as React from 'react';
import {
    ArrayInput,
    Create, CreateButton,
    DatagridConfigurable,
    DateField,
    ExportButton,
    FilterButton, FunctionField,
    List,
    NumberField,
    Pagination,
    SelectColumnsButton,
    TextField,
    TextInput,
    TopToolbar, useListController
} from 'react-admin';
import ImportButton from "./ImportButton";
import ImportInvoiceShow from "./ImportInvoiceShow";
import {useEffect, useState} from "react";

// const ListActions = () => (
//     <TopToolbar>
//         <ImportButton/>
//         <CreateButton label={'Nhập hàng thủ công'}/>
//         <SelectColumnsButton/>
//         <FilterButton/>
//         <ExportButton label={"Xuất File"}/>
//     </TopToolbar>
// );

const ListActions = () => {
        const [permission, setPermission] = useState(localStorage.getItem('permission'))
        useEffect(() => {

        }, [permission]);
        return (
            <TopToolbar>
                {(permission === 'ADMIN' || permission === 'PRODUCT_MANAGER') &&
                    <>
                        <ImportButton/>
                        <CreateButton label={'Nhập hàng thủ công'}/>
                    </>
                }
                <SelectColumnsButton/>
                <FilterButton/>
                <ExportButton label={"Xuất File"}/>
            </TopToolbar>
        )
    }
;

const postFilters = [
    <TextInput sx={{marginLeft: '20px'}} label="Tìm kiếm..." source="q" alwaysOn/>,
];

const ImportInvoiceList = () => {
    const {data, isLoading}: any = useListController();
    const [permission, setPermission] = useState(localStorage.getItem('permission'))
    useEffect(() => {

    }, [permission]);

    if (isLoading) return null;

    const getQuantity = (record: any) => {
        let quantity = 0;
        for (let i = 0; i < record.importWarehouseDetails.length; i++) {
            quantity += record.importWarehouseDetails[i].quantity;
        }
        return quantity;
    }
    return (
        <List
            sort={{field: 'id', order: 'ASC'}}
            perPage={10}
            actions={<ListActions/>}
            filters={postFilters}
        >
            <DatagridConfigurable rowClick="expand" expandSingle expand={<ImportInvoiceShow/>} bulkActionButtons={false}
                                  empty={
                                      <div style={
                                          {
                                              display: 'flex',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              height: '100%'
                                          }
                                      }>
                                          <p style={
                                              {
                                                  fontSize: '28px',
                                                  color: '#8f8f8f'
                                              }
                                          }>Hiện không có dữ liệu</p>
                                      </div>
                                  }>
                <TextField source="id" label={"Mã nhập hàng"}/>
                <DateField source="createdAt" label={"Ngày nhập hàng"}/>
                <TextField source="createdBy.username" label={"Người nhập hàng"}/>
                <FunctionField render={(record: any) => (
                    <span>{getQuantity(record)}</span>
                )} label={"Số lượng"}/>
                <NumberField source="totalAmount" label={"Tổng tiền"}/>
            </DatagridConfigurable>
        </List>
    )
};


export default ImportInvoiceList;
