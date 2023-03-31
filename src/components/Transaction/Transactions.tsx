import React from "react";
import { Grid, Typography } from "@mui/material";
import Footer from "~components/Layout/Footer";
import HeaderLight from "~components/Layout/HeaderLight";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'date' | 'amount';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'date', label: 'Date', minWidth: 170 },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  code: string;
  date: string;
  amount: number;
}

function createData(
  code: string,
  date: string,
  amount: number,
): Data {
  return { code, date, amount };
}

const rows = [
  createData('1', '2023-01-31 / 16:58:00' , 7),
  createData('2', '2023-01-31 / 16:58:00' , 8),
  createData('3', '2023-01-31 / 16:58:00' , 9),
  createData('4', '2023-01-31 / 16:58:00' , 0),
  createData('5', '2023-01-31 / 16:58:00' , 10),
  createData('6', '2023-01-31 / 16:58:00' , 11),
  createData('7', '2023-01-31 / 16:58:00' , 12),
  createData('8', '2023-01-31 / 16:58:00' , 13),
  createData('9', '2023-01-31 / 16:58:00' , 14),
  createData('10', '2023-01-31 / 16:58:00' , 15),
  createData('11', '2023-01-31 / 16:58:00' , 16),
  createData('12', '2023-01-31 / 16:58:00' , 17),
  createData('13', '2023-01-31 / 16:58:00' , 18),
  createData('14', '2023-01-31 / 16:58:00' , 19),
  createData('15', '2023-01-31 / 16:58:00' , 20),
  createData('16', '2023-01-31 / 16:58:00' , 21),
  createData('17', '2023-01-31 / 16:58:00' , 22),
  createData('18', '2023-01-31 / 16:58:00' , 23),
  createData('19', '2023-01-31 / 16:58:00' , 24),
  createData('20', '2023-01-31 / 16:58:00' , 25),
  createData('21', '2023-01-31 / 16:58:00' , 26),
  createData('22', '2023-01-31 / 16:58:00' , 26),
  createData('23', '2023-01-31 / 16:58:00' , 26),
  createData('24', '2023-01-31 / 16:58:00' , 26),
  createData('25', '2023-01-31 / 16:58:00' , 26),
  createData('26', '2023-01-31 / 16:58:00' , 26),
  createData('27', '2023-01-31 / 16:58:00' , 26),
  createData('28', '2023-01-31 / 16:58:00' , 26),
];


const Transactions = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container item xs={12}>

      <HeaderLight title={"Transactions"} />

      <Grid item maxHeight={475} xs={12} marginTop={6} sx={{overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 475, overflowX: "hidden",
          "&::-webkit-scrollbar": {width: 2},
          "&::-webkit-scrollbar-track": {backgroundColor: "lightgray"},
          "&::-webkit-scrollbar-thumb": {backgroundColor: "gray", borderRadius: 0},
        }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Footer />
    </Grid>
  );
}

export default Transactions;
