import React, {useEffect, useState} from "react";
import {useMediaQuery, Theme} from "@mui/material";
import {
    DeleteButton,
    BulkDeleteButton,
    BulkUpdateButton,
    List,
    TextField,
    DatagridConfigurable,
    TopToolbar,
    BooleanField,
    CreateButton,
    SelectColumnsButton,
    ExportButton,
    ShowButton, Edit, EditButton, Show, SimpleList
} from "react-admin";
import CategoryAside from "./CategoryAside";
import {Category} from "../../types";

const VisitorListActions = () => {
        const [permission, setPermission] = useState(localStorage.getItem('permission'))
        useEffect(() => {

        }, [permission]);
        return (
            <TopToolbar>
                {(permission === 'ADMIN' || permission === 'PRODUCT_MANAGER') &&
                    <CreateButton/>
                }
                <SelectColumnsButton/>
                <ExportButton/>
            </TopToolbar>
        )
    }
;
export const CategoryList = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    const [permission, setPermission] = useState(localStorage.getItem('permission'))
    useEffect(() => {

    }, [permission]);
    return (
        <List
            filters={undefined}
            sort={{field: 'id', order: 'ASC'}}
            perPage={25}
            aside={<CategoryAside/>}
            actions={<VisitorListActions/>}
        >
            {isSmall ? (
                <SimpleList<Category>
                    primaryText={record => record.name}
                    secondaryText={record => record.status ? "Đang hoạt động" : "Đã ẩn"}
                    tertiaryText={record => record.created_at}
                />
            ) : (
                <DatagridConfigurable
                    rowClick="show"
                    bulkActionButtons={
                        <>
                            <BulkUpdateButton data={{status: true}}/>
                            <BulkDeleteButton/>
                        </>
                    }>

                    <TextField source={'id'}/>
                    <TextField source={'name'} label={'Tên'}/>
                    <BooleanField source={'status'} label="Trạng thái"/>
                    <TextField source={'createdAt'} label={'Ngày tạo'}/>
                    {(permission === 'ADMIN' || permission === 'PRODUCT_MANAGER') &&
                        <>
                            <EditButton sx={{marginRight: "30px"}}/>
                            <DeleteButton/>
                        </>
                    }
                </DatagridConfigurable>
            )}
        </List>
    )
}


export default CategoryList;
