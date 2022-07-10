import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getDate, getStatuses } from 'helpers/util';
import React from 'react'
import { Column, useTable } from 'react-table';
import { useUservaccination } from 'services';
import AddVaccination from "./AddVaccination"

type VaccineHeader = {
    vaccine: string;
    status: string;
    dose_status: string;
    date_given: string;
    link: string;
    actions: string;
    comments: string;
  };
  
  const VaccinationTable = () => {
    const { data, isLoading }: any = useUservaccination();
  
    const columns = React.useMemo<Column<VaccineHeader>[]>(
      () => [
        {
          Header: "Vaccine",
          accessor: "vaccine" as const,
          Cell: (props: any) => {
            const { original } = props.row;
            return <div>{original.vaccine_type.name}</div>;
          },
        },
        {
          Header: "Status",
          accessor: "status" as const,
          Cell: (props: any) => {
            const { original } = props.row;
            return <div>{getStatuses(original.status)}</div>;
          },
        },
        {
          Header: "Dose Status",
          accessor: "dose_status" as const,
          Cell: (props: any) => {
            const { original } = props.row;
            const isBooster = original.vaccine_type.isbooster;
            return <div>{isBooster ? null : original.dose}</div>;
          },
        },
        {
          Header: "Date Given",
          accessor: "date_given" as const,
          Cell: (props: any) => {
            const { original } = props.row;
            return <div>{getDate(original.date_given)}</div>;
          },
        },
        {
          Header: "Comments",
          accessor: "comments" as const,
          Cell: (props: any) => {
            const { original } = props.row;
            return <div>{original.comment}</div>;
          },
        },
        {
          Header: "Actions",
          accessor: "actions" as const,
          width: 300,
          Cell: (props: any) => {
            const { original } = props.row;
            return (
              <>
                {original.status >= 4 && (
                  <AddVaccination type={1} original={original} />
                )}
              </>
            );
          },
        },
      ],
      []
    );
  
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data: data ? data : [],
    });
  
    return (
      <>
        <TableContainer>
          <Table {...getTableProps()} aria-label="simple table">
            <TableHead>
              {headerGroups.map((headerGroup: any) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
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
                ? rows.map((row: any) => {
                    prepareRow(row);
                    return (
                      <TableRow {...row.getRowProps()}>
                        {row.cells.map((cell: any) => {
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
  
  export default VaccinationTable;
  