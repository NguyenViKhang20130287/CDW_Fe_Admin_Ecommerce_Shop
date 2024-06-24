import {
    CreateButton,
    DatagridConfigurable, DeleteButton, EditButton,
    ExportButton, FunctionField,
    List,
    SelectColumnsButton, ShowButton,
    TextField,
    TopToolbar, useDataProvider, useNotify, useRefresh
} from "react-admin";
import React, {useEffect, useState} from "react";
import {OrderListAside} from "./OrderListAside";
import {Button} from "@mui/material";
import {addLog} from "../../services/DataProvider";

const ApproveButton: React.FC<{ record: any }> = ({record}) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();

    const handleClick = () => {
        // @ts-ignore
        dataProvider.update('order/confirm', {id: record.id, data: undefined})
            .then(async () => {
                notify('Order approved successfully', {type: 'info'});
                await addLog(`Xác nhận đơn hàng có id ${record.id}`)
                refresh()
            })
            .catch((error) => {
                notify(`Error: ${error.message}`, {type: 'warning'});
            });
    };
    return (record.deliveryStatus.name === 'Pending') ?
        <Button onClick={handleClick}>Xác Nhận</Button> : <TextField source={'deliveryStatus.description'}/>
};
const OrderList = (props: any) => {
    const [permission, setPermission] = useState(localStorage.getItem('permission'))
    useEffect(() => {

    }, [permission]);
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
            <DatagridConfigurable>
                <TextField label={'Mã đơn hàng'} source={'id'}/>
                <TextField label={'Họ Tên'} source={'fullName'}/>
                <TextField label={'Số Điện Thoại'} source={'phone'}/>
                <TextField label={'Thanh Toán'} source={'paymentMethod'}/>
                <FunctionField
                    source="paymentStatus"
                    label="Trạng thái thanh toán"
                    render={(record: {
                        paymentStatus: boolean
                    }) => record.paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}
                />
                <TextField label={'Trạng thái đơn hàng'} source={'deliveryStatus.description'}/>
                <FunctionField
                    source="totalAmount"
                    label="Số Tiền"
                    render={(record: any) => formattedPrice(record.totalAmount)}
                />
                <TextField label={'Ngày Đặt'} source={'createdAt'}/>
                <FunctionField
                    label={'Trạng thái'}
                    render={(record: any) => (
                        <ApproveButton record={record}/>
                    )}
                />
                <ShowButton label={'Xem'}/>
                {(permission === 'ADMIN' || permission === 'ORDER_MANAGER') &&
                    <>
                        <EditButton label={'Sửa'}/>

                        <DeleteButton label={'Xóa'}/>
                    </>
                }
            </DatagridConfigurable>
        </List>
    )
}

export default OrderList