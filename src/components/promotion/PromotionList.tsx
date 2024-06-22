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
    FunctionField, DeleteButton,
} from 'react-admin';

import {
    List,
    TextField,
    BulkDeleteButton,
    BulkUpdateButton,
} from "react-admin";
import {Theme, useMediaQuery} from "@mui/material";
import {PromotionAside} from "./PromotionAside";
import {useEffect, useState} from "react";

const visitorFilters = [
    <SearchInput alwaysOn name={"search"} source={"filter"}/>,
    <DateInput source="createdDate" name={"createdDate"}/>,
];

const VisitorListActions = () => {
        const [permission, setPermission] = useState(localStorage.getItem('permission'))
        useEffect(() => {

        }, [permission]);
        return (
            <TopToolbar>
                {(permission === 'ADMIN' || permission === 'PROMOTION_MANAGER') &&
                    <CreateButton/>
                }
                <SelectColumnsButton/>
                <ExportButton/>
            </TopToolbar>
        )
    }
;

export const PromotionList = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    const [permission, setPermission] = useState(localStorage.getItem('permission'))
    useEffect(() => {

    }, [permission]);
    return (
        <List
            filters={isSmall ? visitorFilters : undefined}
            sort={{field: 'id', order: 'ASC'}}
            perPage={25}
            aside={<PromotionAside/>}
            actions={<VisitorListActions/>}
        >
            <DatagridConfigurable
                rowClick="show"
            >
                <TextField source="id" label="Mã KM"/>
                <TextField source="name" label="Tên KM"/>
                <TextField sx={{m: "auto"}} source="description" label="Mô tả"/>
                <FunctionField
                    source={'discount_rate'}
                    label="Tỉ lệ"
                    render={(record: any) => `${record.discount_rate}%`}
                />
                <BooleanField source={'status'} label="Trạng thái"/>
                <TextField source={'startDate'} label={"Ngày bắt đầu"}/>
                <TextField source={'endDate'} label={"Ngày kết thúc"}/>
                {(permission === 'ADMIN' || permission === 'PROMOTION_MANAGER') &&
                    <>
                        <EditButton sx={{marginRight: "30px"}}/>
                        <DeleteButton/>
                    </>
                }

            </DatagridConfigurable>

        </List>)
};

