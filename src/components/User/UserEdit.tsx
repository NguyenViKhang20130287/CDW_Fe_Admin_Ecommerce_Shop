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


    const [permissionId, setPermissionId] = useState(record?.permission?.id || '');

    return (
        <Edit {...props} title={'Sửa Thông Tin Người Dùng'}>
            <SimpleForm>
                <Grid>
                    <TextInput
                        name={""}
                        source={"username"}
                        label={"Tên Đăng Nhập"}
                        disabled={true}
                    />
                    <TextInput name={""} source={"userInformation.email"} label={"Email"}/>
                </Grid>
                <Grid>
                    <TextInput name={""} source={"userInformation.fullName"} label={"Họ và Tên"}/>
                    <TextInput name={""} source={"userInformation.phone"} label={"Số điện thoại"}/>
                </Grid>

                <TextInput name={""} source={"userInformation.address"} label={"Địa chỉ"}/>
                <SelectInput name={"permission.id"} label={"Quyền"}
                             source={`permission.id`}
                             defaultValue={permissionId}
                             choices={[
                                 {id: '1', name: 'ADMIN'},
                                 {id: '2', name: 'CUSTOMER'}
                             ]}
                />

                <ImageField source={'userInformation.avatar'} label={'Ảnh đại diện'} title={'Ảnh đại diện'}/>
                <ImageInput name={""} source={"avatar.src"} accept={'image/*'} label={'Ảnh đại diện mới'}
                            placeholder={<p>Chọn ảnh</p>}
                >
                    <ImageField source={"src"} title=""/>
                </ImageInput>
                <BooleanInput label={"Trạng thái"} name={""} source={"status"}/>

            </SimpleForm>
        </Edit>
    )
}