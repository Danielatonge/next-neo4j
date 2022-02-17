import * as React from 'react';

// @mui/material
import {
    Grid, Paper
} from '@mui/material';

// page layout
import MainLayout from 'layout/MainLayout';

// component imports
import Chart from '@/dashboard/Chart';
import Deposits from '@/dashboard/Deposits';
import Orders from '@/dashboard/Orders';


export default function Dashboard() {

    return (
        <Grid container spacing={2}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Chart />
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Deposits />
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders />
                </Paper>
            </Grid>
        </Grid>
    );
}

Dashboard.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}
