import {Card, CardContent} from "@mui/material";
import {FilterList, FilterListItem, FilterLiveSearch} from "react-admin";
import React from "react";
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';

export const OrderListAside = (props: any) => {
    return (
        <Card
            sx={{
                order: -1,
                mr: 2,
                mt: 6,
                alignSelf: 'flex-start'
            }}
        >
            <CardContent>
                <FilterLiveSearch label={'Tìm...'} name={'search'}/>
                <FilterList label={'Trạng thái thanh toán'} icon={<PaidIcon/>}>
                    <FilterListItem label={'Chưa thanh toán'} value={{paymentStatus: false}}/>
                    <FilterListItem label={'Đã thanh toán'} value={{paymentStatus: true}}/>
                </FilterList>
                <FilterList label={'Trạng thái Đơn Hàng'} icon={<CheckCircleIcon/>}>
                    <FilterListItem label={'Chờ xác nhận'} value={{deliveryStatus: 'Pending'}}/>
                    <FilterListItem label={'Đã xác nhận'} value={{deliveryStatus: 'Confirmed'}}/>
                    <FilterListItem label={'Đã thanh toán'} value={{deliveryStatus: 'Paid'}}/>
                    <FilterListItem label={'Đang giao hàng'} value={{deliveryStatus: 'OutforDelivery'}}/>
                    <FilterListItem label={'Đã giao hàng'} value={{deliveryStatus: 'Delivered'}}/>
                    <FilterListItem label={'Đã hủy'} value={{deliveryStatus: 'Canceled'}}/>
                </FilterList>
                <FilterList label={'Phương Thức Thanh Toán'} icon={<PaymentIcon/>}>
                    <FilterListItem label={'COD'} value={{paymentMethod: 'COD'}}/>
                    <FilterListItem label={'VNPAY'} value={{paymentMethod: 'VNPAY'}}/>
                </FilterList>
            </CardContent>
        </Card>
    )
}