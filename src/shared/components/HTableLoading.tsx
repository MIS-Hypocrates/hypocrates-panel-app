"use client";

import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

export interface HTableLoadingProps {
  columns: {
    title: string;
    align?: "left" | "right" | "center";
    minWidth: number;
  }[];
  pearPage: number;
}

export function HTableLoading({ columns, pearPage }: HTableLoadingProps) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 1 }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={`title_${index.toString()}`}
                  align={column.align}
                  style={{ maxWidth: column.minWidth }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {new Array(pearPage).fill(null).map((_, index) => (
              <TableRow
                hover
                role={"checkbox"}
                tabIndex={-1}
                key={`row_${index}`}
              >
                {columns.map((_, columnIndex) => (
                  <TableCell key={`column_${columnIndex}_${index}`}>
                    <Skeleton />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[pearPage]}
        count={pearPage}
        component="div"
        rowsPerPage={pearPage}
        page={0}
        onPageChange={() => {}}
        // onRowsPerPageChange={(e) => {
        //     handleChangeRowsPerPage(+e.target.value)
        // }}
      />
    </Paper>
  );
}
