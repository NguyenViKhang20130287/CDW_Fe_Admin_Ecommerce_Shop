import {FunctionField, Show, SimpleShowLayout, TextField} from 'react-admin';
import React from "react";

export const ProductShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source={'name'} label={'Tên sản phẩm'}/>
            <FunctionField
                source="status"
                label="Trạng thái"
                render={(record: { status: boolean }) => record.status ? "Đang hoạt động" : "Đã ẩn"}
            />
            <TextField source="price" label={'Giá'}/>
            <TextField source={'category.name'} label={'Danh mục'}/>
            <TextField source="content" label={'Mô tả'}/>
            <TextField source="createdAt" label={'Ngày tạo'}/>
            <TextField source={'createdBy.username'} label={'Người tạo'}/>
            <TextField source="updatedAt" label={'Ngày cập nhật'}/>
            <TextField source="updatedBy.username" label={'Người cập nhật'}/>
        </SimpleShowLayout>
    </Show>
);
export default ProductShow;
