import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
//delete button for deleting an Invoice needs the corresponding Invoice id
export default function InvoiceDeleteButton({id}) {
    const [url,setUrl] = React.useState("http://localhost:8080/api/invoice/"+id)
    const [processing, setProcessing] = React.useState("idle")
    const handleClick = e => {
        e.preventDefault()
        setProcessing("processing")
        fetch (url,{
            method: "DELETE",
          })
        setProcessing("deleted")
        console.log("deleted")
        }
    if (processing == "processing"){
        return (
            <Stack spacing={2} direction="column">
              <Button variant="contained" color='danger'disabled={true}>Deleting invoice</Button>
            </Stack>
          );
    }
    if (processing == "deleted"){
        return (
            <Stack spacing={2} direction="column">
              <Button variant="contained" color='danger' disabled={true}>invoice Deleted</Button>
            </Stack>
          );
    }
  return (
    <Stack spacing={2} direction="column">
      <Button variant="contained" color='warning' onClick={handleClick}>Delete invoice</Button>
    </Stack>
  );
}