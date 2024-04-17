import {
    SimpleForm,
    TextInput,
    DateField,
    required, useGetList, SelectArrayInputProps, BooleanInput, Create, DateInput
} from 'react-admin';
import React, {useEffect, useState} from "react";
import {Promotion} from "../../types";

const PromotionTitle = () => {
    return <span>Tạo khuyến mãi</span>;
};
export const PromotionCreate = (props: SelectArrayInputProps) => {
    const [promotion, setPromotion] = useState<Promotion[]>([]);
    const {data}: any = useGetList<Promotion>('promotion', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    useEffect(() => {
        if (data) {
            setPromotion(data);
        }
    }, [data]);
    return (
        <Create title={<PromotionTitle/>}>
            <SimpleForm>
                <TextInput source="name" label={'Tên khuyến mãi'} validate={req}/>
                <TextInput source="description" label={'Mô tả khuyến mãi'} validate={req}/>
                <TextInput source="discount_rate" label={'Tỉ lệ khuyến mãi'} validate={req}/>
                <DateInput source="start_date" label={'Ngày bắt đầu'} validate={req}/>
                <DateInput source="end_date" label={'Ngày kết thúc'} validate={req}/>
                <BooleanInput source="status" label="Trạng thái" defaultValue={true}/>
            </SimpleForm>
        </Create>
    )
};

const req = [required()];
