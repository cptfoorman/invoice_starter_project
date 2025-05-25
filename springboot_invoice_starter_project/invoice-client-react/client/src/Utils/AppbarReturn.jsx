import { Typography } from "@mui/material";
import React from "react";
import GetPersons from "../Components/Persons/PersonDisplayGetAll";
import AddPerson from "../Components/Persons/AddPerson";
import EditPerson from "../Components/Persons/EditPerson";
import GetInvoices from "../Components/Invoices/InvoiceDisplayGetAll";
import PersonDetailsDisplay from "../Components/Persons/PersonDetail";
import AddInvoice from "../Components/Invoices/AddInvoice";
import EditInvoice from "../Components/Invoices/EditInvoice";
import SearchInvoice from "../Components/Invoices/SearchInvoices";
import RevenueChart from "../Components/Charts/RevenueChart";
import AllTimeChart from "../Components/Charts/AllTimeChart";


//returning appbar element to keep the context of the app and passing needed variables around the app

export function returnedAppbarElement(props) {
    const { currentPage, currentAction, setSelectedId, selectedId, setUnderPageState, setPageState } = props; // Destructure props for clarity

    let content;

    if (currentAction === "default") {
        // Default behavior: render the main elements
        switch (currentPage) {
            case "PEOPLE":
                content = (
                    <GetPersons
                        setSelectedId={setSelectedId}
                        selectedId={selectedId}
                        setUnderPageState={setUnderPageState}
                    />
                );
                break;

            case "INVOICES":
                content = (
                    <GetInvoices
                        setSelectedId={setSelectedId}
                        selectedId={selectedId}
                        setUnderPageState={setUnderPageState}></GetInvoices>
                );
                break;

            case "HOME":
                content = (
                    <Typography variant="h1" color="textPrimary">
                        Welcome to my database
                    </Typography>
                );
                break;
            case "ADDPERSON":
                content = (
                    <AddPerson setPageState={setPageState}></AddPerson>
                );
                break;
            case "ADDINVOICE":
                content = (
                    <AddInvoice setPageState={setPageState}></AddInvoice>
                );
                break;

            case "SEARCHINVOICE":
                content = (
                    <SearchInvoice
                        setPageState={setPageState}
                        setUnderPageState={setUnderPageState}
                        setSelectedId={setSelectedId}
                        ></SearchInvoice>
                );
                break;
            case "PEOPLESTATISTICS":
                content = (
                    <RevenueChart/>
                );
                break;
            case "ALLTIMESTATISTICS":
                content = (
                    <AllTimeChart/>
                );
                break;
            default:
                content = (
                    <Typography variant="h6" color="error">
                        Page not found
                    </Typography>
                );
                break;
        }
    } else {
        // Render underpage elements based on `currentAction`
        switch (currentAction) {
            case "PeopleView":
                content = (
                    <PersonDetailsDisplay id={selectedId}></PersonDetailsDisplay>
                );
                break;

            case "PeopleEdit":
                content = (
                    <EditPerson id={selectedId} setPageState={setPageState} setUnderPageState={setUnderPageState}>

                    </EditPerson>
                );
                break;

            case "InvoiceView":
                content = (
                    <Typography variant="h6" color="error">
                        Displaying invoice ID: {selectedId}
                    </Typography>
                );
                break;
            case "InvoiceEdit":
                content = (
                    <EditInvoice setPageState={setPageState} id={selectedId} setUnderPageState={setUnderPageState}>
                    </EditInvoice>
                );
                break;

            default:
                content = (
                    <Typography variant="h6" color="error">
                        Action not recognized
                    </Typography>
                );
                break;
        }
    }

    return <React.Fragment>{content}</React.Fragment>;
}




