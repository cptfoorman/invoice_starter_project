import { useState } from 'react'
import './App.css'
import { Box, Container, CssBaseline, Paper } from '@mui/material'
import NavigationAppBar from './Components/ResponsiveAppbar'
function App() {


  return (
    <>
      <Container>
        <CssBaseline/>
        <Box sx={{ bgcolor: '#cfe8fc', height: 'max-content', width:'fit-content'}}>
          <Paper elevation={0} variant={"elevation"}>
            <NavigationAppBar></NavigationAppBar>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default App
