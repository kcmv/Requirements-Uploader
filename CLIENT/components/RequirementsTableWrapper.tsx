import React from "react";
import { Column, useTable } from "react-table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getDate, getExtensionName, getStatuses } from "helpers/util";
import Uploader from "./Uploader";

type ColumnName = {
  requirements: string;
  status: string;
  document_link: string;
  date_submitted: string;
  actions: string;
  comments: string;
};

interface UiProps {
  title: string;
  data: any;
  loading: boolean;
}

const RequirementsTableWrapper: React.FC<UiProps> = ({
  title,
  loading,
  data,
}) => {
  const documents = data
    ?.filter((item: any) => {
      return item.document_type.type === title;
    })
    .sort((a: any, b: any) => {
      let obj1 = new Date(a.document_type.createdAt);
      let obj2 = new Date(b.document_type.createdAt);
      return Number(obj1) - Number(obj2);
    });

  const columns = React.useMemo<Column<ColumnName>[]>(
    () => [
      {
        Header: "Requirement",
        accessor: "requirements" as const,
        Cell: (props: any) => {
          const { original } = props.row;
          return <div>{original.document_type.name}</div>;
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
        Header: "File Type",
        accessor: "document_link" as const,
        Cell: (props: any) => {
          const { original } = props.row;
          return <div>{getExtensionName(original.document_link)}</div>;
        },
      },
      {
        Header: "Date Submitted",
        accessor: "date_submitted" as const,
        Cell: (props: any) => {
          const { original } = props.row;
          return <div>{getDate(original.date_submitted)}</div>;
        },
      },
      {
        Header: "Comments",
        accessor: "comments" as const,
        Cell: (props: any) => {
          const { original } = props.row;
          return <div>{original.comments}</div>;
        },
      },
      {
        Header: "Actions",
        accessor: "actions" as const,
        width: 300,
        Cell: (props: any) => {
          const { original } = props.row;

          return (
            <div className="actionBtnWrapper">
              {original.status > 3 && <Uploader data={original} />}
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: documents ? documents : [],
  });

  return (
    <React.Fragment>
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
            {loading ? (
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            ) : null}
            {rows.length > 0 && !loading
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
    </React.Fragment>
  );
};

export default RequirementsTableWrapper;
