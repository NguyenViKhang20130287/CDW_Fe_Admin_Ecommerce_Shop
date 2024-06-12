import * as React from 'react';
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useReference } from 'react-admin';

import { User, Order } from '../../types';

interface Props {
    order: Order;
}

export const PendingOrder = (props: Props) => {
    const { order } = props;
    const { referenceRecord: customer, isLoading } = useReference<User>({
        reference: 'customers',
        id: order.customer_id,
    });

    return (
        <ListItem button component={Link} to={`/order/${order.id}`}>
            <ListItemAvatar>
                {isLoading ? (
                    <Avatar />
                ) : (
                    <Avatar
                        src={`${order?.user?.userInformation?.avatar}?size=32x32`}
                        sx={{ bgcolor: 'background.secondary' }}
                        alt={`${order?.user?.userInformation?.fullName}`}
                    />
                )}
            </ListItemAvatar>
            <ListItemText
                secondary={new Date(order.createdAt).toLocaleString('vi-VN')}
                primary= {'Đơn hàng #' + order.id +' của ' + (order?.user?.userInformation?.fullName)+ ', ' + (order?.orderDetails?.length) + ' sản phẩm'}
            />
            <ListItemSecondaryAction>
                <Box
                    component="span"
                    sx={{
                        marginRight: '1em',
                        color: 'text.primary',
                    }}
                >
                    {order.totalAmount.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                </Box>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
