import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    SelectArrayInputProps,
    BooleanInput, useRecordContext, ImageField, ImageInput
} from 'react-admin';
import {Blog} from "../../types";
import {RichTextInput} from "ra-input-rich-text";
import {useWatch} from "react-hook-form";
import {Grid, Typography} from "@mui/material";


const BlogTitle = () => {
    const record = useRecordContext<Blog>();
    return record ? <span>{record.name}</span> : null;
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
                        placeholder={<p>Thêm ảnh thumbnail blog mới</p>} label={"Thêm ảnh thumnail blog mới"}>
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
export const BlogEdit = (props: SelectArrayInputProps) => {
    return (
        <Edit title={<BlogTitle/>}>
            <SimpleForm>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                        Ảnh chính
                    </Typography>
                    <ReturnedImg/>
                </Grid>
                <TextInput source="title" validate={required()}/>
                <TextInput source="description"></TextInput>
                <RichTextInput source={'content'} label={'Nội dung'} validate={required()}/>
                <BooleanInput source="status" label="Trạng thái" defaultValue={false}/>
            </SimpleForm>
        </Edit>
    )
};
