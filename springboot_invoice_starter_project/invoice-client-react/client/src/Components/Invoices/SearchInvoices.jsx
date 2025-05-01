


import { Box, Button, Container, MenuItem, Paper, Select, TextField } from "@mui/material";
import * as React from "react";
import { apiGet } from "../../Utils/apiGet";
import SearchIcon from '@mui/icons-material/Search';
import GetFilteredInvoices from "./InvoiceDisplayFiltered";

/*buyerID
sellerID
product
minPrice
maxPrice
limit */
export default function SearchInvoice(props) {
    const { setSelectedId,setPageState, setUnderPageState } = props
    const [buyerId, setBuyerId] = React.useState("");
    const [sellerId, setSellerId] = React.useState("");
    const [product, setProduct] = React.useState("");
    const [minPrice, setMinPrice] = React.useState("");
    const [maxPrice, setMaxPrice] = React.useState("");
    const [limit, setLimit] = React.useState("");
    const [isSearching, setIsSearching] = React.useState(false);

    const [persons, setPersons] = React.useState([]);
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [searchUrl, setSearchUrl] = React.useState("");

    const fetchInvoices = async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (buyerId) params.append("buyerId", buyerId);
        if (sellerId) params.append("sellerId", sellerId);
        if (product) params.append("product", product);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (limit) params.append("limit", limit);

        const apiUrl = `http://localhost:8080/api/invoice/getAll?${params.toString()}`;
        setSearchUrl(apiUrl);
        console.log(apiUrl);

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setResults(data);
            setSearchUrl(apiUrl)
            console.log("send data invoice"+data);
            console.log(apiUrl)
            setIsSearching(true)
        } catch (error) {
            console.error("Error fetching invoices:", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        async function fetchPersons() {
            setLoading(true);
            try {
                const data = await apiGet("http://localhost:8080/api/persons");
                console.log("sent data", data);
                setPersons(data);
            } catch (error) {
                console.error("Error fetching persons:", error);
            } finally {
                setLoading(false);
            }
        }

        if (persons.length === 0) {
            fetchPersons();
        }
    }, []); // Run only once on mount

    const handleBuyerIdChange = (event) => {
        setBuyerId(event.target.value);
    };
    const handleSellerIdChange = (event) => {
        setSellerId(event.target.value);
    };
    if (isSearching){
        return(
            <GetFilteredInvoices
            setUnderPageState = {setUnderPageState}
            setPageState = {setPageState}
            filterUrl = {searchUrl}
            setIsSearching={setIsSearching}
            setSelectedId={setSelectedId}
            ></GetFilteredInvoices>
        )
    }
    return (
        <React.Fragment>
            <Container>
                <Paper>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                    >

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

                        </Select><br />
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
                        <TextField
                            id="minPrice"
                            label="minPrice"
                            type="number"
                            variant="standard"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <TextField
                            id="maxPrice"
                            label="minPrice"
                            type="number"
                            variant="standard"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <TextField
                            id="limit"
                            label="search limit"
                            type="number"
                            variant="standard"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            value={limit} onChange={(e) => setLimit(e.target.value)}
                        />
                        <Button onClick={fetchInvoices}>
                            Search
                            <SearchIcon>
                            </SearchIcon>
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </React.Fragment>

    )
}