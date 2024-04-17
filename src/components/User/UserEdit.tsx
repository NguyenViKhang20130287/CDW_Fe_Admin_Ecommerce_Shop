import {
    BooleanInput,
    Edit, FunctionField,
    ImageField, ImageInput,
    SelectInput,
    SimpleForm,
    TextInput, useDataProvider,
    useEditController
} from "react-admin";
import {Grid} from "@mui/material";
import React, {useState} from "react";
import {useParams} from 'react-router-dom'

export const UserEdit = (props: any) => {

    const {id} = useParams();
    const {record, save, isLoading} = useEditController({resource: 'user', id});

    const [permissionId, setPermissionId] = useState(record.user.permission.id)
    const dataProvider = useDataProvider()

    return (
        <Edit {...props} title={'Sửa Thông Tin Người Dùng'}>
            <SimpleForm>
                <Grid>
                    <TextInput
                        name={""}
                        source={"user.username"}
                        label={"Tên Đăng Nhập"}
                        disabled={true}
                    />
                    <TextInput name={""} source={"email"} label={"Email"}/>
                </Grid>
                <Grid>
                    <TextInput name={""} source={"fullName"} label={"Họ và Tên"}/>
                    <TextInput name={""} source={"phone"} label={"Số điện thoại"}/>
                </Grid>

                <TextInput name={""} source={"address"} label={"Địa chỉ"}/>
                <SelectInput name={"permission"} label={"Quyền"}
                             source={`permission`}
                             defaultValue={permissionId}
                             choices={[
                                 {id: '1', name: 'ADMIN'},
                                 {id: '2', name: 'CUSTOMER'}
                             ]}
                />

                <ImageInput name={""} source={"avatar"} accept={'image/*'} label={'Avatar'}
                            placeholder={<p>Chọn ảnh</p>}
                >
                    <ImageField source={"src"} title=""/>
                </ImageInput>
                <BooleanInput label={"Trạng thái"} name={""} source={"user.status"}/>

            </SimpleForm>
        </Edit>
    )
}