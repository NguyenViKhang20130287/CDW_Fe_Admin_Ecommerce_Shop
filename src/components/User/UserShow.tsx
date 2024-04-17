import {FunctionField, ImageField, ImageInput, Show, SimpleShowLayout, TextField} from "react-admin";
import React from "react";

export const UserShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField label={'ID'} source={'user.id'}/>
                <TextField label={'Họ và Tên'} source={'fullName'}/>
                <TextField label={'Email'} source={'email'}/>
                <TextField label={'Số Điện Thoại'} source={'email'}/>
                <TextField label={'Quyền'} source={`user.permission.name`}/>
                <FunctionField
                    source="user.status"
                    label="Trạng thái"
                    render={(record: {
                        user: { status: boolean } }) => record.user.status ? "Hoạt động" : "Đã khóa"}
                />
                <ImageField source={"avatar"} title=" title"/>
            </SimpleShowLayout>
        </Show>
    )
}