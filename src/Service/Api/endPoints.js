export const loginUserUrl = () => {
  return `/auth/login`
}

export const createUserUrl = () => {
  return `/users`
}

export const getUserDetailsUrl = id => {
  return `/users/${id}`
}

export const getAllUsersUrl = query => {
  return `/users?page=${query.page}&limit=${query.limit}&orderBy=${query.orderBy}&sort=${query.sort}`
}

export const toggleUserUrl = body => {
  return `/users/${body.id}/status/${body.toggle}`
}

export const blacklistUserUrl = id => {
  return `/users/${id}/blacklist`
}

export const createProviderUrl = () => {
  return `/provider`
}

export const getProviderDetailsUrl = id => {
  return `/provider/${id}`
}

export const getAlProvidersUrl = query => {
  return `/provider?page=${query.page}&limit=${query.limit}&orderBy=${query.sortBy}&sort=${query.sort}`
}

export const toggleActiveProviderUrl = id => {
  return `/provider/${id}/toggleStatus`
}

export const setDefaultProviderUrl = id => {
  return `/provider/${id}/setDefault`
}

export const getCreateWalletUrl = () => {
  return `/wallet`
}

export const getAllWalletsUrl = query => {
  return `/wallet?all=${query.all}&page=${query.page}&limit=${query.limit}&orderBy=${query.orderBy}&sort=${query.sort}`
}

export const getWalletDetailsUrl = id => {
  return `/wallet/${id}`
}

export const getFundWalletUrl = id => {
  return `/wallet/${id}/fund`
}

export const getAllBankcodesUrl = query => {
  return `/bankcode?all=true&page=${query.page}&limit=${query.limit}&orderBy=${query.orderBy}&sort=${query.sort}`
}

export const getBankCodeDetailsUrl = id => {
  return `/bankcodes/${id}`
}

export const getValidateAccountUrl = () => {
  return `/transactions/nameEnquiry`
}

export const getVerifyTransactionUrl = (query) => {
  return `/payments/verify?trxref=${query.reference}&reference=${query.reference}`

}

export const getInitiatePayoutUrl = () => {
  return `/payments/init`
}

export const getChargeCardUrl = () => {
  return '/payments/charge'
}


export const getAddBeneficiaryURl = () => {
  return '/beneficiaries/'
}

export const getAllBeneficiariesUrl = ({ all, page, limit, sort, orderBy }) => {
  return `/beneficiaries?all=${all}&page=${page}&limit=${limit}&orderBy=${orderBy}&sort${sort}`
}

export const getAllTransactionUrl = query => {
  return `/transactions?page=${query.page}&all=${query.all}&limit=${query.limit}&orderBy=${query.orderBy}&sort=${query.sort.toLowerCase()}`
}

export const getCardsUrl = () => {
  return '/users/cards'
}

export const getTransactionDetailsUrl = id => {
  return `/transactions/${id}/`
}

export const getUserTransactionsUrl = query => {
  return `/transactions/${query.id}/user?page=${query.page}&all=${query.all}&limit=${query.limit}&orderBy=${query.orderBy}&sort=${query.sort}`
}
