import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataSetService from "./dataSetService";

const initialState = {
  
  datasets: [],
};


export const dataSetGetMany = createAsyncThunk("dataSet/getMany", async () => {
  const response = await dataSetService.dataSetsGetMany();
  return response.data;
});

export const dataSetSlice = createSlice({
  name: "datasets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
           // contacts get many
      .addCase(dataSetGetMany.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(dataSetGetMany.fulfilled, (state, action) => {
        state.loading = false;
        state.datasets = action.payload.dataSets;
      })
      .addCase(dataSetGetMany.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default dataSetSlice.reducer;
