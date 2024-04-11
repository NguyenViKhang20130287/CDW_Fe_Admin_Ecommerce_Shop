import React, {useState} from "react";
import {
    CreateButton,
    Datagrid,
    DatagridConfigurable,
    DeleteButton,
    EditButton,
    ExportButton,
    List,
    Pagination,
    SelectColumnsButton,
    TextField,
    TopToolbar
}
    from "react-admin";
import UserSide from "./UserSide";

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
              pagination={<Pagination rowsPerPageOptions={[5, 10, 15, 20]}/>}
              // filters={isSmall ? visitorFilters : undefined}
              sort={{field: 'fullName', order: 'DESC'}}
            // perPage={3}
            aside={<UserSide/>}
              actions={<VisitorListActions/>}
        >
            <DatagridConfigurable>
                <TextField label={'ID'} source={'user.id'}/>
                <TextField label={'Full Name'} source={'fullName'}/>
                <TextField label={'Email'} source={'email'}/>
                <TextField label={'Status'} source={`user.status`}/>
                <TextField label={'Role'} source={`user.authorities[0].authority`}/>
                <EditButton label={'Edit'}/>
                <DeleteButton label={'Delete'}/>
            </DatagridConfigurable>
        </List>
    )
}

export default UserList