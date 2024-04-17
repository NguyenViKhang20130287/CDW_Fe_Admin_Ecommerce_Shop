import React, {useState} from "react";
import {
    CreateButton,
    Datagrid,
    DatagridConfigurable,
    DeleteButton,
    EditButton,
    ExportButton, FunctionField,
    List,
    Pagination,
    SelectColumnsButton, ShowButton,
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
                <TextField label={'ID'} source={'user.id'}/>
                <TextField label={'Họ và Tên'} source={'fullName'}/>
                <FunctionField
                    source="user.status"
                    label="Trạng thái"
                    render={(record: { user: { status: boolean } }) => record.user.status ? "Hoạt động" : "Đã khóa"}
                />
                <TextField label={'Quyền'} source={`user.permission.name`}/>
                <EditButton label={'Edit'} />
                <DeleteButton label={'Delete'}/>
            </DatagridConfigurable>
        </List>
    )
}

export default UserList