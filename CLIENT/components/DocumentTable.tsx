import { getDate } from "helpers/util";
import React, { useMemo } from "react";
import { Column, useTable } from "react-table";
import { useGlobalProvider } from "../context/state";
import { useGetEmployeeRequests } from "services";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

type DocumentHeader = {
  purpose: string;
  date_requested: string;
  completed: string;
  completed_date: string;
  completedDateTime: string;
  requestDateTime: string;
};

const DocumentTable = () => {
  const globalState = useGlobalProvider();
  const { data, isLoading, error }: any = useGetEmployeeRequests();

  const columns = useMemo<Column<DocumentHeader>[]>(
    () => [
      {
        Header: "Purpose",
        accessor: "purpose" as const,
        Cell: (props: any) => {
          const { original } = props.row;
          return <div>{original.purpose}</div>;
        },
      },
      {
        Header: "Date Requested",
        accessor: "requestDateTime" as const,
        Cell: (props: any) => {
          const { original } = props.row;
          return <div>{getDate(original.requestDateTime)}</div>;
        },
      },
      {
        Header: "Completed",
        accessor: "completed" as const,
        Cell: (props: any) => {
          const { original } = props.row;
          return <div>{original.completed ? "Yes" : "No"}</div>;
        },
      },
      {
        Header: "Completed Date",
        accessor: "completedDateTime" as const,
        Cell: (props: any) => {
          const { original } = props.row;
          return <div>{getDate(original.completedDateTime)}</div>;
        },
      },
    ],
    []
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: data ? data : [],
  });

  React.useEffect(() => {
    if (error) {
      const { data } = error.response;
      globalState.setValues({
        open: true,
        text: data.hasOwnProperty("message") ? data.message : data,
        status: error.response.status,
      });
    }
  }, []);

  return (
    <>
      <TableContainer>
        <Table {...getTableProps()} aria-label="simple table">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            ) : null}
            {rows.length > 0 && !isLoading
              ? rows.map((row) => {
                  prepareRow(row);
                  return (
                    <TableRow {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <TableCell {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DocumentTable;
