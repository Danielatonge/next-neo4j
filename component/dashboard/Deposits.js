import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Typography/Title';
import { useQuery, gql } from '@apollo/client'

function preventDefault(event) {
    event.preventDefault();
}

const GET_COUNT_QUERY = gql`
  {
    employeeCount
  }
`

export default function Deposits() {
    const { loading, error, data } = useQuery(GET_COUNT_QUERY)
    if (error) return <p>Error</p>
    return (
        <React.Fragment>
            <Title>Total Employees</Title>
            <Typography component="p" variant="h4">
                {loading ? 'Loading...' : data.employeeCount}
            </Typography>
            <Typography color="textSecondary" >
                Employees
            </Typography>
            <div>
                <Link to="/users" >
                    View employees
                </Link>
            </div>
        </React.Fragment>
    );
}