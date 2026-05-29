import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  loading: false,
  users: {
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
    token: ""
  }
}

export const userGetMany = createAsyncThunk("user/getMany", async () => {
  const response = await userService.userList()
  return response.data
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Get list of users
      .addCase(userGetMany.pending, (state, action) => {
        state.loading = true
      })
      .addCase(userGetMany.fulfilled, (state, action) => {
        state.loading = false
        state.isLoggedIn = true
        state.users = action.payload.users
      })
      .addCase(userGetMany.rejected, (state, action) => {
        state.loading = false
      })




  }
})

export default userSlice.reducer
