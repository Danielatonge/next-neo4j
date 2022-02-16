import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useQuery, gql } from '@apollo/client'

const GET_RECENT_REVIEWS_QUERY = gql`
  {
    users {
      id
      fullName
      currentPosition
      address
      averageRating
    }
  }
`

export default function RecentReviews() {
    const { loading, error, data } = useQuery(GET_RECENT_REVIEWS_QUERY)
    if (error) return <p>Error</p>
    if (loading) return <p>Loading</p>

    return (
        <React.Fragment>
            <Typography>Recent Reviews</Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>User Name</TableCell>
                        <TableCell>Position</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell align="right">Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.users.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.fullName}</TableCell>
                            <TableCell>{row.currentPosition}</TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell align="right">{row.averageRating}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}
