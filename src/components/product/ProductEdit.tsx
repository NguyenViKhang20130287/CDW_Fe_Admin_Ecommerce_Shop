import {
    ImageField,
    Edit,
    TabbedForm,
    TextInput,
    useRecordContext,
    required,
    ImageInput,
    SimpleFormIterator, ArrayInput, NumberInput, BooleanInput,
} from "react-admin";
import React from "react";
import {ProductEditDetails} from "./ProductEditDetail";
import {Grid} from "@mui/material";
import {Product} from "../../types";


const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);

const ProductTitle = () => {
    const record = useRecordContext<Product>();
    return record ? <span>{record.name}</span> : null;
};
export const ProductEdit = (props: any) => {
    return (
        <Edit title={<ProductTitle/>}>
            <TabbedForm>
                <TabbedForm.Tab
                    label="Ảnh"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12}>
                            <ImageField source="imageUrl" label="Thumbnail"/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <ImageField source="imgProducts" src="url" label="image"/>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Chi tiết"
                    path="details"
                    sx={{maxWidth: '40em'}}
                >
                    <ProductEditDetails/>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Phân loại"
                    path="description"
                    sx={{maxWidth: '100%'}}
                >
                    <ArrayInput source={`colorSizes`} label={`Thêm màu và size`} fullWidth>
                        <SimpleFormIterator>
                            <NumberInput source="quantity" label="Số lượng" defaultValue={0} disabled/>
                            <TextInput source="color.name" label="Màu sắc"/>
                            <TextInput source="size.name" label="Kích cỡ"/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>

            </TabbedForm>
        </Edit>
    )
};

const req = [required()];
