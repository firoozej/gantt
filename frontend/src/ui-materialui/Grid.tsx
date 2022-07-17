import React, { ChangeEvent, MouseEvent, ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import LinearProgress from "@mui/material/LinearProgress";

interface Data {
    [key: string]: string | number;
}

type Order = "asc" | "desc";

export interface HeadCell {
    disablePadding?: boolean;
    dataIndex: keyof Data;
    title: string;
    render?: (value: any, record?: Data) => ReactNode;
}

interface EnhancedTableHeadProps {
    order: Order;
    orderBy: string;
    rowCount: number;
    numSelected: number;
    columns: HeadCell[];
    editableRow: boolean;
    onSort: (event: MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
}

const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = ({
    order,
    orderBy,
    rowCount,
    numSelected,
    columns,
    editableRow,
    onSort,
    onSelectAllClick,
}) => {
    const handleSort = (property: keyof Data) => (event: MouseEvent<unknown>) => {
        onSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all visible rows",
                        }}
                    />
                </TableCell>
                {columns.map(headCell => (
                    <TableCell
                        key={headCell.dataIndex}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.dataIndex ? order : false}>
                        <TableSortLabel
                            active={orderBy === headCell.dataIndex}
                            direction={orderBy === headCell.dataIndex ? order : "asc"}
                            onClick={handleSort(headCell.dataIndex)}>
                            {headCell.title}
                        </TableSortLabel>
                    </TableCell>
                ))}
                {editableRow && <TableCell></TableCell>}
            </TableRow>
        </TableHead>
    );
};

interface EnhancedTableToolbarProps {
    numSelected: number;
    title?: ReactNode;
}

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = ({ title, numSelected }) => {
    return (
        <Toolbar>
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
                    {title && title}
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton color="error">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

interface EnhancedTableProps {
    rowKey?: string;
    title?: ReactNode;
    columns: HeadCell[];
    onRowEdit?: Function;
    useData: (props: any) => { loading: boolean; data: any[]; total: number };
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({
    columns,
    title,
    rowKey = "id",
    onRowEdit = null,
    useData,
    ...rest
}) => {
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof Data | undefined>(undefined);
    const [selected, setSelected] = useState<readonly any[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const {
        data: rows,
        total,
        loading,
    } = useData({ pagination: { pageNumber: page, pageSize: rowsPerPage } });

    const handleSort = (event: MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n[rowKey]);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: MouseEvent<unknown>, keyValue: any) => {
        const selectedIndex = selected.indexOf(keyValue);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, keyValue);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (rowKey: string | number) => selected.indexOf(rowKey) !== -1;

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} title={title} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        size={dense ? "small" : "medium"}
                        data-test={(rest as any)["data-test"]}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy as string}
                            onSelectAllClick={handleSelectAll}
                            onSort={handleSort}
                            rowCount={rows.length}
                            columns={columns}
                            editableRow={onRowEdit !== null}
                        />
                        <TableBody>
                            {loading ? (
                                <TableRow data-test="Loading Row">
                                    <TableCell colSpan={columns.length + 1 + (onRowEdit ? 1 : 0)}>
                                        <LinearProgress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rows.map((row, index) => {
                                    const isItemSelected = isSelected(row[rowKey]);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, row[rowKey])}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row[rowKey]}
                                            selected={isItemSelected}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby": labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            {columns.map(column => (
                                                <TableCell key={column.dataIndex}>
                                                    {column.render
                                                        ? column.render(row[column.dataIndex], row)
                                                        : row[column.dataIndex]}
                                                </TableCell>
                                            ))}
                                            {onRowEdit && (
                                                <TableCell padding="checkbox" align="center">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            onRowEdit(row);
                                                        }}
                                                        data-test="Edit Row">
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {!loading && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
};

export { EnhancedTable as Grid };
