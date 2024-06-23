import React, {useEffect, useState} from "react";
import {Create, ImageField, ImageInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import {Grid} from "@mui/material";
import axios from 'axios'

export const UserCreate = (props: any) => {
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
        <Create title={"Thêm người dùng mới"} {...props}>
            <SimpleForm>
                <Grid container spacing={2}>

                    <Grid item xs={4}>
                        <TextInput fullWidth={true} name={""} source={"username"} label={"Tên Đăng Nhập"}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput fullWidth={true} name={""} source={"email"} label={"Email"}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput fullWidth={true} name={""} source={"fullName"} label={"Họ và Tên"}/>
                    </Grid>

                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextInput fullWidth={true} name={""} source={"phone"} label={"Số điện thoại"}/>
                    </Grid>
                    <Grid item xs={6}>
                        <SelectInput fullWidth={true} name={""} label={"Quyền"} source={"permission"} choices={permissions}/>
                    </Grid>
                </Grid>

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
                    name={""} source={"avatar.src"} accept={'image/*'} label={'Ảnh đại diện'}
                    placeholder={<p>Chọn ảnh</p>}
                >
                    <ImageField source={"src"} title=""/>
                </ImageInput>
            </SimpleForm>
        </Create>
    )
}