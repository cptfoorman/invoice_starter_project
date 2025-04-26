import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { Button, Container, Paper, MenuItem, Select } from '@mui/material';
import { MainNavigationStates } from '../../Utils/States';
import { validateEmail, validatePhoneNumber } from '../../Utils/validation';
//controlled form for adding a new user to which we can then add new policies
//to create a feedback loop i implemented add new user button when the form is confirmed
export default function AddPerson(props) {
  const { setPageState } = props
  const [fullName, setfullName] = useState('')
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



  //resets user input for new user
  const handleNewInput = e => {
    e.preventDefault()
    setfullName('')
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
    setType("")
    setErrors("")
    setProcessing("idle")
  }


  //checks for errors if no found sends data
  const handleClick = e => {
    e.preventDefault()
    const newErrors = {}
    if (!validateEmail(mail)) {
      newErrors.mail = "Invalid email adress"
    }
    if (!validatePhoneNumber(telephone)) {
      newErrors.telephone = "Invalid phone number"
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      console.log(errors)
    } else {
      setPageState(MainNavigationStates[0])
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
      fetch('http://localhost:8080/api/person', {
        method: "POST",
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
            <TextField id="fullName" label="fullName" variant="standard" value={fullName} onChange={(e) => setfullName(e.target.value)} />
            <TextField id="identificationNumber" label="identificationNumber" variant="standard" value={identificationNumber} onChange={(e) => setIdentificationNumber(e.target.value)} />
            <TextField id="taxNumber" label="taxNumber" variant="standard" inputMode='tel' value={taxNumber} onChange={(e) => setTaxNumber(e.target.value)} />
            <TextField id="accountNumber" label="accountNumber Code" variant="standard" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
            <TextField id="telephone" label="telephone" variant="standard" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
            <TextField id="bankCode" label="bank Code" variant="standard" value={bankCode} onChange={(e) => setBankCode(e.target.value)} />
            <TextField id="iban" label="iban" variant="standard" value={iban} onChange={(e) => setIban(e.target.value)} />
            <TextField id="mail" label="mail" variant="standard" value={mail} onChange={(e) => setMail(e.target.value)} />
            <TextField id="street" label="street" variant="standard" value={street} onChange={(e) => setStreet(e.target.value)} />
            <TextField id="zip" label="zip" variant="standard" value={zip} onChange={(e) => setZip(e.target.value)} />
            <TextField id="city" label="City" variant="standard" value={city} onChange={(e) => setCity(e.target.value)} />
            <TextField id="country" label="country" variant="standard" value={country} onChange={(e) => setCountry(e.target.value)} />
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
/*
setName('')
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
  */
