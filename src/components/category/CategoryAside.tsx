import * as React from 'react';
import {Card, CardContent} from '@mui/material';
import {
    FilterList,
    FilterListItem,
    FilterLiveSearch
} from 'react-admin';

import LockIcon from "@mui/icons-material/Lock";

const CategoryAside = () => {
    return (
        <Card
            sx={{
                display: {
                    xs: 'none',
                    md: 'block',
                },
                order: -1,
                flex: '0 0 15em',
                mr: 2,
                mt: 6,
                alignSelf: 'flex-start',
            }}
        >
            <CardContent sx={{pt: 1}}>
                <FilterLiveSearch label={"Tìm..."} name={"search"}/>

                <FilterList
                    label="Trạng thái"
                    icon={<LockIcon/>}
                >
                    <FilterListItem
                        label="Hiển thị"
                        value={{
                            status: true,
                        }}
                    />
                    <FilterListItem
                        label="Ẩn"
                        value={{
                            status: false,
                        }}
                    />
                </FilterList>
            </CardContent>
        </Card>
    );
};
export default CategoryAside;
