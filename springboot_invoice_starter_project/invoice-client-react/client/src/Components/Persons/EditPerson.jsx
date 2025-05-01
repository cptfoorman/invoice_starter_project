import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { Button, Container, Paper, MenuItem, Select, Typography } from '@mui/material';
import { MainNavigationStates, PeopleActionsState } from '../../Utils/States';
import { validateEmail, validateName, validatePhoneNumber } from '../../Utils/validation';
import { apiGet } from '../../Utils/apiGet';
import { CountrySelectState } from '../../Utils/CountryStates';
//controlled form for adding a new user to which we can then add new policies
//to create a feedback loop i implemented add new user button when the form is confirmed
export default function EditPerson(props) {
    const { setPageState, id, setUnderPageState } = props
    const [fullName, setFullName] = useState('')
    const [identificationNumber, setIdentificationNumber] = useState('')
    const [taxNumber, setTaxNumber] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [telephone, setTelephone] = useState('')
    const [bankCode, setBankCode] = useState('')
    const [iban, setIban] = useState('')
    const [mail, setMail] = useState("")
    const [street, setStreet] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [note, setNote] = useState("")
    const [processing, setProcessing] = useState("idle")
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true)
    const [dataready, setDataready] = useState(false)
    const [url, setUrl] = React.useState("http://localhost:8080/insurancePolicies/update/")


    useEffect(() => {
        async function fetchPerson() {
            try {
                setLoading(true); // Start loading
                const data = await apiGet(`http://localhost:8080/api/persons/${id}`);
                setFullName(data.name);
                setAccountNumber(data.accountNumber);
                setBankCode(data.bankCode);
                setCity(data.city);
                setCountry(data.country);
                setIban(data.iban);
                setMail(data.mail);
                setZip(data.zip);
                setNote(data.note);
                setTelephone(data.telephone);
                setStreet(data.street);
                setIdentificationNumber(data.identificationNumber);
                setTaxNumber(data.taxNumber);
                console.log("Fetched data:", data);
            } catch (error) {
                console.error("Error fetching person data:", error);
                setErrors({ fetch: "Failed to fetch person data" });
            } finally {
                setLoading(false); // End loading
            }
        }

        if (id) {
            fetchPerson();
        }
    }, [id]); // Only re-run the effect when `id` changes

    if (loading) {
        return (
            <div>
                <Paper elevation={3}>
                    <Typography variant="h3" color="textPrimary">
                        Fetching User Data...
                    </Typography>
                </Paper>
            </div>
        );
    }
    //handling for changing a country
    const handleChange = (event) => {
        setCountry(event.target.value)
        console.log(country)
    }

    //resets user input for new user
    const handleNewInput = e => {
        e.preventDefault()
        setFullName('')
        setIdentificationNumber('')
        setTaxNumber('')
        setAccountNumber('')
        setTelephone('')
        setBankCode('')
        setIban('')
        setMail("")
        setStreet("")
        setZip("")
        setCity("")
        setCountry("")
        setNote("")
        setProcessing("")
        setErrors("")
        setProcessing("idle")
    }


    //checks for errors if no found sends data
    const handleClick = e => {
        e.preventDefault()
        const newErrors = {}
        if (!validateEmail(mail)) {
            newErrors.email = "Invalid email adress"
        }
        if (!validatePhoneNumber(telephone)) {
            newErrors.phoneNumber = "Invalid phone number"
            console.log(telephone)
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            console.log(errors)
        } else {
            setPageState(MainNavigationStates[0])
            setUnderPageState(PeopleActionsState[0])
            console.log("no errors")
            const jsonData = {
                name: fullName,
                identificationNumber: identificationNumber,
                taxNumber: taxNumber,
                accountNumber: accountNumber,
                telephone: telephone,
                bankCode: bankCode,
                iban: iban,
                mail: mail,
                street: street,
                zip: zip,
                city: city,
                country: country,
                note: note,
            };
            fetch('http://localhost:8080/api/persons/' + id, {
                method: "PUT",
                headers: { "Content-type": "application/JSON" },
                body: JSON.stringify(jsonData)
            })
        }
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
                        <TextField id="fullName" label="fullName" variant="standard" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <TextField id="identificationNumber" label="identificationNumber" variant="standard" value={identificationNumber} disabled="true" onChange={(e) => setIdentificationNumber(e.target.value)} />
                        <TextField id="taxNumber" label="taxNumber" variant="standard" inputMode='tel' value={taxNumber} onChange={(e) => setTaxNumber(e.target.value)} />
                        <TextField id="accountNumber" label="accountNumber Code" variant="standard" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                        <TextField id="telephone" label="telephone" variant="standard" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        <TextField id="bankCode" label="bank Code" variant="standard" value={bankCode} onChange={(e) => setBankCode(e.target.value)} />
                        <TextField id="iban" label="iban" variant="standard" value={iban} onChange={(e) => setIban(e.target.value)} />
                        <TextField id="mail" label="mail" variant="standard" value={mail} onChange={(e) => setMail(e.target.value)} />
                        <TextField id="street" label="street" variant="standard" value={street} onChange={(e) => setStreet(e.target.value)} />
                        <TextField id="zip" label="zip" variant="standard" value={zip} onChange={(e) => setZip(e.target.value)} />
                        <TextField id="city" label="City" variant="standard" value={city} onChange={(e) => setCity(e.target.value)} />
                        <Select
                            labelId="country-select-label"
                            id="country-select"
                            value={country}
                            onChange={handleChange}
                        >
                            <MenuItem value={CountrySelectState[0].value}>{CountrySelectState[0].label}</MenuItem>
                            <MenuItem value={CountrySelectState[1].value}>{CountrySelectState[1].label}</MenuItem>
                        </Select>
                        <TextField id="note" label="note" variant="standard" value={note} onChange={(e) => setNote(e.target.value)} />
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