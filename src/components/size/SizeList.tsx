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
    CreateButton,
    SelectColumnsButton,
    ExportButton,
    ShowButton, Edit, EditButton, Show, SimpleList
} from "react-admin";
import {Size} from "../../types";

// const permission = localStorage.getItem("permission")

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
export const SizeList = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    const [permission, setPermission] = useState(localStorage.getItem('permission'))
    useEffect(() => {

    }, [permission]);
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

                    <TextField source={'id'} label={'Mã size'}/>
                    <TextField source={'name'} label={'Tên kích cỡ'}/>
                    <>
                        {(permission === 'ADMIN' || permission === 'PRODUCT_MANAGER') &&
                            <>
                                <EditButton sx={{marginRight: "30px"}}/>
                                <DeleteButton/>
                            </>
                        }
                    </>
                </DatagridConfigurable>
            )}
        </List>
    )
}


export default SizeList;
