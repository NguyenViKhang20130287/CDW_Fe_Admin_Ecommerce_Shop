import {
    CreateButton,
    DatagridConfigurable,
    DateField,
    DeleteButton,
    EditButton, ExportButton,
    FunctionField,
    List, NumberField, SelectColumnsButton,
    TextField,
    TopToolbar
} from "react-admin";
import React, {useEffect, useState} from "react";
import moment from 'moment/moment'

const DiscountCodeList = () => {
    const [permission, setPermission] = useState(localStorage.getItem('permission'))
    useEffect(() => {

    }, [permission]);
    const VisitorListActions = () => {
            return (
                <TopToolbar>
                    {(permission === 'ADMIN' || permission === 'PROMOTION_MANAGER') &&
                        <CreateButton/>
                    }
                    <SelectColumnsButton/>
                    <ExportButton/>
                </TopToolbar>
            )
        }
    ;

    return (
        <List
            actions={<VisitorListActions/>}
        >
            <DatagridConfigurable>
                <TextField label={'ID'} source={'id'}/>
                <TextField label={'Code'} source={'code'}/>
                <FunctionField
                    label={'Ưu đãi'}
                    render={(record: any) => record.discountRate === 0 ?
                        record.discountMoney.toLocaleString('vn-Vi') + 'đ' : record.discountRate + '%'}/>
                <DateField source={'startDate'} label={'Ngày bắt đầu'} showTime/>
                <DateField source={'endDate'} label={'Ngày kết thúc'} showTime/>
                <NumberField label={'Số lượng'} source={'quantity'}/>
                <FunctionField
                    source={'Trạng thái'}
                    render={(record: any) => record.status ? 'Hoạt động' : 'Không hoạt động'}/>
                <DateField source={'createdAt'} label={'Ngày tạo'} showTime/>
                {(permission === 'ADMIN' || permission === 'PROMOTION_MANAGER') &&
                    <>
                        <EditButton/>
                        <DeleteButton/>
                    </>
                }

            </DatagridConfigurable>
        </List>
    )
}

export default DiscountCodeList