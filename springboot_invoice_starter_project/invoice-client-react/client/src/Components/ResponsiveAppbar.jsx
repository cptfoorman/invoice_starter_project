import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { MainNavigationStates, PeopleActionsState } from "../Utils/States";
import { FormControl, MenuItem, Select, AppBar, Paper } from "@mui/material";
import { returnedAppbarElement } from "../Utils/AppbarReturn";
import {dateStringFormatter} from "../Utils/dateStringFormatter";

// A base navbar that defines the main state of the app
export default function NavigationAppBar() {
  const [pageState, setPageState] = React.useState(MainNavigationStates[0]); // Default is HOME
  const [underpageState, setUnderPageState] = React.useState(PeopleActionsState[0])
  const [selectedId, setSelectedId] = React.useState(0); // Default selected ID

  const handleChange = (event) => {
    const newPage = MainNavigationStates.find((state) => state.value === event.target.value);
    setPageState(newPage); // Update with the new page object
    setUnderPageState(PeopleActionsState[0])
    setSelectedId(0)
  };
  React.useEffect(() => {
    if (selectedId !== 0) {
       selectedId
      
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