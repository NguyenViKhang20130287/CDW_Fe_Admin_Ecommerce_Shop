import * as React from 'react';
import {
    BulkDeleteButton,
    DatagridConfigurable,
    DateField, FunctionField,
    Identifier,
    TextField,
} from 'react-admin';
import PendingIcon from '@mui/icons-material/Pending';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

import ProductReferenceField from '../product/ProductReferenceField';
import StarRatingField from './StarRatingField';
import rowSx from './rowSx';

import BulkAcceptButton from './BulkAcceptButton';
import BulkRejectButton from './BulkRejectButton';
import UserReferenceField from "../User/UserReferenceField";

export interface ReviewListDesktopProps {
    selectedRow?: Identifier;
}

const ReviewsBulkActionButtons = () => (
    <>
        <BulkAcceptButton/>
        <BulkRejectButton/>
        <BulkDeleteButton/>
    </>
);

const ReviewListDesktop = ({selectedRow}: ReviewListDesktopProps) => (
    <DatagridConfigurable
        rowClick="edit"
        rowSx={rowSx(selectedRow)}
        bulkActionButtons={<ReviewsBulkActionButtons/>}
        sx={{
            '& .RaDatagrid-thead': {
                borderLeftColor: 'transparent',
                borderLeftWidth: 5,
                borderLeftStyle: 'solid',
            },
            '& .column-comment': {
                maxWidth: '18em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            },
        }}
    >
        <DateField source="createdAt" label={"Ngày đánh giá"}/>
        <UserReferenceField source={'user.id'} link={false} label={"Người đánh giá"}/>
        <ProductReferenceField source={"product.id"} link={false} label={"Sản phẩm"}/>
        <StarRatingField size="small"/>
        <TextField source="content" label={"Nội dung"}/>
        <FunctionField source={'typeStatus'} render={
            ({typeStatus}: any) => {
                switch (typeStatus) {
                    case 0:
                        return <PendingIcon string={"Chờ xét duyệt"} sx={{
                            color: 'warning.main',
                        }}/>;
                    case 1:
                        return <DoneOutlineIcon string={"Đã chấp thuận"} sx={{
                            color: 'success.main',
                        }}/>;
                    case 2:
                        return <DoNotDisturbIcon string={"Đã từ chối"} sx={{
                            color: 'error.main',
                        }}/>;
                    default:
                        return 'Không xác định';
                }
            }
        } label={"Loại"}
        />
    </DatagridConfigurable>
);

export default ReviewListDesktop;
