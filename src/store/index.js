// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
// import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import cards from 'src/store/apps/cards'
import provider from 'src/store/apps/providers'
import banks from 'src/store/apps/banks'
import transactions from 'src/store/apps/transactions'
import beneficiaries from 'src/store/apps/beneficiary'
import wallets from 'src/store/apps/wallet'

export const store = configureStore({
  reducer: {
    user,
    provider,
    banks,
    cards,
    transactions,
    beneficiaries,
    wallets
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
