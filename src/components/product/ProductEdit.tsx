import {
    ImageField,
    Edit,
    TabbedForm,
    TextInput,
    required,
    SimpleFormIterator,
    ArrayInput,
    NumberInput,
    SelectInput,
    useGetList,
    useRecordContext,
    ImageInput,
    Identifier,
} from "react-admin";
import {useWatch} from "react-hook-form";
import React, { useEffect, useState } from "react";
import { ProductEditDetails } from "./ProductEditDetail";
import { Grid, Typography } from "@mui/material";
import { Color, Size, Product } from "../../types";

const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);

const ProductTitle = () => {
    const record = useRecordContext<Product>();
    return record ? <span>{record.name}</span> : null;
};

const ReturnedImgList = () => {
    const isReturned = useWatch({name: 'imageProducts'});
    return isReturned ?
        <>
            <ImageField source="imageProducts" src="link" label="imageProducts"/>
            <ImageInput source="imageProducts_new" accept="image/*" multiple={true}
                        placeholder={<p>Add new List Img</p>} label={"Thêm danh sách ảnh phụ mới"}>
                <ImageField source="src" sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxHeight: "100px"
                }}/>
            </ImageInput>
        </> : <ImageInput name={"imageProducts"} source={"imageProducts"} multiple>
            <ImageField source="src" label="Danh sách ảnh phụ"/>
        </ImageInput>;
};
const ReturnedImg = () => {
    const isReturned = useWatch({name: 'thumbnail'});
    return isReturned ?
        <>
            <ImageField source="thumbnail" sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
                marginBottom: "5px",
                maxHeight: "100px"
            }}/>
            <ImageInput source="thumbnail_new" accept="image/*"
                        placeholder={<p>Add new Avt Img</p>} label={"Thêm ảnh Thumnail mới"}>
                <ImageField source="src" sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxHeight: "100px"
                }}/>
            </ImageInput>
        </> : <ImageInput name={"thumbnail"} source={"thumbnail"}>
            <ImageField source="src" label="Ảnh chính"/>
        </ImageInput>;
};

export const ProductEdit = (props: any) => {
    const [colors, setColors] = useState<Color[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);

    const { data: listColor } = useGetList<Color>('color', {
        pagination: { page: 1, perPage: 25 },
        sort: { field: 'name', order: 'ASC' },
    });

    const { data: listSize } = useGetList<Size>('size', {
        pagination: { page: 1, perPage: 25 },
        sort: { field: 'name', order: 'ASC' },
    });

    const record = useRecordContext<Product>();

    useEffect(() => {
        if (listColor) {
            setColors(listColor);
        }
        if (listSize) {
            setSizes(listSize);
        }
    }, [listColor, listSize]);

    return (
        <Edit title={<ProductTitle />} {...props} hasShow={false}>
            <TabbedForm>
                <TabbedForm.Tab
                    label="Ảnh"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>
                                Ảnh chính
                            </Typography>
                            <ReturnedImg/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>
                                Danh sách ảnh phụ
                            </Typography>
                            <ReturnedImgList/>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Chi tiết"
                    path="details"
                    sx={{ maxWidth: '40em' }}
                >
                    <ProductEditDetails />
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Phân loại"
                    path="description"
                    sx={{ maxWidth: '100%' }}
                >
                    <ArrayInput source="colorSizes" label="Thêm màu và size" fullWidth>
                        <SimpleFormIterator>
                            <TextInput source="id" label="ID" />
                            <NumberInput source="quantity" label="Số lượng" defaultValue={0} />
                            <SelectInput
                                source="color.id"
                                label="Màu sắc"
                                choices={colors.map(color => ({ id: color.id, name: color.name }))}
                                optionText="name"
                                optionValue="id"
                                defaultValue={(record && record.colorSizes.length > 0) ? record.colorSizes[0].color.id : ''}
                                fullWidth
                            />
                            <SelectInput
                                source="size.id"
                                label="Kích cỡ"
                                choices={sizes.map(size => ({ id: size.id, name: size.name }))}
                                optionText="name"
                                optionValue="id"
                                defaultValue={(record && record.colorSizes.length > 0) ? record.colorSizes[0].size.id : ''}
                                fullWidth
                            />
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    );
};

const req = [required()];
