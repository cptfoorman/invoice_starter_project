/*import { Typography } from "@mui/material";
import React from "react";
import GetPersons from "../Components/Persons/PersonDisplayGetAll";


//returns current appbar element to prevent DRY
export function returnedAppbarElement(props) {
        let content;

        switch (props){
            
            case "PEOPLE":
                content = <GetPersons setSelectedId={props.setSelectedId} ></GetPersons>
                break
            case "INVOICES":
                content = <div></div>
                break
            case "HOME":
                content =<Typography variant="h1" color="textPrimary">Welcome to my database</Typography>
                break;
            }
        return(
            <React.Fragment>
                {content}
            </React.Fragment>
        )
    }*/

import { Typography } from "@mui/material";
import React from "react";
import GetPersons from "../Components/Persons/PersonDisplayGetAll";


export function returnedAppbarElement(props) {
    const { currentPage, setSelectedId, selectedId } = props; // Destructure props for clarity

    let content;

    switch (currentPage) {
        case "PEOPLE":
            content = (
                <GetPersons
                    setSelectedId={setSelectedId}
                    selectedId={selectedId}
                />
            );
            break;

        case "INVOICES":
            content = (
                <Typography variant="h6" color="textSecondary">
                    Invoices Content
                </Typography>
            );
            break;

        case "HOME":
            content = (
                <Typography variant="h1" color="textPrimary">
                    Welcome to my database
                </Typography>
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

    return <React.Fragment>{content}</React.Fragment>;
}



