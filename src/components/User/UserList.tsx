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

    const permission: any = localStorage.getItem("permission")
    const VisitorListActions = () => (
        <TopToolbar>
            {permission === 'ADMIN' &&
                <CreateButton/>
            }
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
                <TextField label={'Email'} source={'userInformation.email'}/>
                <FunctionField
                    source="status"
                    label="Trạng thái"
                    render={(record: { status: boolean }) => record.status ? "Hoạt động" : "Đã khóa"}
                />
                <TextField label={'Quyền'} source={`permission.name`}/>
                {permission === 'ADMIN' &&
                    <EditButton label={'Edit'}/>
                }
                {permission === 'ADMIN' &&
                    <DeleteButton label={'Delete'}/>
                }

            </DatagridConfigurable>
        </List>
    )
}

export default UserList