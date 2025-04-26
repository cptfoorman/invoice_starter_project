import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { MainNavigationStates, PeopleActionsState } from "../Utils/States";
import { FormControl, MenuItem, Select, AppBar, Paper } from "@mui/material";
import { returnedAppbarElement } from "../Utils/AppbarReturn";

// A base navbar that defines the main state of the app
export default function NavigationAppBar() {
  const [pageState, setPageState] = React.useState(MainNavigationStates[0]); // Default is HOME
  const [underpageState, setUnderPageState] = React.useState(PeopleActionsState[0])
  const [selectedId, setSelectedId] = React.useState(0); // Default selected ID

  const handleChange = (event) => {
    const newPage = MainNavigationStates.find((state) => state.value === event.target.value);
    setPageState(newPage); // Update with the new page object
    setUnderPageState(PeopleActionsState[0])
  };
  React.useEffect(() => {
    if (selectedId !== 0) {
      setUnderPageState[underpageState[1]] // Console log the selected ID
    }
  }, [selectedId]);


  return (
    <>
      <Box sx={{ flexGrow: 1, width: "fit-content" }}>
        <AppBar fullWidth top="true" component="nav">
          <Toolbar>
            <FormControl fullWidth>
              <Select
                labelId="Pagestate"
                id="page-state-options"
                value={pageState.value} // Use the value property for Select
                onChange={handleChange}
              >
                {MainNavigationStates.map((state) => (
                  <MenuItem key={state.value} value={state.value}>
                    {state.label} {/* Show the label for dropdown options */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
        <Paper elevation={2} flexGrow="flexbox">
          {/* Pass pageState.value and other props */}
          {returnedAppbarElement({
            setPageState: setPageState,
            currentPage: pageState.value,
            setSelectedId: setSelectedId,
            selectedId: selectedId,
            setUnderPageState: setUnderPageState,
            currentAction: underpageState.value,
          })}
        </Paper>
      </Box>
    </>
  );
}


/*import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { MainNavigationStates } from '../Utils/States';
import { FormControl, MenuItem, Select, AppBar, Paper } from '@mui/material';
import { returnedAppbarElement } from '../Utils/AppbarReturn';
 
 
//a base navbar that defines the main state of the app
export default function NavigationAppBar() {
  const [pageState, setPageState] = React.useState(MainNavigationStates[0])
  const handleChange = (event) => {
    setPageState(event.target.value)
  }
  const [selectedId, setSelectedId] = React.useState(0)
 
  //when page state is set return statement modifies based on the index value of the state
 
  return (
    <>
      <Box sx={{ flexGrow: 1, width: "fit-content" }}>
        <AppBar fullWidth top="true" component="nav">
          <Toolbar>
            <FormControl fullWidth>
              <Select
                labelId="Pagestate"
                id="page-state-options"
                value={pageState}
                onChange={handleChange}
              >
                <MenuItem value={MainNavigationStates[0]}>Welcome</MenuItem>
                <MenuItem value={MainNavigationStates[1]}>People</MenuItem>
                <MenuItem value={MainNavigationStates[2]}>Invoices</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
        <Paper elevation={2} flexGrow="flexbox">
          {returnedAppbarElement(pageState.value, setSelectedId)}
        </Paper>
      </Box >
    </>
  );
}*/