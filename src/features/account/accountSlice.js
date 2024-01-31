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

      state.balance += action.payload.loanAmount
      state.loan = action.payload.loanAmount
      state.loanPurpose = action.payload.loanPurpose
    },
    payLoan(state, action) {
      state.balance -= state.loan
      state.loan = 0
      state.loanPurpose = ''
    },
    loadingRate(state) {
      state.isLoading = true
    }
  }
})

const deposit = (amount, currency) => {
  if (currency === 'USD')
    return {
      type: 'account/deposit',
      payload: amount
    }

  return async (dispatch) => {
    dispatch({ type: 'account/loadingRate' })

    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      )
      // console.log(res)
      // if (!res.ok) throw new Error('ERROR!!!')
      const data = await res.json()
      const converted = data.rates.USD

      dispatch({ type: 'account/deposit', payload: converted })
    } catch (err) {
      console.log(err)
    }
  }
}

export const { withdraw, requestLoan, payLoan, loadingRate } =
  accountSlice.actions

export { deposit }

export default accountSlice.reducer
