import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.isLoading = false
      state.balance += action.payload
    },
    withdraw(state, action) {
      state.balance -= action.payload
    },
    requestLoan(state, action) {
      if (state.loan > 0) return

      state.balance += action.payload.amount
      state.loan = action.payload.amount
      state.loanPurpose = action.payload.loanPurpose
    },
    payLoan(state, action) {
      state.loan = 0
      state.loanPurpose = ''
      state.balance -= state.loan
    },
    loadingRate(state, action) {
      state.isLoading = true
    }
  }
})

export const { deposit, withdraw, requestLoan, payLoan, loadingRate } =
  accountSlice.actions

export default accountSlice.reducer
