import {
    ImageField,
    TabbedForm,
    TextInput,
    required,
    NumberInput, BooleanInput, Create, useGetList, ArrayInput, SimpleFormIterator, SelectInput,
} from "react-admin";
import React, {useEffect, useState} from "react";
import {Grid, InputAdornment} from "@mui/material";
import {Category, Color, Size} from "../../types";


const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);


export const ProductCreate = (props: any) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);

    const {data}: any = useGetList<Category>('category', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    const {data: listColor}: any = useGetList<Color>('color', {
        pagination: {page: 1, perPage: 25},
        sort: {field: 'name', order: 'ASC'},
    });

    const {data: listSize}: any = useGetList<Size>('size', {
        pagination: {page: 1, perPage: 25},
        sort: {field: 'name', order: 'ASC'},
    });

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
        if (listColor) {
            setColors(listColor);
        }
        if (listSize) {
            setSizes(listSize);
        }
    }, [data, listColor, listSize]);
    return (
        <Create title={'Tạo sản phẩm'}>
            <TabbedForm>
                <TabbedForm.Tab
                    label="Ảnh"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12}>
                            <ImageField source="thumbnail" label="Thumbnail"/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <ImageField source="imageProducts.link" src="url" label="image"/>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Chi tiết"
                    path="details"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextInput source="name" label={'Tên sản phẩm'} fullWidth validate={req}/>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <BooleanInput source={"status"} label={"Trạng thái"} defaultValue={true}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <NumberInput
                                source="price"
                                label={"Giá"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">đ</InputAdornment>
                                    ),
                                }}
                                validate={req}
                                fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <SelectInput label="Danh mục" source={"category"}
                                         optionValue={"id"}
                                         choices={categories} fullWidth validate={req}/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <RichTextInput source="content" label="Mô tả" validate={req}/>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Phân loại"
                    path="description"
                    sx={{maxWidth: '100%'}}
                >
                     <ArrayInput source={`colorSizes`} label={`Thêm màu và size`} fullWidth>
                        <SimpleFormIterator>
                            <NumberInput source="quantity" label="Số lượng" defaultValue={0} disabled/>
                            <SelectInput source="color.id" label="Màu sắc" choices={colors} fullWidth/>
                            <SelectInput source="size.id" label="Kích cỡ" choices={sizes} fullWidth/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>

            </TabbedForm>
        </Create>
    )
};

const req = [required()];
