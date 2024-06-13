import * as React from 'react';
import {
    EditBase,
    TextInput,
    SimpleForm,
    DateField,
    EditProps,
    Labeled,
} from 'react-admin';
import {Box, Grid, Stack, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ProductReferenceField from '../product/ProductReferenceField';
import StarRatingField from './StarRatingField';
import ReviewEditToolbar from './ReviewEditToolbar';
import {Review} from '../../types';
import UserReferenceField from "../User/UserReferenceField";

interface Props extends EditProps<Review> {
    onCancel: () => void;
}

const ReviewEdit = ({id, onCancel}: Props) => {

    return (
        <EditBase id={id}>
            <Box pt={5} width={{xs: '100vW', sm: 400}} mt={{xs: 2, sm: 1}}>
                <Stack direction="row" p={2}>
                    <Typography variant="h6" flex="1">
                        Chi tiết đánh giá
                    </Typography>
                    <IconButton onClick={onCancel} size="small">
                        <CloseIcon/>
                    </IconButton>
                </Stack>
                <SimpleForm
                    sx={{pt: 0, pb: 0}}
                    toolbar={<ReviewEditToolbar/>}
                >
                    <Grid container rowSpacing={1} mb={1}>
                        <Grid item xs={6}>
                            <Labeled label={'Người đánh giá'}>
                                <UserReferenceField source={'user.id'}/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label="Sản phẩm">
                                <ProductReferenceField sx={{
                                    mr: 1,
                                    mt: '13px',
                                    mb: -0.5,
                                }}/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled label="Ngày đánh giá">
                                <DateField source="createdAt"/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled>
                                <StarRatingField/>
                            </Labeled>
                        </Grid>
                    </Grid>
                    <TextInput
                        source="content"
                        maxRows={15}
                        multiline
                        fullWidth
                    />
                </SimpleForm>
            </Box>
        </EditBase>
    );
};

export default ReviewEdit;
