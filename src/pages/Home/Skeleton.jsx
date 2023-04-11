import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function ProductSkeleton() {
    return (
        <Stack spacing={1} direction='column' alignItems='center'>
            <Skeleton variant='rectangular' width={250} height={200} />
            <Skeleton variant='text' sx={{ fontSize: '15px' }} width={160} />
            <Skeleton variant='text' sx={{ fontSize: '15px' }} width={100} />
            <Skeleton variant='text' sx={{ fontSize: '15px' }} width={100} />
            <Skeleton variant='rounded' width={250} height={80} />
        </Stack>
    );
}
