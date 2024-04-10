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
    ShowButton, Edit, EditButton, Show, SimpleList
} from "react-admin";
import CategoryAside from "./CategoryAside";
import {Category} from "../../types";

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);
export const CategoryList = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
        <List
            filters={undefined}
            sort={{field: 'name', order: 'DESC'}}
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
                    <TextField source={'created_at'} label={'Ngày tạo'}/>
                    <>
                        <ShowButton/>
                        <EditButton/>
                    </>
                </DatagridConfigurable>
            )}
        </List>
    )
}


export default CategoryList;
