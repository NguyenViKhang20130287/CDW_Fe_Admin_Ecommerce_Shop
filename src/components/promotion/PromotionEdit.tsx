import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    useGetList,
    SelectArrayInputProps,
    BooleanInput,
    DateField,
    DateInput,
    useRecordContext,
    NumberInput,
    maxValue, minValue
} from 'react-admin';
import React, {useEffect, useState} from "react";
import { Promotion} from "../../types";


const PromotionTitle = () => {
    const record = useRecordContext<Promotion>();
    return record ? <span>{record.name}</span> : null;
};
export const PromotionEdit = (props: SelectArrayInputProps) => {
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
        <Edit title={<PromotionTitle/>}>
            <SimpleForm>
                <TextInput source="name" label={'Tên khuyến mãi'} validate={req}/>
                <TextInput source="description" label={'Mô tả khuyến mãi'} validate={req}/>
                <NumberInput source="discount_rate" label={'Tỉ lệ khuyến mãi'} validate={validateDiscountRate}/>
                <DateInput source="start_date" label={'Ngày bắt đầu'} validate={req}/>
                <DateInput source="end_date" label={'Ngày kết thúc'} validate={req}/>
                <BooleanInput source="status" label="Trạng thái" defaultValue={true}/>
            </SimpleForm>
        </Edit>
    )
};
const req = [required()];
const validateDiscountRate = [required(), minValue(0), maxValue(100)];
