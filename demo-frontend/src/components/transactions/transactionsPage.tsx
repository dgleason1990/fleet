import { Button, Input, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TableContainer, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ApiOperations } from 'utilities/ApiOperations'
import { Chart } from 'react-charts'
import { useNavigate } from 'react-router-dom'

export const TransactionsPage = () => {
    let navigate = useNavigate()
    const [provider, setProvider] = useState('')
    const [transactions, setTransactions] = useState([])
    const [spending, setSpending] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [trigger,setTrigger] = useState(false)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };
    useEffect(()=>{
        new ApiOperations('GET').getRequest(`/transactions/?provider=${provider}`).then(data=> {setTransactions(data.transactions);setSpending(data.spending) })
    }, [trigger])

    const axes = React.useMemo(
        () => [
          { primary: true, type: 'linear', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ],
        []
      )
    const addFlag = (id) => {
        const reason = prompt('Please enter your reason for flagging transaction number ' + id)
        new ApiOperations('POST').postRequest('/flagged-transaction', {reason, id}).then(data => {if (data === 200){setTrigger(!trigger)}
    })
    }
  return (
    <Container style={{display:'flex', flexDirection:'column', justifyContent:'center', width: '80vw'}} maxWidth='lg'>
        <Button onClick={() => navigate('/')}> Home Page </Button>
        <div>Transcations Page</div>
        <Input placeholder='Enter Provider' onChange={(e)=> setProvider(e.target.value)}/>
        <Button onClick={()=>{
            new ApiOperations('GET').getRequest(`/transactions/?provider=${provider}`).then(data=> {setTransactions(data.transactions);setSpending(data.spending)})
        }}>Search Provider</Button>
        <div
        style={{
            height: '20vw'
        }}
        >
        <Chart data={[{label:'Spending', data: spending}]} axes={axes} />
      </div>
      <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                {transactions.length > 0 && Object.keys(transactions[0]).map(title => {
                    return <TableCell> {title} </TableCell>
                })}
                </TableRow>
            </TableHead>
            <TableBody>
                {transactions.length > 0 &&                 
                transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(transaction => {
                    return <TableRow>{Object.keys(transactions[0]).map(title => {
                        return <TableCell>
                            {transaction[title]}
                        </TableCell> 
                    })} 
                    <TableCell >
                        <Button onClick={()=>{addFlag(transaction['id'])}}> Flag Transaction </Button>
                    </TableCell>
                        </TableRow>
                })}
            </TableBody>
        </Table>
    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Container>
  )
}

