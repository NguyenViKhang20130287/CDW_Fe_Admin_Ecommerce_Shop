import {Create, ImageField, ImageInput} from "react-admin";
import {SimpleForm, TextInput, BooleanInput, required} from "react-admin";
import React from "react";
import {RichTextInput} from "ra-input-rich-text";
export const BlogCreate = (props: any) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="title" label={'Tiêu đề'} validate={required()}/>
                <TextInput source="description" label={'Mô tả'} validate={required()}/>
                <RichTextInput source="content" label={'Nội dung'} validate={required()}/>
                <BooleanInput source="status" label="Trạng thái" defaultValue={false}/>
                <ImageInput name={"thumbnail"} source={"thumbnail"}>
                    <ImageField source="src" label="Ảnh blog"/>
                </ImageInput>
            </SimpleForm>
        </Create>
    )
}
