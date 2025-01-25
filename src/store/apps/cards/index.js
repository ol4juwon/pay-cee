import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import { TransactionService } from 'src/Service/Api/services'
import Config from 'src/configs/app'



/**Fetch Cardss */
export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async ({ all=true, sort = 'desc', orderBy = 'createdAt', page = 1, limit = 10 }) => {
    try {
      const response = await TransactionService.getCards({ all, page, limit, orderBy, sort })
      
return response
    } catch (error) {
      toast.error(error?.message || "couldn't fetch cards")

      throw new Error('An Error occured ')
    }
  }
)


export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    cards: [],
    total: 0,
    params: { all: true, sort: 'DESC', orderBy: 'active', page: 1, limit: 10 },
    error: null,
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCards.pending, state => {
        state.loading = true
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false
        state.cards = action.payload.data
        state.total = action.payload.length || action.payload.data
        state.params = action.payload.params
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

  }
})

export default cardsSlice.reducer
