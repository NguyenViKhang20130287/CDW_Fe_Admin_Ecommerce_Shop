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
import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import axios from "axios";

export const UserEdit = (props: any) => {

    const {id} = useParams();
    const {record, save, isLoading} = useEditController({resource: 'user', id});


    const [permissionId, setPermissionId] = useState(record?.permission?.id || '');

    const [permissions, setPermissions] = useState([])

    const fetchDataPermission = async () => {
        try {
            const res = await axios.get("https://teelab-be.up.railway.app/api/v1/permission/")
            setPermissions(res.data)
        } catch (e) {
            console.log('Err fetch data permisson: ', e)
        }
    }

    useEffect(() => {
        fetchDataPermission()
    }, [])

    return (
        <Edit {...props} title={'Sửa Thông Tin Người Dùng'}>
            <SimpleForm>
                <Grid container spacing={2}>
                    <Grid item xs={4}><TextInput fullWidth={true} name={""} source={"username"} label={"Tên Đăng Nhập"}
                                                 disabled={true}/></Grid>
                    <Grid item xs={4}><TextInput fullWidth={true} name={""} source={"userInformation.email"}
                                                 label={"Email"}/></Grid>
                    <Grid item xs={4}><TextInput fullWidth={true} name={""} source={"userInformation.fullName"}
                                                 label={"Họ và Tên"}/></Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}><TextInput fullWidth={true} name={""} source={"userInformation.phone"}
                                                 label={"Số điện thoại"}/></Grid>
                    <Grid item xs={6}><SelectInput fullWidth={true} name={"permission.id"} label={"Quyền"}
                                                   source={`permission.id`}
                                                   defaultValue={permissionId}
                                                   choices={permissions}/>
                    </Grid>
                </Grid>

                {/*<Grid container spacing={2}>*/}
                {/*    <Grid item xs={6}>*/}
                <ImageField source={'userInformation.avatar'} label={'Ảnh đại diện'} title={'Ảnh đại diện'}/>
                {/*</Grid>*/}
                {/*        <Grid item xs={6}>*/}
                <ImageInput
                    sx={{
                        [`& .RaFileInput-dropZone`]: {
                            width: "200px",
                            p: '10px 0',
                            '& p': {
                                p: "0",
                                m: "0"
                            }
                        }
                    }}
                    name={""} source={"avatar.src"} accept={'image/*'} label={'Ảnh đại diện mới'}
                    placeholder={<p>Chọn ảnh</p>}>
                    <ImageField source={"src"} title=""/>
                </ImageInput>
                {/*</Grid>*/}
                {/*</Grid>*/}

                <Grid><BooleanInput label={"Trạng thái"} name={""} source={"status"}/></Grid>

            </SimpleForm>
        </Edit>
    )
}