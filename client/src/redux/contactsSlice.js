import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

const initialState = {
  contact: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  },
  contacts: [],
};

export const contactCreate = createAsyncThunk(
  "contacts/create",
  async (contact) => {
    console.log("redux contactCreate contact", contact);
    const response = await contactService.contactCreate(contact);
    console.log(response);
    return response.data;
  }
);

export const contactGetMany = createAsyncThunk("contacts/getMany", async () => {
  console.log("redux contactGetMany contact");
  const response = await contactService.contactGetMany();
  console.log("redux contactGetMany contact response", response);
  return response.data;
});

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // contacts create one
      .addCase(contactCreate.pending, (state, action) => {
        console.log("contactSlice contactCreate.pending", action.payload);
        state.loading = true;
      })
      .addCase(contactCreate.fulfilled, (state, action) => {
        console.log("contactSlice contactCreate.fulfilled", action.payload);
        state.loading = false;
      })
      .addCase(contactCreate.rejected, (state, action) => {
        console.log("contactSlice contactCreate.rejected", action.payload);
        state.loading = false;
      })

      // contacts get many
      .addCase(contactGetMany.pending, (state, action) => {
        console.log("contactSlice contactGetMany.pending", action.payload);
        state.loading = true;
      })
      .addCase(contactGetMany.fulfilled, (state, action) => {
        console.log("contactSlice contactGetMany.fulfilled", action.payload);
        state.loading = false;
        state.contacts = action.payload.contacts;
      })
      .addCase(contactGetMany.rejected, (state, action) => {
        console.log("contactSlice contactGetMany.rejected", action.payload);
        state.loading = false;
      });
  },
});

export default contactSlice.reducer;
