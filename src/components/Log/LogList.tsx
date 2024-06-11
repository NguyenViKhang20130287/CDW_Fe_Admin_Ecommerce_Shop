import {
    DatagridConfigurable,
    DateField,
    ExportButton,
    List,
    SelectColumnsButton,
    TextField,
    TopToolbar
} from "react-admin";
import React from "react";

const LogList = (props: any) => {

    const VisitorListActions = () => (
        <TopToolbar>
            <SelectColumnsButton/>
            <ExportButton/>
        </TopToolbar>
    );

    return (
        <List actions={<VisitorListActions/>}>
            <DatagridConfigurable>
                <TextField label={'Mã Log'} source={'id'}/>
                <DateField label={'Thời gian'} source={'timeStamp'} showTime/>
                <TextField label={'Mã Người Thực Hiện'} source={'user.id'}/>
                <TextField label={'Quyền Người Thực Hiện'} source={'user.permission.name'}/>
                <TextField label={'Hành Động'} source={'action'}/>
            </DatagridConfigurable>
        </List>
    )
}

export default LogList