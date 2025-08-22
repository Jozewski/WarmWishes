import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import builderService from './builderService'

const initialState = {
  loading: false, 
  builders: [
    {
        projectType: "",       
        tasks: [],
        roles: [],
        user: {}
    }
  ]
}


export const builderGetMany = createAsyncThunk("builder/getMany", async () => {
  console.log("redux builderGetMany builder")
  const response = await builderService.builderGetMany()
  console.log("redux builderGetMany builder response", response)
  return response.data
})

export const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
     
      // builders get many
      .addCase(builderGetMany.pending, (state, action) => {
        console.log("builderSlice builderGetMany.pending", action.payload)
        state.loading = true
      })
      .addCase(builderGetMany.fulfilled, (state, action) => {
        console.log("builderSlice builderGetMany.fulfilled", action.payload)
        state.loading = false
        state.builders = action.payload.builders
      })
      .addCase(builderGetMany.rejected, (state, action) => {
        console.log("builderSlice builderGetMany.rejected", action.payload)
        state.loading = false
      })
  }
})

export default builderSlice.reducer