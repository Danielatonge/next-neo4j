import React from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useQuery, gql } from '@apollo/client'
import Link from '../Link';

// const useStyles = styled('')({
//     depositContext: {
//         flex: 1,
//     },
//     navLink: {
//         textDecoration: 'none',
//     },
// })

const GET_COUNT_QUERY = gql`
  {
    employeeCount
  }
`

export default function EmployeeCount() {
    const classes = useStyles()

    const { loading, error, data } = useQuery(GET_COUNT_QUERY)
    if (error) return <p>Error</p>
    return (
        <React.Fragment>
            <Typography>Total Employees</Typography>
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
    )
}
