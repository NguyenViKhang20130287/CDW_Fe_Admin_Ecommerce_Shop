import {FunctionField, Show, SimpleShowLayout, TextField, useRecordContext} from 'react-admin';
import React from "react";
import {Product} from "../../types";


const PromotionTitle = () => {
    const record = useRecordContext<Product>();
    return record ? <span>{record.name}</span> : null;
};
export const PromotionShow = () => (
    <Show title={<PromotionTitle/>}>
        <SimpleShowLayout>
            <TextField source={'name'} label={'Tên khuyến mãi'}/>
            <TextField source={'description'} label={'Mô tả'}/>
            <FunctionField
                source="status"
                label="Trạng thái"
                render={(record: { status: boolean }) => record.status ? "Đang hoạt động" : "Đã ẩn"}
            />
            <FunctionField
                source={'discount_rate'}
                label="Tỉ lệ"
                render={(record : any) => `${record.discount_rate}%`}
            />
            <TextField source="start_date" label={'Ngày bắt đầu'}/>
            <TextField source="end_date" label={'Ngày kết thúc'}/>
            <TextField source="created_at" label={'Ngày tạo'}/>
            <TextField source={'created_by.username'} label={'Người tạo'}/>
            <TextField source="updated_at" label={'Ngày cập nhật'}/>
            <TextField source="updated_by.username" label={'Người cập nhật'}/>
        </SimpleShowLayout>
    </Show>
);
