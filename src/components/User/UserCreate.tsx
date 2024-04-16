import React from "react";
import {Create, SelectInput, SimpleForm, TextInput} from "react-admin";
import {Grid} from "@mui/material";

export const UserCreate = (props: any) => {
    return (
        <Create title={"Thêm người dùng mới"} {...props}>
            <SimpleForm>
                <Grid>
                    <TextInput
                        name={""}
                        source={"username"}
                        label={"Tên Đăng Nhập"}
                    />
                    <TextInput name={""} source={"email"} label={"Email"}/>
                </Grid>
                <Grid>
                    <TextInput name={""} source={"fullName"} label={"Họ và Tên"}/>
                    <TextInput name={""} source={"phone"} label={"Số điện thoại"}/>
                </Grid>

                <TextInput name={""} source={"address"} label={"Địa chỉ"}/>
                <SelectInput name={""} label={"Quyền"} source={"role"} choices={[
                    {id: '0', name: 'CUSTOMER'},
                    {id: '1', name: 'ADMIN'}
                ]}/>
            </SimpleForm>
        </Create>
    )
}