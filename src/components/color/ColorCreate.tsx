import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import CustomColorInput from './CustomColorInput'; // Adjust the path as necessary

export const ColorCreate = (props: any) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" label={'Tên màu'} />
                <CustomColorInput source="colorCode" />
            </SimpleForm>
        </Create>
    );
};
