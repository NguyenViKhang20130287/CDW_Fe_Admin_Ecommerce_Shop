import React from "react";
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
    SimpleList, ImageField
} from "react-admin";
import BlogAside from "./BlogAside";
import {Blog} from "../../types";

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);
export const BlogList = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
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
                        <DeleteButton/>
                    </>
                </DatagridConfigurable>
            )}
        </List>
    )
}


export default BlogList;
