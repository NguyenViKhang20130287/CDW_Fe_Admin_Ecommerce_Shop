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
    ShowButton, Edit, EditButton, Show, SimpleList, ImageField
} from "react-admin";
import {Slider} from "../../types";
import SliderAside from "./SliderAside";

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
export const SliderList = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    const [permission, setPermission] = useState(localStorage.getItem('permission'))
    useEffect(() => {

    }, [permission]);
    return (
        <List
            filters={undefined}
            sort={{field: 'id', order: 'ASC'}}
            perPage={25}
            aside={<SliderAside/>}
            actions={<VisitorListActions/>}
        >
            {isSmall ? (
                <SimpleList<Slider>
                    primaryText={record => record.description}
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
                    <ImageField source={'link'} label={'Ảnh'}/>
                    <TextField source={'description'} label={'Mô tả'}/>
                    <BooleanField source={'status'} label="Trạng thái"/>
                    <TextField source={'createdAt'} label={'Ngày tạo'}/>
                    {(permission === 'ADMIN' || permission === 'PROMOTION_MANAGER') &&
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


export default SliderList;
