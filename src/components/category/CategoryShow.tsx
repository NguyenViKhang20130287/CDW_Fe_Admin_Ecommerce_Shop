import {
    ArrayField,
    Datagrid,
    EditButton,
    FunctionField, Labeled,
    NumberField, ReferenceManyField,
    Show,
    SimpleShowLayout,
    TextField
} from 'react-admin';
import React from "react";
import ThumbnailField from "../product/ThumbnailField";

export const CategoryShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source={'name'} label={'Tên danh mục'}/>
            <FunctionField
                source="status"
                label="Trạng thái"
                render={(record: { status: boolean }) => record.status ? "Đang hoạt động" : "Đã ẩn"}
            />
            <TextField source="createdAt" label={'Ngày tạo'}/>
            <TextField source={'createdBy.username'} label={'Người tạo'}/>
            <TextField source="updatedAt" label={'Ngày cập nhật'}/>
            <TextField source="updatedBy.username" label={'Người cập nhật'}/>
            <Labeled label="Sản phẩm thuộc danh mục" fullWidth>
                <ReferenceManyField
                    reference="product"
                    target="category"
                    perPage={20}
                >
                    <Datagrid
                        sx={{
                            '& .column-thumbnail': {
                                width: 25,
                                padding: 0,
                            },
                        }}
                    >
                        <ThumbnailField source="thumbnail" label="Ảnh" />
                        <TextField source="name" label={"Tên sản phẩm"} />
                        <NumberField
                            source="price"
                            options={{
                                style: "currency",
                                currency: "VND",
                            }}
                            label="Giá"
                        />
                        <NumberField source="quantity" label={"Số lượng"} />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Labeled>
        </SimpleShowLayout>
    </Show>
);
export default CategoryShow;
