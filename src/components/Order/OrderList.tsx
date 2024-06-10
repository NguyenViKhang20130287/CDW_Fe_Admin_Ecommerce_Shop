import {
    CreateButton,
    DatagridConfigurable, DeleteButton, EditButton,
    ExportButton, FunctionField,
    List,
    SelectColumnsButton, ShowButton,
    TextField,
    TopToolbar
} from "react-admin";
import React from "react";
import {OrderListAside} from "./OrderListAside";


const OrderList = (props: any) => {
    const VisitorListActions = () => (
        <TopToolbar>
            <SelectColumnsButton/>
            <ExportButton/>
        </TopToolbar>
    );

    const formattedPrice = (price: any) => {
        return price.toLocaleString('vi-VN') + 'đ';
    }


    return (
        <List {...props}
              sort={{field: 'fullName', order: 'ASC'}}
              aside={<OrderListAside/>}
              actions={<VisitorListActions/>}
        >
            <DatagridConfigurable rowClick={"show"}>
                <TextField label={'Mã đơn hàng'} source={'id'}/>
                <TextField label={'Họ Tên'} source={'fullName'}/>
                <TextField label={'Số Điện Thoại'} source={'phone'}/>
                <TextField label={'Thanh Toán'} source={'paymentMethod'}/>
                <FunctionField
                    source="paymentStatus"
                    label="Trạng thái"
                    render={(record: { status: boolean }) => record.status ? "Đã thanh toán" : "Chưa thanh toán"}
                />
                <FunctionField
                    source="totalAmount"
                    label="Số Tiền"
                    render={(record: any) => formattedPrice(record.totalAmount)}
                />
                <TextField label={'Ngày Đặt'} source={'createdAt'}/>
                <ShowButton label={'Xem'}/>
                <DeleteButton label={'Xóa'}/>
            </DatagridConfigurable>
        </List>
    )
}

export default OrderList