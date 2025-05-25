import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { InputLabel, Button, Container, Paper, MenuItem, Select } from '@mui/material';
import { MainNavigationStates } from '../../Utils/States';
import { validateEmail, validatePhoneNumber } from '../../Utils/validation';
import dateStringFormatter from '../../Utils/dateStringFormatter';
import { apiGet } from '../../Utils/apiGet';
import dayjs from "dayjs"
import { DateField } from '@mui/x-date-pickers/DateField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PeopleActionsState } from '../../Utils/States';

//controlled form for adding a new user to which we can then add new policies
//to create a feedback loop i implemented add new user button when the form is confirmed
export default function EditInvoice(props) {
    const { setPageState, id, setUnderPageState } = props
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [sellerId, setSellerId] = useState('')
    const [buyerId, setBuyerId] = useState('')
    const [issued, setIssued] = useState(dayjs('2022-04-17'))
    const [dueDate, setDueDate] = useState(dayjs('2022-04-17'))
    const [product, setProduct] = useState('')
    const [price, setPrice] = useState('')
    const [vat, setVat] = useState("")
    const [note, setNote] = useState("")
    const [persons, setPersons] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({});

    const handleBuyerIdChange = (event) => {
        setBuyerId(event.target.value);
    };
    const handleSellerIdChange = (event) => {
        setSellerId(event.target.value);
    };

    //resets user input for new user
    const handleNewInput = e => {
        e.preventDefault()
        setInvoiceNumber = useState('')
        setSellerId = useState('')
        setBuyerId = useState('')
        setIssued = useState('')
        setDueDate = useState('')
        setProduct = useState('')
        setPrice = useState('')
        setVat = useState("")
        setNote = useState("")
        setProcessing("")
        setType("")
        setErrors("")
        setProcessing("idle")
    }
    //fetches all user data
    useEffect(() => {
        
        async function fetchInvoice() {
            try {
                setLoading(true); // Start loading
                const peopleData = await apiGet("http://localhost:8080/api/persons")
                setPersons(peopleData)
                const data = await apiGet(`http://localhost:8080/api/invoice/${id}`);
                setInvoiceNumber(data.invoiceNumber)
                setSellerId(data.seller._id)
                setBuyerId(data.buyer._id)
                setIssued(dayjs(data.issued))
                setDueDate(dayjs(data.dueDate))
                setProduct(data.product)
                setPrice(data.price)
                setVat (data.vat)
                setNote(data.note)
                console.log("Fetched data:", data);
            } catch (error) {
                console.error("Error fetching person data:", error);
                setErrors({ fetch: "Failed to fetch invoice data" });
            } finally {
                setLoading(false); // End loading
            }
        }

        if (id) {
            fetchInvoice();
        }
    }, [id])

    //checks for errors if no found sends data
    const handleClick = e => {
        e.preventDefault()
        setPageState(MainNavigationStates[0])
        setUnderPageState(PeopleActionsState[0])
        console.log("no errors")
        const jsonData = {
            invoiceNumber: invoiceNumber,
            seller: {
                _id: sellerId
            },
            buyer: {
                _id: buyerId
            },
            issued: dateStringFormatter(issued),
            dueDate: dateStringFormatter(dueDate),
            product: product,
            price: price,
            vat: vat,
            note: note
        }
        console.log(jsonData);
        fetch(`http://localhost:8080/api/invoice/${id}`, {
            method: "PUT",
            headers: { "Content-type": "application/JSON" },
            body: JSON.stringify(jsonData)
        }
        )
    }
    return (
        <div>
            <Container>
                <Paper>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="invoiceNumber" label="invoice number" variant="standard" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
                        <TextField id="product" label="product" variant="standard" value={product} onChange={(e) => setProduct(e.target.value)} /><br />
                        <TextField
                            id="price"
                            label="Price"
                            type="number"
                            variant="standard"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            value={price} onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField id="vat" label="vat" variant="standard" value={vat} onChange={(e) => setVat(e.target.value)} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateField
                                label="Controlled field"
                                format="YYYY-MM-DD"
                                value={issued}
                                onChange={(newValue) => setIssued(newValue)}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateField
                                label="Controlled field"
                                format="YYYY-MM-DD"
                                value={dueDate}
                                onChange={(newValue) => setDueDate(newValue)}
                            />
                        </LocalizationProvider>
                        <TextField id="note" label="note" variant="standard" value={note} onChange={(e) => setNote(e.target.value)} /><br />
                        <InputLabel id="buyer-select-helper-label">Buyer</InputLabel>
                        <TextField id="buyerId" label="buyerId" variant="standard" value={buyerId} disabled="true" onChange={(e) => setBuyerId(e.target.value)} />
                        <Select
                            labelId="select-buyerId"
                            id="select-buyerId"
                            value={buyerId}
                            onChange={handleBuyerIdChange}
                            autoWidth
                            label="Buyer">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {persons.map(person => {
                                return (
                                    <MenuItem value={person._id} key={person._id}>
                                        {person._id}. {person.name}
                                    </MenuItem>)
                            }

                            )}

                        </Select>
                        <InputLabel id="seller-select-helper-label">Seler</InputLabel>
                        <TextField id="sellerId" label="sellerId" variant="standard" value={sellerId} disabled="true" onChange={(e) => setSellerId(e.target.value)} />
                        <Select
                            labelId="select-sellerId"
                            id="select-selelrId"
                            value={sellerId}
                            onChange={handleSellerIdChange}
                            autoWidth
                            label="Seller">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {persons.map(person => {
                                return (
                                    <MenuItem value={person._id} key={person._id}>
                                        {person._id}. {person.name}
                                    </MenuItem>)
                            }

                            )}

                        </Select><br />
                        <Button
                            onClick={handleClick}
                        >
                            Submit
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </div>
    )
}