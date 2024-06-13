import * as React from 'react';
import {SxProps, Typography} from '@mui/material';
import {memo} from 'react';

import {FieldProps, useRecordContext} from 'react-admin';
import {User} from '../../types';
import AvatarField from "./AvatarField";

interface Props extends FieldProps<User> {
    size?: string;
    sx?: SxProps;
}

const FullNameField = (props: Props) => {
    const {size} = props;
    const record: any = useRecordContext<User>();
    console.log("record", record);
    return record ? (
        <Typography
            variant="body2"
            display="flex"
            flexWrap="nowrap"
            alignItems="center"
            component="div"
            sx={props.sx}
        >
            <AvatarField
                record={record}
                size={size}
                sx={{
                    mr: 1,
                    mt: -0.5,
                    mb: -0.5,
                }}
            />
            <p>{record.userInformation.fullName}</p>
        </Typography>
    ) : null;
};

FullNameField.defaultProps = {
    source: 'fullName' as const,
    label: 'Họ tên',
};

export default memo<Props>(FullNameField);
