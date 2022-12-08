import { Button, Dialog, DialogTitle, TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { ApiOperations } from 'utilities/ApiOperations';

export const ProductDialog = (props) => {
    const { setOpen, selectedValue, open, fields, setProducts } = props;
    
    const [field, setField] = useState({})

    useEffect(() => {
        let fieldsObject = {}
        if(fields !== null){
            fields.forEach(field => {
                fieldsObject[field] = ''
            })
            setField(fieldsObject) 
        }
        console.log(fieldsObject)
    }, [fields])
    

    const handleOnChange = (e, title)=> {
        let newField = {...field}
        newField[title] = e.target.value
        setField(newField)
    }

    const handleSubmit = () => {
        new ApiOperations('POST').postRequest('/products/', field)
        .then(data=>setProducts(data))
        .catch(e=> alert('Input wrong format please try again'))
        setOpen(false)

    }
  
    return (
      <Dialog onClose={()=>{setOpen(false)}} open={open} fullWidth={true}>
        <DialogTitle>Add Product</DialogTitle>
        {fields?.map(title => {
            return (
                <TextField onChange={(e)=>handleOnChange(e, title)} style={{margin: '2vw'}} placeholder={title}/>
            )
        })}
        <Button onClick={()=> {handleSubmit()}}>Submit</Button>
      </Dialog>
    );
}
