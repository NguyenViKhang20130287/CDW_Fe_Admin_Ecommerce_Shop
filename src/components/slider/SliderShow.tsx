import {FunctionField, ImageField, Show, SimpleShowLayout, TextField} from 'react-admin';
import React from "react";

export const SliderShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source={'description'} label={'Mô tả'}/>
            <ImageField source="link" label="Ảnh"/>
            <FunctionField
                source="status"
                label="Trạng thái"
                render={(record: { status: boolean }) => record.status ? "Đang hoạt động" : "Đã ẩn"}
            />
            <TextField source="createdAt" label={'Ngày tạo'}/>
            <TextField source={'createdBy.username'} label={'Người tạo'}/>
            <TextField source="updatedAt" label={'Ngày cập nhật'}/>
            <TextField source="updatedByy.username" label={'Người cập nhật'}/>
        </SimpleShowLayout>
    </Show>
);
export default SliderShow;
