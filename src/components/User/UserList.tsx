import React, {useState} from "react";
import {
    CreateButton,
    DatagridConfigurable,
    DeleteButton,
    EditButton,
    ExportButton, FunctionField,
    List,
    SelectColumnsButton,
    TextField,
    TopToolbar
}
    from "react-admin";
import {UserListAside} from "./UserListAside";

const UserList = (props: any) => {

    const VisitorListActions = () => (
        <TopToolbar>
            <CreateButton/>
            <SelectColumnsButton/>
            <ExportButton/>
        </TopToolbar>
    );

    return (
        <List {...props}
            // filters={isSmall ? visitorFilters : undefined}
              sort={{field: 'fullName', order: 'ASC'}}
              aside={<UserListAside/>}
              actions={<VisitorListActions/>}
        >
            <DatagridConfigurable
            rowClick={"show"}
            >
                <TextField label={'ID'} source={'id'}/>
                <TextField label={'Họ và Tên'} source={'userInformation.fullName'}/>
                <FunctionField
                    source="status"
                    label="Trạng thái"
                    render={(record: {  status: boolean }) => record.status ? "Hoạt động" : "Đã khóa"}
                />
                <TextField label={'Quyền'} source={`permission.name`}/>
                <EditButton label={'Edit'} />
                <DeleteButton label={'Delete'}/>
            </DatagridConfigurable>
        </List>
    )
}

export default UserList