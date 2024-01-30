import { createSlice } from '@reduxjs/toolkit'

const initState = {
  fullName: '',
  nationalID: '',
  createdAt: ''
}

const customerSlice = createSlice({
  name: 'customer',
  initialState: initState,
  reducers: {
    createCustomer(state, action) {
      state.fullName = action.payload.fullName
      state.nationalID = action.payload.nationalID
      // state.createdAt = action.payload.createdAt
    },
    updateName(state, action) {
      state.fullName = action.payload
    }
  }
})

export default customerSlice.reducer
export const { createCustomer, updateName } = customerSlice.actions
