import React from "react";
import {ArrayInput, Create, NumberInput, SimpleForm, SimpleFormIterator, TextInput} from "react-admin";

export const ImportInvoiceCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <ArrayInput source="ImportInvoiceRequest.importInvoiceDetailRequests" label={"Nhập hàng"}>
                    <SimpleFormIterator inline>
                        <NumberInput source="product_id" helperText={false} label={"Mã sản phẩm"}/>
                        <NumberInput source="color_id" helperText={false} label={"Mã màu"}/>
                        <NumberInput source="size_id" helperText={false} label={"Mã size"}/>
                        <NumberInput step={1000} source="importPrice" helperText={false} label={"Giá nhập"}/>
                        <NumberInput source="quantity" helperText={false} label={"Số lượng"}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    )
}
