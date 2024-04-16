import * as React from 'react';
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    EditButton,
    SearchInput,
    DateInput,
    SelectColumnsButton,
    DatagridConfigurable,
    BooleanField,
    FunctionField,
} from 'react-admin';

import {
    List,
    NumberField,
    TextField,
    BulkDeleteButton,
    BulkUpdateButton,
} from "react-admin";
import {Theme, useMediaQuery} from "@mui/material";
import {PromotionAside} from "./PromotionAside";

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

export const PromotionList = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <List
            filters={isSmall ? visitorFilters : undefined}
            sort={{field: 'name', order: 'DESC'}}
            perPage={25}
            aside={<PromotionAside/>}
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
                <TextField source="name" label="Tên SP"/>
                <TextField sx={{m: "auto"}} source="description" label="Mô tả"/>
                <FunctionField
                    source={'discount_rate'}
                    label="Tỉ lệ"
                    render={(record : any) => `${record.discount_rate}%`}
                />
                <BooleanField source={'status'} label="Trạng thái"/>
                <TextField source={'start_date'} label={"Ngày bắt đầu"}/>
                <TextField source={'end_date'} label={"Ngày kết thúc"}/>
                <EditButton/>
            </DatagridConfigurable>

        </List>)
};

