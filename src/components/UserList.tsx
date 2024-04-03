import React from "react";
import {Datagrid, List, TextField} from "react-admin";

const UserList = () =>{
    return (
        <List>
            <Datagrid>
                <TextField source={'id'}/>
                <TextField source={'username'}/>
                <TextField source={'password'}/>
            </Datagrid>
        </List>
    )
}

export default UserList