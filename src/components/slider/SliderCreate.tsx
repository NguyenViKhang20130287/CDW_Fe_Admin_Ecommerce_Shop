import {Create, ImageField, ImageInput} from "react-admin";
import {SimpleForm, TextInput, BooleanInput, required} from "react-admin";
import React from "react";
export const SliderCreate = (props: any) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="description" label={'Mô tả'} validate={required()}/>
                <BooleanInput source="status" label="Trạng thái" defaultValue={false}/>
                <ImageInput name={"link"} source={"link"}>
                    <ImageField source="src" label="Ảnh blog"/>
                </ImageInput>
            </SimpleForm>
        </Create>
    )
}
