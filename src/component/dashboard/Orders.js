import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Typography/Title';
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

function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    const { loading, error, data } = useQuery(GET_RECENT_REVIEWS_QUERY)
    if (error) return <p>Error</p>
    if (loading) return <p>Loading</p>
    return (
        <React.Fragment>
            <Title>Recent Reviews</Title>
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
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}