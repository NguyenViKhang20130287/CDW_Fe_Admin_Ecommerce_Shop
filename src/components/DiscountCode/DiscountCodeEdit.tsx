import {BooleanInput, DateInput, Edit, Labeled, NumberInput, TabbedForm, TextInput} from "react-admin";
import {Grid} from "@mui/material";

export const DiscountCodeEdit = () =>{
    return(
        <Edit>
            <TabbedForm>
                <TabbedForm.Tab label={'Thông tin'}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Labeled label={'Mã'}>
                                <TextInput fullWidth={true} name={'code'} source={'code'} disabled={true}/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label={'Ngày bắt đầu'}>
                                <DateInput fullWidth={true} name={'startDate'} source={'startDate'}/>
                            </Labeled>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Labeled label={'Ngày kết thúc'}>
                                <DateInput fullWidth={true} name={'endDate'} source={'endDate'}/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label={'Ngày bắt đầu'}>
                                <NumberInput fullWidth={true} name={'quantity'} source={'quantity'}/>
                            </Labeled>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Labeled label={'Gía giảm'}>
                                <NumberInput fullWidth={true} name={'discountMoney'} source={'discountMoney'}/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label={'Tỉ lệ giảm'}>
                                <NumberInput fullWidth={true} name={'discountRate'} source={'discountRate'}/>
                            </Labeled>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Labeled label={'Người tạo'}>
                                <TextInput fullWidth={true} name={'createdBy.username'} source={'createdBy.username'} disabled={true}/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label={'Người chỉnh sửa'}>
                                <TextInput fullWidth={true} name={'updatedBy.username'} source={'updatedBy.username'} disabled={true}/>
                            </Labeled>
                        </Grid>
                    </Grid>
                    <Grid>
                        <BooleanInput name={'status'} source={'status'}/>
                    </Grid>
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    )
}