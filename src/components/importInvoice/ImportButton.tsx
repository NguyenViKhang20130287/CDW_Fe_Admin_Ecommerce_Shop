import React, { ChangeEvent, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, Grid, DialogActions } from '@mui/material';
import { useDataProvider, useNotify } from 'react-admin';
import * as XLSX from 'xlsx';
import { SelectChangeEvent } from '@mui/material/Select';
import {getUserByToken} from "../../services/DataProvider";
import { useRefresh } from 'react-admin';

const ImportButton = () => {
    const [open, setOpen] = useState(false);
    const [columnHeaders, setColumnHeaders] = useState<string[]>([]);
    const [importData, setImportData] = useState<any[]>([]);
    const refresh = useRefresh();
    const [mapping, setMapping] = useState<{ [key: string]: string }>({
        product_id: '',
        color_id: '',
        size_id: '',
        importPrice: '',
        quantity: '',
    });

    const labels = {
        product_id: 'Mã sản phẩm',
        color_id: 'Mã màu',
        size_id: 'Mã size',
        importPrice: 'Giá nhập',
        quantity: 'Số lượng',
    };

    const dataProvider = useDataProvider();
    const notify = useNotify();

    const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target!.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
            const headers = data[0] as string[];
            setColumnHeaders(headers);
            const importedData = data.slice(1).map((row: any[]) => {
                let obj: any = {};
                headers.forEach((key, i) => {
                    obj[key] = row[i];
                });
                return obj;
            });
            setImportData(importedData);
            setOpen(true); // Open the dialog after file is processed
        };
        reader.readAsBinaryString(file);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: SelectChangeEvent<string>, field: string) => {
        setMapping({ ...mapping, [field]: event.target.value as string });
    };

    const handleSubmit = () => {
        const formattedData = importData.map((row) => ({
            product_id: row[mapping.product_id],
            color_id: row[mapping.color_id],
            size_id: row[mapping.size_id],
            importPrice: row[mapping.importPrice],
            quantity: row[mapping.quantity],
        }));
        const user = getUserByToken();
        dataProvider.create('warehouse', { data: { ImportInvoiceRequest: {id: 0, createdBy: user, importInvoiceDetailRequests: formattedData}  }})
            .then(({ data }) => {
                notify('Thêm hàng thành công', { type: 'success' });
                refresh();
                handleClose();
            })
            .catch((error) => {
                console.log(error)
                notify('Thêm hàng thất bại', { type: 'warning' });
            });
    };

    return (
        <>
            <Button
                variant="contained"
                component="label"
            >
                Nhập hàng bằng excel
                <input
                    type="file"
                    hidden
                    onChange={handleImport}
                />
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Chọn cột từ file Excel</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {Object.keys(mapping).map((field) => (
                            <Grid item xs={12} key={field}>
                                <FormControl fullWidth>
                                    <InputLabel>{labels[field as keyof typeof labels]}</InputLabel>
                                    <Select
                                        value={mapping[field]}
                                        onChange={(event) => handleChange(event, field)}
                                    >
                                        {columnHeaders.map((header, index) => (
                                            <MenuItem key={index} value={header}>
                                                {header}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleSubmit} color="primary">Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ImportButton;
