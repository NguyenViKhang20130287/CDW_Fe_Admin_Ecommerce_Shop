import {
    ImageField,
    TabbedForm,
    TextInput,
    required,
    NumberInput,
    BooleanInput,
    Create,
    useGetList,
    ArrayInput,
    SimpleFormIterator,
    SelectInput,
    Identifier,
    RaRecord,
    ImageInput,
} from "react-admin";
import React, {useEffect, useState} from "react";
import {Grid, InputAdornment, Typography} from "@mui/material";
import {Category, Color, Size} from "../../types";
import {dataProvider} from "../../services/DataProvider";


const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);


export const ProductCreate = (props: any) => {
    const [category, setCategory] = useState<Category>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [color, setColor] = useState<Color>();
    const [size, setSize] = useState<Size>();
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

    const handleColorChange = async (event: React.ChangeEvent<HTMLInputElement> | RaRecord<Identifier>) => {
        const colorId = Number(event.target.value);
        const { data: color } = await dataProvider.getOne('color', { id: colorId });
        setColor(color)
    };

    const handleSizeChange = async (event: React.ChangeEvent<HTMLInputElement> | RaRecord<Identifier>) => {
        const sizeId = Number(event.target.value);
        const { data: size } = await dataProvider.getOne('size', { id: sizeId });
        setSize(size)
    };

    const handleCategoryChange = async (event: React.ChangeEvent<HTMLInputElement> | RaRecord<Identifier>) => {
        const categoryId = Number(event.target.value);
        const { data: category } = await dataProvider.getOne('category', { id: categoryId });
        setCategory(category)

    }
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
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Ảnh chính
                            </Typography>
                            <ImageInput name={"thumbnail"} source={"thumbnail"}>
                                <ImageField source="src" label="Ảnh chính"/>
                            </ImageInput>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Danh sách ảnh phụ
                            </Typography>
                            <ImageInput name={"imageProducts"} source={"imageProducts"} multiple>
                                <ImageField source="src" label="Danh sách ảnh phụ"/>
                            </ImageInput>
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
                                         choices={categories} fullWidth validate={req} onChange={handleCategoryChange} value={category}/>
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
                            <SelectInput source="color" label="Màu sắc" choices={colors} onChange={handleColorChange} value={color} fullWidth/>
                            <SelectInput source="size" label="Kích cỡ" choices={sizes} onChange={handleSizeChange} value={size} fullWidth/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>

            </TabbedForm>
        </Create>
    )
};

const req = [required()];
