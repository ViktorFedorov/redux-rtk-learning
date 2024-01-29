import { applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { combineReducers, createStore } from 'redux'
import {
  deposit,
  withdraw,
  requestLoan,
  payLoan,
  accountReducer
} from './features/account/accountSlice'
import {
  createCustomer,
  updateName,
  customerReducer
} from './features/customer/customerSlice'

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
