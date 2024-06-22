import React, {useEffect, useState} from "react";
import {Theme, useMediaQuery} from "@mui/material";
import {
    BooleanField,
    BulkDeleteButton,
    BulkUpdateButton,
    CreateButton,
    DatagridConfigurable,
    DeleteButton,
    ExportButton,
    ImageField,
    List,
    SelectColumnsButton,
    SimpleList,
    TextField,
    TopToolbar
} from "react-admin";
import BlogAside from "./BlogAside";
import {Blog} from "../../types";

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
export const BlogList = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    const [permission, setPermission] = useState(localStorage.getItem('permission'))
    useEffect(() => {

    }, [permission]);
    return (
        <List
            filters={undefined}
            sort={{field: 'id', order: 'ASC'}}
            perPage={25}
            aside={<BlogAside/>}
            actions={<VisitorListActions/>}
        >
            {isSmall ? (
                <SimpleList<Blog>
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
                    <ImageField source={'thumbnail'} label={'Ảnh'}/>
                    <TextField source={'title'} label={'Tên'}/>
                    <BooleanField source={'status'} label="Trạng thái"/>
                    <TextField source={'createdAt'} label={'Ngày tạo'}/>
                    <>
                        {permission === 'ADMIN' &&
                            <DeleteButton/>
                        }
                    </>
                </DatagridConfigurable>
            )}
        </List>
    )
}


export default BlogList;
