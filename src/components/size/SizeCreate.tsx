import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const SizeCreate = (props: any) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" label={'Tên kích cỡ'} />
            </SimpleForm>
        </Create>
    );
};
