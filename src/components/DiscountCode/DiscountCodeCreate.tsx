import {
    ArrayInput,
    AutocompleteInput,
    BooleanInput,
    Create,
    DateInput,
    Labeled,
    NumberInput,
    TabbedForm,
    TextInput, useEditContext, useGetList
} from "react-admin";
import {Grid} from "@mui/material";
import React from "react";

export const DiscountCodeCreate = () => {
    return (
        <Create title={'Tạo mã'}>
            <TabbedForm>
                <TabbedForm.Tab label={'Thông tin mã'}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Labeled label={'Mã'}>
                                <TextInput fullWidth={true} name={"code"} source={""}/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label={'Ngày bắt đầu'}>
                                <DateInput fullWidth={true} name={"startDate"} source={""}/>
                            </Labeled>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Labeled label={'Ngày kết thúc'}>
                                <DateInput fullWidth={true} name={"endDate"} source={""}/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label={'Tiền giảm'}>
                                <NumberInput fullWidth={true} name={"discountMoney"} source={""}/>
                            </Labeled>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Labeled label={'Tỉ lệ giảm'}>
                                <NumberInput fullWidth={true} name={"discountRate"} source={""}/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label={'Số lượng'}>
                                <NumberInput fullWidth={true} name={"quantity"} source={""}/>
                            </Labeled>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Labeled label={'Trạng thái'}>
                            <BooleanInput fullWidth={true} name={"status"} source={""}/>
                        </Labeled>
                    </Grid>
                </TabbedForm.Tab>
            </TabbedForm>
        </Create>
    )
}