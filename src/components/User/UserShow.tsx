import {FunctionField, ImageField, ImageInput, Show, SimpleShowLayout, TextField} from "react-admin";
import React from "react";

export const UserShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField label={'ID'} source={'id'}/>
                <TextField label={'Họ và Tên'} source={'userInformation.fullName'}/>
                <TextField label={'Email'} source={'userInformation.email'}/>
                <TextField label={'Số Điện Thoại'} source={'userInformation.phone'}/>
                <TextField label={'Địa chỉ'} source={'userInformation.address'}/>
                <TextField label={'Quyền'} source={`permission.name`}/>
                <FunctionField
                    source="status"
                    label="Trạng thái"
                    render={(record: {
                        status: boolean }) => record.status ? "Hoạt động" : "Đã khóa"}
                />
                <ImageField label={"Ảnh đại diện"} source={"userInformation.avatar"} title=" title"/>
            </SimpleShowLayout>
        </Show>
    )
}