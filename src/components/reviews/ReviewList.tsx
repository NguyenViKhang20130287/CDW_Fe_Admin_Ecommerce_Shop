import * as React from 'react';
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    SearchInput,
    DateInput,
    SelectColumnsButton,
    DatagridConfigurable,
    FunctionField, DeleteButton
} from 'react-admin';

import {
    List,
    TextField, useDataProvider, useNotify, useRefresh
} from "react-admin";
import {Theme, useMediaQuery, Rating, Button} from "@mui/material";
const ApproveButton: React.FC<{ record: any }> = ({ record }) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();

    const handleClick = () => {
        dataProvider.update('review', { id: record.id, data: { typeStatus: 1 }, previousData: record })
            .then(() => {
                notify('Review xác nhận thành công', { type: 'info' });
                refresh();
            })
            .catch((error) => {
                notify(`Error: ${error.message}`, { type: 'warning' });
            });
    };

    return record.typeStatus === 0 ? <Button onClick={handleClick}>Duyệt</Button> : null;
};

const RejectButton: React.FC<{ record: any }> = ({ record }) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();

    const handleClick = () => {
        dataProvider.update('review', { id: record.id, data: { typeStatus: 2 }, previousData: record })
            .then(() => {
                notify('Review từ chối thành công', { type: 'info' });
                refresh();
            })
            .catch((error) => {
                notify(`Error: ${error.message}`, { type: 'warning' });
            });
    };

    return record.typeStatus === 0 ? <Button onClick={handleClick}>Từ chối</Button> : null;
};
const visitorFilters = [
    <SearchInput alwaysOn name={"search"} source={"filter"}/>,
    <DateInput source="createdAt" name={"createdAt"}/>,
];

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);

export const ReviewList = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <List
            filters={isSmall ? visitorFilters : undefined}
            perPage={25}
            actions={<VisitorListActions/>}
        >
            <DatagridConfigurable
                rowClick="show"
            >
                <TextField source="id" label="ID"/>
                <TextField source="product.name" label="Tên SP"/>
                <FunctionField
                    source="stars"
                    label="Sao"
                    render={(record: any) => <Rating name="stars" value={record.stars} readOnly />}
                />
                <TextField source="content" label="Nội dung"/>
                <TextField source={'createdAt'} label={"Ngày tạo"}/>
                <TextField source={'user.username'} label={"Người tạo"}/>
                <FunctionField
                    source="typeStatus"
                    label="Trạng thái"
                    render={(record: any) => {
                        switch (record.typeStatus) {
                            case 0:
                                return "Đang phê duyệt";
                            case 1:
                                return "Đã duyệt";
                            case 2:
                                return "Từ chối";
                            default:
                                return "Không xác định";
                        }
                    }}
                />
                <FunctionField
                    render={(record: any) => (
                        <>
                            <ApproveButton record={record} />
                            <RejectButton record={record} />
                        </>
                    )}
                />
            </DatagridConfigurable>
        </List>)
};

