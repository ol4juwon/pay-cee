import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import { ProviderService, TransactionService } from 'src/Service/Api/services'
import Config from 'src/configs/app'


// ** Fetch Users
export const fetchTransations = createAsyncThunk(
  'transactions/fetch',
  async ({ all=true, sort = 'desc', orderBy = 'createdAt', page = 1, limit = 10 }) => {
    try {
      const response = await TransactionService.getAllTransactions({ all, page, limit, orderBy, sort })

      return response
    } catch (error) {
      toast.error(error.message)

      throw new Error('An Error occured ')
    }
  }
)



export const fetchUserTransations = createAsyncThunk(
  'transactions/user/fetch',
  async (userId, { all, sort = 'DESC', orderBy = 'createdAt', page = 1, limit = 10 }) => {
    try {
      const response = await TransactionService.getUserTransactions({ id: userId, all, page, limit, orderBy, sort })

      return response
    } catch (error) {
      toast.error(error.message)

      throw new Error('An Error occured ')
    }
  }
)

// ** Initiate Payout
export const initiatePayout = createAsyncThunk(
  'Transactions/initiatePayout',
  async ({ amount, narration }, { getState, dispatch }) => {
    try {

      const payload = {
        amount,
        channel: "card",
        callback_url: Config.BASE_URL + "/verify/",
        meta: {
          amount,
          reason: narration
        }
      }
      console.log({ payload })
      const response = await TransactionService.initiatePayouts(payload)
      if (response.data) {
        toast.success('Transaction initiated, redirecting to paystack now!')
        window.location.replace(response.data.authorization_url)
      }
      if (response.error) toast.error('Payout failed')
    } catch (error) {
      console.log({ error })
      toast.error(error.message)

      return error
    }
  }
)

export const chargeCard = createAsyncThunk(
  'Transactions/chargeCard',
  async ({ amount, cardId, narration }, { getState, dispatch }) => {
    try {
      const payload = {
        cardId,
        amount,
        reason: narration
      }
      const response = await TransactionService.chargeCard(payload)
      if (response.data) toast.success('Card charged')

      if (response.error) toast.error('Payout failed')
    } catch (error) {
      toast.error(error.error)

      return error
    }
  }
)

export const verifyTranx = createAsyncThunk(
  'Transactions/verifyTransaction',
  async ({ trxref, reference }, { getState, dispatch }) => {
    try {
      const payload = {
        trxref, reference
      }
      const response = await TransactionService.verifyTransaction(payload)
      if (response.data) {
        toast.success('Payment successfull')
        window.location.href = "/home"
      }
      if (response.error) toast.error('Payout failed')
    } catch (error) {
      toast.error(error.message)
 window.location.href = "/home"
      
return error
    }
  }
)

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    total: 0,
    params: { all: true, sort: 'DESC', orderBy: 'active', page: 1, limit: 10 },
    error: null,
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTransations.pending, state => {
        state.loading = true
      })
      .addCase(fetchTransations.fulfilled, (state, action) => {
        state.loading = false
        state.transactions = action.payload.data?.data || action.payload.data
        state.total = action.payload.length
        state.params = action.payload.params
      })
      .addCase(fetchTransations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchUserTransations.pending, state => {
        state.loading = true
      })
      .addCase(fetchUserTransations.fulfilled, (state, action) => {
        state.loading = false
        state.transactions = action.payload.data
        state.total = action.payload.length
        state.params = action.payload.params
      })
      .addCase(fetchUserTransations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(initiatePayout.pending, state => {
        state.loading = true
      })
      .addCase(initiatePayout.fulfilled, (state, action) => {
        state.loading = false

        // state.transactions = [...state.transactions, action.payload]
        // state.total = [...state.transactions, action.payload].length
      })
      .addCase(initiatePayout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default transactionsSlice.reducer
