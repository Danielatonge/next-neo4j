import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function SummaryCard({ rows, showCard }) {

    return (
        <Card sx={{ minWidth: 300, position: 'absolute', top: 22, right: 0, zIndex: 2, display: showCard ? "block" : "none" }}>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} size="small" aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>{rows.type}</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.values && rows.values.map((row, i) => (
                                <StyledTableRow key={row[0]}>
                                    <StyledTableCell component="th" scope="row">
                                        {row[0]}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row[1]}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}
