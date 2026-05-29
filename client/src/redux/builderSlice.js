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
  const response = await builderService.builderGetMany()
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
        state.loading = true
      })
      .addCase(builderGetMany.fulfilled, (state, action) => {
        state.loading = false
        state.builders = action.payload.builders
      })
      .addCase(builderGetMany.rejected, (state, action) => {
        state.loading = false
      })
  }
})

export default builderSlice.reducer