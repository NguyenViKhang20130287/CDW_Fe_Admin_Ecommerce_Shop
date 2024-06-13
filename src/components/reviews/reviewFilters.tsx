import * as React from 'react';
import {
    AutocompleteInput,
    DateInput,
    ReferenceInput,
    SearchInput,
    SelectInput,
} from 'react-admin';
import {User} from '../../types';

const reviewFilters = [
    <SearchInput source="q" placeholder={'Tìm kiếm theo nội dung'} alwaysOn/>,
    <SelectInput
        source="type"
        choices={[
            {type: 0, name: 'Chờ xét duyệt'},
            {type: 1, name: 'Đã chấp nhận'},
            {type: 2, name: 'Từ chối'}
        ]}
        optionText="name"
        optionValue="type"
        label={'Trạng thái'}
    />,
    <ReferenceInput source="user.id" reference="user" label={'Người đánh giá'}>
        <AutocompleteInput
            optionText={(choice?: User) =>
                choice?.id
                    ? `${choice.user_information.full_name}`
                    : ''
            }
            sx={{minWidth: 200}}
            label={'Người đánh giá'}
        />
    </ReferenceInput>,
    <ReferenceInput source="product.id" reference="product" label={'Sản phẩm'}>
        <AutocompleteInput optionText="name" optionValue={'id'} label={'Sản phẩm'}/>
    </ReferenceInput>,
    <DateInput source="createdAt" label={'Ngày đánh giá'}/>,
];

export default reviewFilters;
