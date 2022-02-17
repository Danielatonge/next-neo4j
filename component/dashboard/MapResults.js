import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material/styles';
import clsx from 'clsx'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapGL = dynamic(() => import('./Map'), {
    loading: () => "Loading...",
    ssr: false
})

export default function MapResults() {
    const [viewport, setViewport] = React.useState({
        latitude: 55.79,
        longitude: 49.11,
        zoom: 11
    });

    const theme = useTheme()
    const classes = {
        root: {
            display: 'flex',
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 440,
        },
    }

    return (
        <React.Fragment>
            <Grid container spacing={4}>
                <Grid item xs={12} >
                    <Paper style={{
                        height: '80vh',
                        padding: theme.spacing(2),
                        display: 'flex',
                        overflow: 'auto',
                        flexDirection: 'column'
                    }}>
                        <MapGL
                            style={{ width: '100%', height: '100%' }}
                            mapStyle="mapbox://styles/mapbox/light-v9"
                            accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                            latitude={viewport.latitude}
                            longitude={viewport.longitude}
                            zoom={viewport.zoom}
                            onViewportChange={setViewport}
                        />
                    </Paper>
                </Grid>

            </Grid>
        </React.Fragment>
    )
}
