import {
    ArrayField,
    Datagrid,
    FunctionField, ImageField,
    Labeled, NumberField,
    Show,
    SimpleShowLayout,
    TabbedForm,
    TabbedShowLayout,
    TextField,
    useGetList
} from "react-admin";
import {Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {OrderDetails} from "../../interfaces/OrderDetails";

export const OrderShow = (props: any) => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([])
    const {id} = useParams();

    const formattedPrice = (price: any) => {
        return price.toLocaleString('vi-VN') + 'đ';
    }

    const fetchDataProductsInOrder = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/order/details/${id}`)
            // console.log('Res: ', res.data)
            // const data: OrderDetails[] = res.data
            // console.log('Data: ', data)
            setOrderDetails(res.data)
        } catch (e) {
            console.log('Err fetch data products in order: ', e)
        }
    }

    useEffect(() => {
        fetchDataProductsInOrder()
        // console.log('Data: ', data)
    }, []);

    console.log('Details: ', orderDetails)

    return (
        <Show>
            <TabbedShowLayout>
                <TabbedShowLayout.Tab label={'Thông Tin Đơn Hàng'}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Labeled label={'Mã Đơn Hàng'}>
                                <TextField source={'id'}/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label={'Họ Tên'}>
                                <TextField source={'fullName'}/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label={'Số Điện Thoại'}>
                                <TextField source={'phone'}/>
                            </Labeled>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Labeled label={'Địa Chỉ'}>
                            <TextField source={'address'} label={'Địa Chỉ'}/>
                        </Labeled>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Labeled label={'Phương Thức Thanh Toán'}>
                                <TextField source={'paymentMethod'}/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label={'Trạng Thái Thanh Toán'}>
                                <FunctionField
                                    source="paymentStatus"
                                    render={(record: any) => record.paymentStatus ? "Đã Thanh Toán" : "Chưa Thanh Toán"}
                                />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Số Tiền">
                                <FunctionField
                                    source="totalAmount"
                                    label="Số Tiền"
                                    render={(record: any) => formattedPrice(record.totalAmount)}
                                />
                            </Labeled>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Labeled label={'Mã Giảm Gía'}>
                                <FunctionField
                                    source={"discountCode"}
                                    render={(record: any) => record.discountCode === null ? 'Không có' :
                                        record.discountCode.discountMoney !== null ? record.discountCode.discountMoney :
                                            record.discountCode.discountRate}/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label="Phí Vận Chuyển">
                                <FunctionField
                                    source="shippingCost"
                                    label="Phí Vận Chuyển"
                                    render={(record: any) => formattedPrice(record.shippingCost)}
                                />
                            </Labeled>
                        </Grid>
                        <Grid item xs={4}>
                            <Labeled label={'Ngày Đặt'}>
                                <TextField source={'createdAt'}/>
                            </Labeled>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Labeled label={'Trạng Thái Đơn Hàng'}>
                            <TextField source={'deliveryStatus.description'}/>
                        </Labeled>
                    </Grid>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label={"Sản phẩm"}>
                    <ArrayField source={'orderDetails'}>
                        <Datagrid bulkActionButtons={false}>
                            <TextField source={'id'} label={'Mã Sản Phẩm'}/>
                            <TextField source={'product.name'} label={'Tên Sản Phẩm'}/>
                            <ImageField source={'product.thumbnail'} label={'Ảnh Sản Phẩm'}/>
                            <TextField source={'color.name'} label={'Màu'}/>
                            <TextField source={'size.name'} label={'Size'}/>
                            <NumberField source={'quantity'} label={'Số Lượng'}/>
                            <FunctionField
                                source={'price'}
                                label={'Tổng Tiền'}
                                render={(record: any) => formattedPrice(record.price)}
                            />
                        </Datagrid>
                    </ArrayField>
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show>
    )
}