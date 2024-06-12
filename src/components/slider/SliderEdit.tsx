import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    SelectArrayInputProps,
    BooleanInput, useRecordContext, ImageField, ImageInput
} from 'react-admin';
import {Slider} from "../../types";
import {useWatch} from "react-hook-form";
import {Grid, Typography} from "@mui/material";


const SliderTitle = () => {
    const record = useRecordContext<Slider>();
    return record ? <span>{record.name}</span> : null;
};
const ReturnedImg = () => {
    const isReturned = useWatch({name: 'link'});
    return isReturned ?
        <>
            <ImageField source="link" sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
                marginBottom: "5px",
                maxHeight: "100px"
            }}/>
            <ImageInput source="link_new" accept="image/*"
                        placeholder={<p>Thêm ảnh slider mới</p>} label={"Thêm ảnh slider mới"}>
                <ImageField source="src" sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxHeight: "100px"
                }}/>
            </ImageInput>
        </> : <ImageInput name={"link"} source={"link"}>
            <ImageField source="src" label="Ảnh chính"/>
        </ImageInput>;
};
export const SliderEdit = (props: SelectArrayInputProps) => {
    return (
        <Edit title={<SliderTitle/>}>
            <SimpleForm>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                        Ảnh chính
                    </Typography>
                    <ReturnedImg/>
                </Grid>
                <TextInput source="description"></TextInput>
                <BooleanInput source="status" label="Trạng thái" defaultValue={false}/>
            </SimpleForm>
        </Edit>
    )
};
