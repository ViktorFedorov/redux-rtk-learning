const initStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false
}

const accountReducer = (state = initStateAccount, action) => {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        isLoading: false,
        balance: state.balance + action.payload
      }
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload
      }
    case 'account/loanRequest':
      if (state.loan > 0) return state
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose
      }
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan
      }
    case 'account/loadingRate':
      return {
        ...state,
        isLoading: true
      }
    default:
      return state
  }
}

const deposit = (amount, currency) => {
  if (currency === 'USD')
    return {
      type: 'account/deposit',
      payload: amount
    }

  return async function (dispatch, getState) {
    dispatch({ type: 'account/loadingRate' })

    const host = 'api.frankfurter.app'

    try {
      const res = await fetch(
        `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
      )
      if (!res.ok) throw new Error('Something went wrong...')
      const data = await res.json()
      const converted = data.rates.USD
      dispatch({ type: 'account/deposit', payload: converted })
    } catch (err) {
      console.log(err)
    }
  }
}

const withdraw = (payload) => ({ type: 'account/withdraw', payload })
const requestLoan = (amount, purpose) => ({
  type: 'account/loanRequest',
  payload: { amount, purpose }
})
const payLoan = () => ({ type: 'account/payLoan' })

export { deposit, withdraw, requestLoan, payLoan, accountReducer }
