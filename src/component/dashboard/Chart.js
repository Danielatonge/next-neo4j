import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Typography/Title';
import { useQuery, gql } from '@apollo/client'
const GET_DATA_QUERY = gql`
  {
    employeeRating {
      id
      rating
    }
  }
`

export default function Chart() {
    const theme = useTheme();

    const { loading, error, data } = useQuery(GET_DATA_QUERY)
    if (error) return <p>Error</p>
    if (loading) return <p>Loading</p>

    return (
        <React.Fragment>
            <Title>Average Employee Rating</Title>
            <ResponsiveContainer>
                <BarChart
                    data={data.employeeRating}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="id" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Rating
                        </Label>
                    </YAxis>
                    <Bar dataKey="rating" fill={theme.palette.primary.main}></Bar>
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}