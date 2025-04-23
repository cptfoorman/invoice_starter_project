import { Margin, Padding } from "@mui/icons-material"
import { Box, Button, Paper, Stack, Collapse, Container } from "@mui/material"
import { useEffect, useState } from "react"
import { apiGet } from "../../Utils/apiGet";
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton'
import * as React from 'react';

const mainColumns = [
    { field: "button", headerName: "", minWidth: 60 },
    { field: "button2", headerName: "", minWidth: 60 },
    { field: "name", headerName: "name", minWidth: 130 },
    { field: "idNum", headerName: "identificationNumber", minWidth: 130 },
    { field: "tax", headerName: "taxNumber", minWidth: 130 },
    { field: "account", headerName: "accountNumber", minWidth: 130 },
    { field: "bank", headerName: "bankCode", minWidth: 130 },
    { field: "iban", headerName: "iban", minWidth: 130 },
    { field: "telephone", headerName: "telephone", minWidth: 180 },
    { field: "E", headerName: "mail", minWidth: 130 },
];
const secondaryColumns = [
    { field: "street", headerName: "street", minWidth: 260 },
    { field: "zip", headerName: "zip", minWidth: 130 },
    { field: "city", headerName: "city", minWidth: 130 },
    { field: "country", headerName: "country", minWidth: 130 },

];
const terciaryColumns = [
    { field: "note", headerName: "note", minWidth: 130 }
];

//colapsible table to reduce the table overall size

function Row(props) {
    const { id, street, zip, city, country, note, setSelectedId } = props; // Destructure props for clarity
    const [open, setOpen] = React.useState(false);
    const handleButtonClick = () => {
        setSelectedId(id); // Use the `id` from props to update the selected ID
    };

    return (
        <React.Fragment>
            {/* Expandable Button */}
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>

            {/* Collapsible Table Content */}
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {/* Details Section */}
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="details">
                                <TableHead>
                                    <TableRow>
                                        {secondaryColumns.map((column) => (
                                            <TableCell
                                                key={column.name}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.headerName}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={id}>
                                        <TableCell component="th" scope="row">
                                            {street}
                                        </TableCell>
                                        <TableCell>{zip}</TableCell>
                                        <TableCell align="left">{city}</TableCell>
                                        <TableCell align="left">{country}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>

                        {/* Notes Section */}
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="notes">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Notes
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={id}>
                                        <TableCell align="left">
                                            <Typography variant="body1">
                                                {note}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            {/* Button to update selectedId */}
                                            <Button onClick={handleButtonClick}>
                                                Click {id}
                                            </Button>
                                            <Button onClick={handleButtonClick}>
                                                Click2 {id}
                                            </Button>
                                            <Button onClick={handleButtonClick}>
                                                Click3 {id}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

/*function Row(props = [id, street, zip, city, country, note, setSelectedId]) {
    const [open, setOpen] = React.useState(false);
    const handleButtonClick = (id) => {
        setSelectedId(id); // Update the selected ID
      };
    
    return (
        <React.Fragment>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {secondaryColumns.map((column) => (
                                            <TableCell
                                                key={column.name}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.headerName}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={props.id}>
                                        <TableCell component="th" scope="row">
                                            {props.street}
                                        </TableCell>
                                        <TableCell>{props.zip}</TableCell>
                                        <TableCell align="left">{props.city}</TableCell>
                                        <TableCell align="left">
                                            {props.country}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Notes
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                </TableHead>

                                <TableBody>
                                    <TableRow key={props.id}>
                                        <TableCell align="left">
                                            <Typography variant="body1" >
                                                {props.note}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button onClick={handleButtonClick(props.id)}>
                                                click {props.id}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};
*/
//fetches all persons from the database and lists them out accordingly 
//policies are editable on the user since i have the userid accessible
function GetPersons({ setSelectedId }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const [persons, setPersons] = useState([])
    const [loading, setLoading] = useState(true)


    //button for reloading users since fetching data is async it would fetch infinitely otherwise
    const handleReload = e => {
        e.preventDefault()
        setPersons([])
        setLoading(true)
    }
    //fetches all user data
    useEffect(() => {
        async function fetchPersons() {
            setLoading(true)
            const data = await apiGet("http://localhost:8080/api/persons")
            console.log("sent data" + data)
            setPersons(data)
            console.log(persons)
        }
        setLoading(false)
        if (persons.length == 0) {
            fetchPersons()
        }
    })
    //staggered page state for ensuring that theres data to map by the elements in the default return
    if (loading == true) {
        return (
            <div>
                <Paper elevation={3}>
                    <Typography variant="h3" color="textPrimary">
                        Fetching People...
                    </Typography>
                </Paper>
            </div>
        )
    }
    return (
        <>
            <div>
                <Container>
                    <Box>
                        <Paper elevation={6} style={{ margin: "5px", padding: "15px", textAlign: "center" }}>
                            <Typography variant="h1" color="textPrimary">
                                All Users
                            </Typography>
                        </Paper>
                    </Box>
                    <Button variant="outlined" onClick={handleReload}> Reload Users</Button>
                    <Box>
                        <Paper elevation={1}>
                            <Stack
                                direction={{ sm: 'row' }}
                                spacing={"2"}
                                useFlexGap
                                sx={{ flexWrap: 'wrap', alignItems: "center", minWidth: "180px" }}>
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {mainColumns.map((column) => (
                                                        <TableCell
                                                            key={column.name}
                                                            align={column.align}
                                                            style={{ minWidth: column.minWidth }}
                                                        >
                                                            {column.headerName}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {persons
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((person => {
                                                        return (
                                                            <React.Fragment>
                                                                <TableRow hover role="checkbox" tabIndex={-1} key={person._id}>
                                                                    <Row 
                                                                        id={person._id}
                                                                        street={person.street}
                                                                        zip={person.zip}
                                                                        city={person.city}
                                                                        country={person.country}
                                                                        note={person.note}
                                                                        setSelectedId={setSelectedId}></Row>
                                                                    <TableCell>
                                                                        {person.name}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {person.identificationNumber}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {person.taxNumber}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {person.accountNumber}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {person.bankCode}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {person.iban}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {person.telephone}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {person.mail}
                                                                    </TableCell>
                                                                </TableRow>
                                                            </React.Fragment>
                                                        );
                                                    }))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, 100]}
                                        component="div"
                                        count={persons.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </Stack>
                        </Paper>
                    </Box>
                </Container>
            </div>
        </>
    )
}
export default GetPersons


/*
<Paper elevation={1}>
                        <Stack
                            direction={{ sm: 'row' }}
                            spacing={"2"}
                            useFlexGap
                            sx={{ flexWrap: 'wrap', alignItems: "center", minWidth: "300px" }}>
                            {persons.map(User => (
                                <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={User.id}>
                                    <Typography variant="h4" color="textPrimary">
                                        Name: {User.name}<br />
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Id Number: {User.identificationNumber}<br />
                                        Tax Number:{User.taxNumber}<br />
                                        Account Number: {User.accountNumber}<br />
                                        Bank Code: {User.bankCode}<br />
                                        iban: {User.iban}<br />
                                        telephone: {User.telephone}<br />
                                        E-Mail: {User.mail}<br />
                                        street: {User.street}<br />
                                        zip: {User.zip}<br />
                                        city: {User.city}<br />
                                        country: {User.country}<br />
                                        note: {User.note}<br />
                                    </Typography>
                                </Paper>
                            ))
                            }*/ 