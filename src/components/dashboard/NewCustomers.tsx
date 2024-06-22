import * as React from 'react';
import {Avatar, Box, Button, Card, CardHeader, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import {Link} from 'react-router-dom';

import {User} from '../../types';
import {FixedSizeList} from "react-window";

interface LoyalCustomersProps {
    totalAmount: number;
    totalOrders: number;
    user: User;
}

const NewCustomers = (loyalCustomers: any) => {
    // console.log(Array.isArray(loyalCustomers.loyalCustomers))
    return (
        <Card sx={{flex: 1}}>
            <CardHeader
                title="Khách hàng tiềm năng"
                action={
                    <Button
                        component={Link}
                        to="/user"
                        size="small"
                        color="primary"
                    >
                        Xem tất cả
                    </Button>
                }
            />
            <FixedSizeList
                height={400}
                itemCount={loyalCustomers.loyalCustomers.length}
                itemSize={60}
                width="100%"
                style={{listStyle: 'none', padding: 0}}
            >
                {({index, style}) => {
                    const loyalCustomer = loyalCustomers.loyalCustomers[index];
                    // console.log(loyalCustomer)
                    return (
                        <div style={style}>
                            <ListItem
                                key={loyalCustomer.user.id}
                                button
                                component={Link}
                                to={`/user/${loyalCustomer.user.id}`}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={`${loyalCustomer?.user?.userInformation?.avatar}?size=32x32`}
                                        sx={{ bgcolor: 'background.secondary' }}
                                        alt={`${loyalCustomer?.user?.userInformation?.fullName}`}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={loyalCustomer.user.userInformation.fullName}
                                    secondary={"Đã mua " + loyalCustomer.totalOrders + " đơn hàng, tổng cộng " + loyalCustomer.totalAmount + " đồng"}
                                />
                            </ListItem>
                        </div>
                    );
                }
                }
            </FixedSizeList>
        </Card>
    );
};

export default NewCustomers;
