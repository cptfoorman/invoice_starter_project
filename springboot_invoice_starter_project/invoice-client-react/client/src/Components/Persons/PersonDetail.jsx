import { Box, Paper, Stack, Typography } from "@mui/material"
import * as React from "react"
import { apiGet } from "../../Utils/apiGet"
import GetPurchasedInvoicesByIdNum from "../Invoices/InvoiceDisplayGetPurchasedByIdNum"


function PersonDetailsDisplay(props) {
    const { id, setPageState, setUnderPageState } = props
    const [person, setPerson] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [fullName, setFullName] = React.useState('')
    const [identificationNumber, setIdentificationNumber] = React.useState('')
    const [taxNumber, setTaxNumber] = React.useState('')
    const [accountNumber, setAccountNumber] = React.useState('')
    const [telephone, setTelephone] = React.useState('')
    const [bankCode, setBankCode] = React.useState('')
    const [iban, setIban] = React.useState('')
    const [mail, setMail] = React.useState("")
    const [street, setStreet] = React.useState("")
    const [zip, setZip] = React.useState("")
    const [city, setCity] = React.useState("")
    const [country, setCountry] = React.useState("")
    const [note, setNote] = React.useState("")


    //fetches user data
    React.useEffect(() => {
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

    //staggered page state for ensuring that theres data to map by the elements in the default return
    if (loading == true) {
        console.log("loading")
        return (
            <div>
                <Paper elevation={3}>
                    <Typography variant="h3" color="textPrimary">
                        Fetching Person {id}...
                    </Typography>
                </Paper>
            </div>
        )
    }

    return (
        <div>
            <Box>
                <Paper elevation={2} style={{ margin: "15px", padding: "15px", textAlign: "center" }}>
                    <Typography variant="h3" color="textPrimary">
                        Displaying Person ID:{id}
                    </Typography>
                </Paper>
                <Paper elevation={3}>
                    <Stack
                        direction={{ sm: 'row', md: 'column' }}
                        spacing={"2"}
                        useFlexGap
                        sx={{ flexWrap: 'wrap', alignItems: "left", minWidth: "180px" }}>
                        <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={id}>
                            Id:{id}<br />
                            Name:{name}<br />
                            identification Number: {identificationNumber}<br />
                            Street: {street}<br />
                            City: {city}<br />
                            country: {country}<br />
                            Email: {mail}<br />
                            zip: {zip}<br />
                            Phone Number: {telephone}<br />
                            tax Number: {taxNumber}<br />
                            bank code: {bankCode}<br />
                            account number: {accountNumber}<br />
                            iban: {iban}<br />
                        </Paper>
                        <Paper>
                            <GetPurchasedInvoicesByIdNum idNum={identificationNumber} isPurchases={true}></GetPurchasedInvoicesByIdNum>
                        </Paper>
                        <Paper>
                        <GetPurchasedInvoicesByIdNum idNum={identificationNumber} isPurchases={false}></GetPurchasedInvoicesByIdNum>
                        </Paper>
                    </Stack>
                </Paper>
            </Box>
        </div>
    )
}
export default PersonDetailsDisplay