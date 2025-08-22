import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataSetService from "./dataSetService";

const initialState = {
  
  datasets: [],
};


export const dataSetGetMany = createAsyncThunk("dataSet/getMany", async () => {
  console.log("redux dataSetGetMany dataSet");
  const response = await dataSetService.dataSetsGetMany();
  console.log("redux dataSetGetMany dataSet response", response);
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
        console.log("datasetSlice dataSetGetMany.pending", action.payload);
        state.loading = true;
      })
      .addCase(dataSetGetMany.fulfilled, (state, action) => {
        console.log("datasetSlice dataSetGetMany.fulfilled", action.payload);
        state.loading = false;
        state.datasets = action.payload.dataSets;
      })
      .addCase(dataSetGetMany.rejected, (state, action) => {
        console.log("datasetSlice dataSetGetMany.rejected", action.payload);
        state.loading = false;
      });
  },
});

export default dataSetSlice.reducer;
