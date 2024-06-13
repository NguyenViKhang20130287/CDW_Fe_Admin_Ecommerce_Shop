import {
    ArrayField, Datagrid,
    FunctionField,
    ImageField,
    ImageInput,
    Labeled,
    Show,
    SimpleShowLayout,
    TextField
} from "react-admin";
import React from "react";
import {Grid} from "@mui/material";

export const UserShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Labeled label={'ID'}>
                            <TextField source={'id'}/>
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled label={'Username'}>
                            <TextField source={'username'}/>
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled label={'Họ và Tên'}>
                            <TextField source={'userInformation.fullName'}/>
                        </Labeled>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Labeled label={'Email'}>
                            <TextField source={'userInformation.email'}/>
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled label={'Số Điện Thoại'}>
                            <TextField source={'userInformation.phone'}/>
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled label={'Quyền'}>
                            <TextField source={`permission.name`}/>
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled label={"Trạng thái"}>
                            <FunctionField
                                source="status"
                                render={(record: {
                                    status: boolean
                                }) => record.status ? "Hoạt động" : "Đã khóa"}
                            />
                        </Labeled>
                    </Grid>
                </Grid>
                <ImageField label={"Ảnh đại diện"} source={"userInformation.avatar"} title=" title"/>
                <ArrayField source={'addresses'} label={'Sổ Địa Chỉ'}>
                    <Datagrid bulkActionButtons={false}>
                        <TextField label={'Mã địa chỉ'} source={'id'}/>
                        <TextField label={'Họ Tên'} source={'fullName'}/>
                        <TextField label={'Số Điện Thoại'} source={'phone'}/>
                        <TextField label={'Địa Chỉ Cụ Thể'} source={'street'}/>
                        <TextField label={'Phường/Xã'} source={'ward'}/>
                        <TextField label={'Quận/Huyện'} source={'district'}/>
                        <TextField label={'Tỉnh/TP'} source={'province'}/>
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    )
}