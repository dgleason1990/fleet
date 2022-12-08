import { Button, Card, CardContent, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ApiOperations } from 'utilities/ApiOperations'
import dummyProducts from './dummyProducts'
import { ProductDialog } from './productDialog'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'

export const ProductPage = () => {
    let navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false);
    const [availableColumns, setAvailableColumns] = useState(null)

    const deleteItem = (id) => {
        new ApiOperations('DELETE').deleteRequest(`/products/?id=${id.join('&')}`).then(data=>{
            setProducts(data.products)
        })
    }
    useEffect(() => {
        new ApiOperations('GET').getRequest('/products/').then(data=>{setProducts(data.products); setAvailableColumns(data.available_columns)})
    }, [])

  return (
    <Container style={{display:'flex', flexDirection:'column', justifyContent:'center', width: '80vw'}} maxWidth='lg'>
        <Button onClick={() => navigate('/')}> Home Page </Button>
         <div>Products Page</div>
         <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
         
         {products.length > 0 && products.map(product => <Card variant="elevation" style={{ maxWidth: '50vw', marginTop: '2vw' }}> 
                <CardContent style={{display: 'flex', flexDirection: 'column'}}> {
                    Object.keys(products[0]).map(title => {
                        if(title === 'icon_url'){
                            return <img style={{maxWidth: '80px', maxHeight:'80px'}}src={product[title]}/>
                        } 
                        if (title === 'id') {
                            return
                        }
                        return <Typography> 
                            {title}: {Array.isArray(product[title]) ? product[title].join('|') : product[title]}
                        </Typography>})}
                    <Button onClick={()=>{deleteItem(product['id'])}} variant="outlined" style={{alignSelf: 'flex-end'}} startIcon={<DeleteIcon />}>
                        Delete
                    </Button>

                </CardContent>
            </Card>)}
            <ProductDialog 
                setOpen={setOpen}
                open={open} 
                fields={availableColumns}
                setProducts={setProducts}
            />
        </div>
        <Button variant="contained" style={{position: 'fixed', zIndex: 999, bottom: 10, right: 10}} onClick={()=>{
            setOpen(true);
        }} component="label">
            Create new product
        </Button>
        </Container>    
  )
}
