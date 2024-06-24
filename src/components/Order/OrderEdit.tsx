import {
    ArrayField,
    Datagrid,
    DateInput,
    Edit,
    FunctionField, ImageField,
    NumberInput,
    SelectInput,
    SimpleForm, TextField,
    TextInput
} from "react-admin";
import {Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";

export const OrderEdit = () => {
    const [deliveryStatuses, setDeliveryStatuses] = useState([])

    const fetchDataDeliveryStatus = async () => {
        try {
            // https://teelab-be.up.railway.app/api/v1/order/delivery-statuses
            const res: any = await axios.get("https://teelab-be.up.railway.app/api/v1/order/delivery-statuses")
            console.log('Response: ', res)
            const data = res.data.map((item: { id: any; description: any; }) => {
                return {
                    id: item.id,
                    name: item.description
                }
            })
            setDeliveryStatuses(data)
        } catch (e) {
            console.log('Err fetching data delivery status: ', e)
        }
    }

    useEffect(() => {
        fetchDataDeliveryStatus()
    }, []);
    console.log('Deli: ', deliveryStatuses)

    return (
        <Edit title={'Chỉnh sửa thông tin đơn hàng'}>
            <SimpleForm>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <NumberInput fullWidth={true} name={"id"} source={"id"} label={"Mã đơn hàng"} />
                        <TextInput fullWidth={true} name={"fullName"} source={"fullName"} label={"Họ và Tên"}
                                   />
                        <NumberInput fullWidth={true} name={"phone"} source={"phone"} label={"Số điện thoại"}
                                     />
                        <TextInput fullWidth={true} name={"address"} source={"address"} label={"Địa chỉ"}
                                   />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput fullWidth={true} name={"totalAmount"} source={"totalAmount"} label={"Tổng tiền"}
                                   />
                        <SelectInput fullWidth={true} name={'paymentStatus'} source={'paymentStatus'} 
                                     label={'Trạng thái thanh toán'}
                                     choices={
                                         [
                                             {
                                                 id: false,
                                                 name: "Chưa thanh toán"
                                             },
                                             {
                                                 id: true,
                                                 name: 'Đã thanh toán'
                                             }
                                         ]
                                     }/>
                        <SelectInput fullWidth={true} name={'paymentMethod'} source={'paymentMethod'} 
                                     label={'Phương thức thanh toán'}
                                     choices={
                                         [
                                             {
                                                 id: "COD",
                                                 name: "COD"
                                             },
                                             {
                                                 id: 'VNPAY',
                                                 name: 'VNPAY'
                                             }
                                         ]
                                     }/>
                        <SelectInput fullWidth={true} name={'deliveryStatus.id'} source={'deliveryStatus.id'}
                                     label={'Trạng thái đơn hàng'}
                                     choices={deliveryStatuses}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput fullWidth={true} name={"discountCode.code"} source={"discountCode.code"}
                                   label={"Mã giảm giá"} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <NumberInput fullWidth={true} name={"discountCode.discountMoney"}
                                             source={"discountCode.discountMoney"} label={"Số tiền giảm"}
                                             />
                            </Grid>
                            <Grid item xs={6}>
                                <NumberInput fullWidth={true} name={"discountCode.discountRate"}
                                             source={"discountCode.discountRate"} label={"Phần trăm giảm"}
                                             />
                            </Grid>
                        </Grid>
                        <NumberInput fullWidth={true} name={"shippingCost"} source={"shippingCost"}
                                     label={"Phí vận chuyển"} />
                        <DateInput fullWidth={true} name={"createdAt"} source={"createdAt"} label={"Ngày tạo đơn"}
                                   />
                    </Grid>
                </Grid>
                <ArrayField source={'orderDetails'} label={'Danh sách sản phẩm'}>
                    <Datagrid bulkActionButtons={false}>
                        <TextField label={'Mã sản phẩm'} source={'product.id'}/>
                        <TextField label={'Tên sản phẩm'} source={'product.name'}/>
                        <TextField label={'Danh mục'} source={'product.category.name'}/>
                        <ImageField label={'Ảnh'} source={'product.thumbnail'}/>
                        <TextField label={'Màu'} source={'color.name'}/>
                        <TextField label={'Kích cỡ'} source={'size.name'}/>
                        <TextField label={'Số lượng'} source={'quantity'}/>
                        <TextField label={'Gía'} source={'price'}/>
                        <TextField label={'Gía gốc'} source={'product.price'}/>
                    </Datagrid>
                </ArrayField>
            </SimpleForm>
        </Edit>
    )
}