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
    CreateButton,
    SelectColumnsButton,
    ExportButton,
    ShowButton, Edit, EditButton, Show, SimpleList
} from "react-admin";
import {Size} from "../../types";

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);
export const SizeList = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
        <List
            filters={undefined}
            sort={{field: 'id', order: 'ASC'}}
            perPage={25}
            actions={<VisitorListActions/>}
        >
            {isSmall ? (
                <SimpleList<Size>
                    primaryText={record => record.name}
                    secondaryText={record => record.color_code}
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
                    <TextField source={'name'} label={'Tên kích cỡ'}/>
                    <>
                        <EditButton sx={{marginRight: "30px"}}/>
                        <DeleteButton/>
                    </>
                </DatagridConfigurable>
            )}
        </List>
    )
}


export default SizeList;
