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
import { PeopleActionsState } from "../../Utils/States";
import InvoiceDeleteButton from "./InvoiceDeleteButton";
import dateStringFormatter from "../../Utils/dateStringFormatter";


//table collums for maintainability
const mainColumns = [
    { field: "button", headerName: "", minWidth: 60 },
    { field: "button2", headerName: "", minWidth: 60 },
    { field: "issued", headerName: "Issued", minWidth: 130 },
    { field: "product", headerName: "Product", minWidth: 130 },
    { field: "price", headerName: "Price", minWidth: 130 },
    { field: "vat", headerName: "VAT", minWidth: 130 },
    { field: "invoiceNumber", headerName: "Invoice Number", minWidth: 150 },
];

const secondaryColumns = [
    { field: "note", headerName: "Note", minWidth: 180 },
    { field: "dueDate", headerName: "Due Date", minWidth: 150 },
    { field: "actions", headerName: "actions", minWidth: 150 },
];
const buyerColumns = [
    {
        field: "buyerName",
        headerName: "Buyer Name",
        minWidth: 180,
    },
    {
        field: "buyerIdentificationNumber",
        headerName: "Identification Number",
        minWidth: 180,
    },
    { field: "buyerId", headerName: "Buyer ID", minWidth: 130 },
];
const sellerColumns = [
    {
        field: "sellerName",
        headerName: "Seller Name",
        minWidth: 180,
    },
    {
        field: "sellerIdentificationNumber",
        headerName: "Identification Number",
        minWidth: 180,
    },
    { field: "sellerId", headerName: "Seller ID", minWidth: 130 },
];


//colapsible table to reduce the tables overall size
//contains buttons that have states for the underpage State 
function Row(props) {
    const { dueDate, buyerId, buyerIdNum, sellerId, sellerIdNum, buyerName, sellerName, setSelectedId, note, id, setUnderPageState } = props; // Destructure props for clarity
    const [open, setOpen] = React.useState(false);

    /*
    button handles for clicking details on buyer or seller*/
    const handleBuyerButtonClick = (e) => {
        setSelectedId(buyerId);// Use the 'id' from props to update the selected ID
        switch (e.target.name) {
            case "details":
                setUnderPageState(PeopleActionsState[1])
                break
        };
    };
    const handleSellerButtonClick = (e) => {
        setSelectedId(sellerId);// Use the 'id' from props to update the selected ID
        switch (e.target.name) {
            case "details":
                setUnderPageState(PeopleActionsState[1])
                break
        };
    };
    const handleButtonClick = (e) => {
        setSelectedId(id);// Use the `id` from props to update the selected ID
        switch (e.target.name) {
            case "edit":
                setUnderPageState(PeopleActionsState[3])
                break
            case "details":
                setUnderPageState(PeopleActionsState[1])
                break
            default:
                console.log(e.target.name)
        };
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
                        {/* Notes Section */}
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Notes
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
                                            {note}
                                        </TableCell>
                                        <TableCell>{dateStringFormatter(dueDate)}</TableCell>
                                        <TableCell>
                                            {/* Actions Section */}
                                            <Stack>
                                                <InvoiceDeleteButton id={id}></InvoiceDeleteButton>
                                                <Button onClick={handleButtonClick} name="edit" color="secondary" variant="contained">
                                                    Edit
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            {/* Buyer Section */}
                            <Table size="small" aria-label="details">
                                <TableHead>
                                    <TableRow>
                                        {buyerColumns.map((column) => (
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
                                    <TableRow key={buyerId}>
                                        <TableCell component="th" scope="row">
                                            {buyerName}
                                        </TableCell>
                                        <TableCell>{buyerIdNum}</TableCell>
                                        <TableCell>{buyerId}</TableCell>
                                        <Stack spacing={2} direction="column">
                                            <Button onClick={handleBuyerButtonClick} name="details" color="info" variant="contained">
                                                Details
                                            </Button>
                                        </Stack>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>

                        {/* seller Section */}
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="notes">
                                <TableHead>
                                    <TableRow>
                                        {sellerColumns.map((column) => (
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
                                    <TableRow key={sellerId}>
                                        <TableCell component="th" scope="row">
                                            {sellerName}
                                        </TableCell>
                                        <TableCell>{sellerIdNum}</TableCell>
                                        <TableCell>{sellerId}</TableCell>
                                        <Stack spacing={2} direction="column">
                                            <Button onClick={handleSellerButtonClick} name="details" color="info" variant="contained">
                                                Details
                                            </Button>
                                        </Stack>
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

//fetches all persons from the database and lists them out accordingly 
//policies are editable on the user since i have the userid accessible
function GetInvoices(props) {
    const { setSelectedId, setUnderPageState } = props
    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };





    //button for reloading users since fetching data is async it would fetch infinitely otherwise
    const handleReload = e => {
        e.preventDefault()
        setInvoices([])
        setLoading(true)
    }
    //fetches all user data
    useEffect(() => {
        async function fetchInvoices() {
            setLoading(true);
            try {
                const data = await apiGet("http://localhost:8080/api/invoice/getAll");
                setInvoices(data);
            } catch (error) {
                console.error("Error fetching invoices:", error);
            } finally {
                setLoading(false);
            }
        }

        if (invoices.length === 0) {
            fetchInvoices();
        }
    }, [invoices]);
    //staggered page state for ensuring that theres data to map by the elements in the default return
    if (loading) {
        return (
            <div>
                <Paper elevation={3}>
                    <Typography variant="h3" color="textPrimary">
                        Fetching Invoices...
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
                                All Invoices
                            </Typography>
                        </Paper>
                    </Box>
                    <Button variant="outlined" onClick={handleReload}> Reload</Button>
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
                                                {invoices
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((invoice => {
                                                        return (
                                                            <React.Fragment>
                                                                <TableRow hover role="checkbox" tabIndex={-1} key={invoice._id}>
                                                                    <Row
                                                                        id={invoice._id}
                                                                        dueDate={invoice.dueDate}
                                                                        note={invoice.note}
                                                                        buyerId={invoice.buyer._id}
                                                                        buyerIdNum={invoice.buyer.identificationNumber}
                                                                        buyerName={invoice.buyer.name}
                                                                        sellerId={invoice.seller._id}
                                                                        sellerIdNum={invoice.seller.identificationNumber}
                                                                        sellerName={invoice.seller.name}
                                                                        setSelectedId={setSelectedId}
                                                                        setUnderPageState={setUnderPageState}
                                                                    ></Row>
                                                                    <TableCell>
                                                                        {dateStringFormatter(invoice.issued)}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {invoice.product}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {invoice.price}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {invoice.vat}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {invoice.invoiceNumber}
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
                                        count={invoices.length}
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
export default GetInvoices
