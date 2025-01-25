// ** Third Party Imports
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initiatePayout, verifyTranx } from 'src/store/apps/transactions'

// ** Demo Components Imports

const VerifyTransactions = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const { trx_ref, reference } = router.query

    const verfiyTrandx = data => {

          dispatch(verifyTranx({ ...data }))
  
      }
    
    useEffect(() => {
      if(reference){
        verfiyTrandx({ trx_ref, reference })

      }
    }, [reference, trx_ref])
    

return <Box></Box>
}



export default VerifyTransactions