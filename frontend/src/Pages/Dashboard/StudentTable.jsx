// // basic
// import HomeIcon from '@mui/icons-material/Home';
// import { Link } from 'react-router-dom';

// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import Box from '@mui/material/Box';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import IconButton from '@mui/material/IconButton';
// import Paper from '@mui/material/Paper';
// import { alpha } from '@mui/material/styles';
// import Switch from '@mui/material/Switch';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Tooltip from '@mui/material/Tooltip';
// import Typography from '@mui/material/Typography';
// import { visuallyHidden } from '@mui/utils';
// import PropTypes from 'prop-types';
// import * as React from 'react';

// import BarChart from './BarChart';
// import MixedChart from './MixedChart';

// function createData(id, name, class_, marks, percentage, age) {
//   return {
//     id,
//     name,
//     class: class_,
//     marks,
//     percentage,
//     age,
//   };
// }

// // Example student data (replace this with your actual data from the payload)
// const rows = [
//   createData(1, 'John Doe', '10A', 85, 85.0, 16),
//   createData(2, 'Jane Smith', '10B', 92, 92.0, 15),
//   createData(3, 'Bob Johnson', '10A', 78, 78.0, 16),
//   createData(4, 'Alice Brown', '10C', 88, 88.0, 15),
//   createData(5, 'Charlie Davis', '10B', 95, 95.0, 16),
//   createData(6, 'Emily Wilson', '10A', 81, 81.0, 15),
//   createData(7, 'David Miller', '10C', 89, 89.0, 16),
//   createData(8, 'Sophia Lee', '10B', 93, 93.0, 15),
//   createData(9, 'Michael Scott', '10A', 76, 76.0, 16),
//   createData(10, 'Isabella King', '10C', 90, 90.0, 15),
//   createData(11, 'James Taylor', '10B', 87, 87.0, 16),
//   createData(12, 'Olivia Martin', '10A', 82, 82.0, 15),
//   createData(13, 'Benjamin White', '10C', 84, 84.0, 16),
//   createData(14, 'Charlotte Harris', '10B', 91, 91.0, 15),
//   createData(15, 'Liam Clark', '10A', 79, 79.0, 16),
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// const headCells = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: true,
//     label: 'Student Name',
//   },
//   {
//     id: 'class',
//     numeric: false,
//     disablePadding: false,
//     label: 'Class',
//   },
//   {
//     id: 'marks',
//     numeric: true,
//     disablePadding: false,
//     label: 'Marks',
//   },
//   {
//     id: 'percentage',
//     numeric: true,
//     disablePadding: false,
//     label: 'Percentage',
//   },
//   {
//     id: 'age',
//     numeric: true,
//     disablePadding: false,
//     label: 'Age',
//   },
// ];

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all students',
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };
// //toolbar
// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;
//   return (
//     <Toolbar
//       sx={[
//         {
//           pl: { sm: 2 },
//           pr: { xs: 1, sm: 1 },
//         },
//         numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         },
//       ]}
//     >
//       <Typography
//         sx={{
//           flex: '1 1 100%',
//           fontWeight: 'bold',
//           color: 'blue'  // Change color to blue
//         }}
//         variant="h6"
//         id="tableTitle"
//         component="div"
//       >
//         Student Data
//       </Typography>

//       <Tooltip title="Home">
//         <IconButton component={Link} to="/dashboard">
//           <HomeIcon />
//         </IconButton>
//       </Tooltip>

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// export default function StudentTable() {
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('name');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (id) => selected.indexOf(id) !== -1;

//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = React.useMemo(
//     () =>
//       [...rows]
//         .sort(getComparator(order, orderBy))
//         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [order, orderBy, page, rowsPerPage],
//   );

//   return (
//     <Box sx={{ width: '100%' }} >
//       <Paper sx={{ width: '100%', mb: 2 }}  >
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer className="bg-yellow-100 rounded-lg shadow-md overflow-hidden">
//   <Table
//     sx={{ minWidth: 750 }}
//     aria-labelledby="tableTitle"
//     size={dense ? 'small' : 'medium'}
//   >
//     <EnhancedTableHead
//       numSelected={selected.length}
//       order={order}
//       orderBy={orderBy}
//       onSelectAllClick={handleSelectAllClick}
//       onRequestSort={handleRequestSort}
//       rowCount={rows.length}
//       className="bg-slate-900 text-white"
//     />
//     <TableBody>
//       {visibleRows.map((row, index) => {
//         const isItemSelected = isSelected(row.id);
//         const labelId = `enhanced-table-checkbox-${index}`;

//         return (
//           <TableRow
//             hover
//             onClick={(event) => handleClick(event, row.id)}
//             role="checkbox"
//             aria-checked={isItemSelected}
//             tabIndex={-1}
//             key={row.id}
//             selected={isItemSelected}
//             className={` text-slate-950 cursor-pointer`}
//           >
//             <TableCell padding="checkbox">
//               <Checkbox
//                 color="primary"
//                 checked={isItemSelected}
//                 inputProps={{
//                   'aria-labelledby': labelId,
//                 }}
//               />
//             </TableCell>
//             <TableCell
//               component="th"
//               id={labelId}
//               scope="row"
//               padding="none"
//               className="font-semibold"
//             >
//               {row.name}
//             </TableCell>
//             <TableCell align="left" className="font-semibold">{row.class}</TableCell>
//             <TableCell align="right" className="font-semibold">{row.marks}</TableCell>
//             <TableCell align="right" className="font-semibold">{row.percentage.toFixed(2)}%</TableCell>
//             <TableCell align="right" className="font-semibold">{row.age}</TableCell>
//           </TableRow>
//         );
//       })}
//       {emptyRows > 0 && (
//         <TableRow
//           style={{
//             height: (dense ? 33 : 53) * emptyRows,
//           }}
//         >
//           <TableCell colSpan={6} />
//         </TableRow>
//       )}
//     </TableBody>
//   </Table>
// </TableContainer>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Dense padding"
//       />
//       <div  className= "grid grid-cols-1 md:grid-cols-2 gap-6">
//       <div className="bg-gray-100 p-4 shadow-lg rounded ">
//             <BarChart/>
//           </div>
//           <div className="bg-gray-100 p-4 shadow-lg rounded ">
//             <MixedChart />
//           </div>

