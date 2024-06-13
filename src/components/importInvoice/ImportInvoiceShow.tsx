import {Link, ReferenceField, TextField, useRecordContext} from "react-admin";
import {ImportInvoice} from "../../types";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";


const ImportInvoiceShow = () => {
    const record = useRecordContext<ImportInvoice>();
    if (!record) return null;
    let i = 1;
    return (
        <Card sx={{width: 600, margin: 'auto'}}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom align="left">
                            Mã nhập hàng #{record.id}
                        </Typography>
                    </Grid>
                </Grid>
                <Box height={20}>&nbsp;</Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom align="center">
                            Ngày nhập hàng{' '}
                        </Typography>
                        <Typography gutterBottom align="center">
                            {new Date(record.createdAt).toLocaleDateString()}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom align="center">
                            Người nhập hàng{' '}
                        </Typography>
                        <Typography gutterBottom align="center">
                            {record.createdBy.username}
                        </Typography>
                    </Grid>
                </Grid>
                <Box margin="10px 0">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    #
                                </TableCell>
                                <TableCell sx={{ textAlign: 'left' }}>
                                    Sản phẩm
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    Số lượng
                                </TableCell>
                                <TableCell sx={{ textAlign: 'right' }}>
                                    Giá Nhập
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {record.importWarehouseDetails.map((item: any) => (
                                <TableRow key={i++}>
                                    <TableCell>
                                        {i}
                                    </TableCell>
                                    <TableCell sx={{textAlign: 'left'}}>
                                        <Link to={`/product/${item.product.id}`}>
                                            {item.product.name} ({item.color.name}/{item.size.name})
                                        </Link>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{item.quantity}</TableCell>
                                    <TableCell sx={{ textAlign: 'right' }}>
                                        {item.importPrice.toLocaleString(
                                            undefined,
                                            {
                                                style: 'currency',
                                                currency: 'VND',
                                            }
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom align="center">
                        Tổng tiền: {record.totalAmount.toLocaleString(
                        undefined,
                        {
                            style: 'currency',
                            currency: 'VND',
                        }
                    )}
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ImportInvoiceShow;
