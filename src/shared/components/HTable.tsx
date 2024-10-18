"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { IModel } from "@/Interfaces";

export type HTableColumns<T extends IModel> = {
  title: string;
  key: keyof T;
  align?: "left" | "right" | "center";
  minWidth: number;
};

export interface HTableProps<T extends IModel> {
  columns: HTableColumns<T>[];
  data: T[];
  page: number;
  countData: number;
  pearPage: number;
  handleChangePage: (page: number) => void;
  handleChangeRowsPerPage: (page: number) => void;
}

const HTable = <T extends IModel>({
  columns,
  data,
  countData,
  page,
  pearPage,
  handleChangePage,
  handleChangeRowsPerPage,
}: HTableProps<T>) => (
  <Paper sx={{ width: "100%", overflow: "hidden", p: 1 }}>
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={`title_${column.key.toString()}`}
                align={column.align}
                style={{ maxWidth: column.minWidth }}
              >
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              hover
              role={"checkbox"}
              tabIndex={-1}
              key={`row_${row.id}`}
            >
              {columns.map((column) => (
                <TableCell
                  align={column.align}
                  key={`${index}_${column.key.toString()}`}
                >
                  {String(row[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      count={countData}
      component="div"
      rowsPerPage={pearPage}
      page={page - 1}
      onPageChange={(_, page) => handleChangePage(page + 1)}
      onRowsPerPageChange={(e) => {
        handleChangeRowsPerPage(+e.target.value);
      }}
    />
  </Paper>
);

export { HTable };