//       </div>
//     </Box>

//   );
// }

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Engagement from "./Engagement";
import MixedChart from "./MixedChart";
import StudentPerformance from "./StudentPerformance";

// ... (keep the existing helper functions like createData, descendingComparator, getComparator)
//Example student data (replace this with your actual data from the payload)

function createData(id, name, class_, marks, percentage, age) {
  return {
    id,
    name,
    class: class_,
    marks,
    percentage,
    age,
  };
}

const rows = [
  createData(1, "John Doe", "10A", 85, 85.0, 16),
  createData(2, "Jane Smith", "10B", 92, 92.0, 15),
  createData(3, "Bob Johnson", "10A", 78, 78.0, 16),
  createData(4, "Alice Brown", "10C", 88, 88.0, 15),
  createData(5, "Charlie Davis", "10B", 95, 95.0, 16),
  createData(6, "Emily Wilson", "10A", 81, 81.0, 15),
  createData(7, "David Miller", "10C", 89, 89.0, 16),
  createData(8, "Sophia Lee", "10B", 93, 93.0, 15),
  createData(9, "Michael Scott", "10A", 76, 76.0, 16),
  createData(10, "Isabella King", "10C", 90, 90.0, 15),
  createData(11, "James Taylor", "10B", 87, 87.0, 16),
  createData(12, "Olivia Martin", "10A", 82, 82.0, 15),
  createData(13, "Benjamin White", "10C", 84, 84.0, 16),
  createData(14, "Charlotte Harris", "10B", 91, 91.0, 15),
  createData(15, "Liam Clark", "10A", 79, 79.0, 16),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Student Name",
  },
  {
    id: "class",
    numeric: false,
    disablePadding: false,
    label: "Class",
  },
  {
    id: "marks",
    numeric: true,
    disablePadding: false,
    label: "Marks",
  },
  {
    id: "percentage",
    numeric: true,
    disablePadding: false,
    label: "Percentage",
  },
  {
    id: "age",
    numeric: true,
    disablePadding: false,
    label: "Age",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
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
              "aria-label": "select all students",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, onFilterClick } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      <Typography
        sx={{
          flex: "1 1 100%",
          fontWeight: "bold",
          color: "black",
        }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Student Data
      </Typography>

      <Tooltip title="Home">
        <IconButton component={Link} to="/dashboard">
          <HomeIcon />
        </IconButton>
      </Tooltip>

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={onFilterClick}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default function StudentTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    marks: "",
    class: "",
    age: "",
    percentage: "",
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      return (
        (filters.marks === "" || row.marks >= parseInt(filters.marks)) &&
        (filters.class === "" || row.class === filters.class) &&
        (filters.age === "" || row.age === parseInt(filters.age)) &&
        (filters.percentage === "" || row.percentage >= parseFloat(filters.percentage))
      );
    });
  }, [filters]);

  const visibleRows = React.useMemo(
    () => filteredRows.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} onFilterClick={() => setShowFilters(!showFilters)} />
        {showFilters && (
          <Box sx={{ p: 2, display: "flex", gap: 2 }}>
            <TextField name="marks" label="Min Marks" type="number" value={filters.marks} onChange={handleFilterChange} />
            <Select name="class" value={filters.class} onChange={handleFilterChange} displayEmpty>
              <MenuItem value="">All Classes</MenuItem>
              <MenuItem value="10A">10A</MenuItem>
              <MenuItem value="10B">10B</MenuItem>
              <MenuItem value="10C">10C</MenuItem>
            </Select>
            <TextField name="age" label="Age" type="number" value={filters.age} onChange={handleFilterChange} />
            <TextField name="percentage" label="Min Percentage" type="number" value={filters.percentage} onChange={handleFilterChange} />
          </Box>
        )}
        <TableContainer className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
              className="bg-slate-900 text-white"
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    className={`text-slate-950 cursor-pointer`}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none" className="font-semibold">
                      {row.name}
                    </TableCell>
                    <TableCell align="left" className="font-semibold">
                      {row.class}
                    </TableCell>
                    <TableCell align="right" className="font-semibold">
                      {row.marks}
                    </TableCell>
                    <TableCell align="right" className="font-semibold">
                      {row.percentage.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right" className="font-semibold">
                      {row.age}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 shadow-lg rounded flex justify-center ">
          <StudentPerformance />
        </div>
        <div className="bg-gray-100 p-4 shadow-lg rounded ">
          <MixedChart />
        </div>
      </div>

      <div className="bg-gray-100 flex shadow-2xl justify-center md:w-1rem">
        <div className=" p-4 my-3 shadow-2xl rounded flex ">
          <Engagement />
        </div>
      </div>
    </Box>
  );
}
