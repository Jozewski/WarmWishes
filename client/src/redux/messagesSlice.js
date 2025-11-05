import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "./messageService";

const initialState = {
  loading: false,
  message: {
    projectId: "",
    projectName: "",
    senderId: "",
    senderName: "",
    messageType: "",
    content: "",
    createdAt: "",
    isRead: false
  },
  messages: [],
};

export const messageCreate = createAsyncThunk(
  "message/create",
  async (messageData) => {
    console.log("redux messageCreate message", messageData);
    const response = await messageService.messageCreate(messageData);
    console.log("redux messageCreate response", response);
    return response.data;
  }
);

export const messageGetMany = createAsyncThunk(
  "message/getMany",
  async () => {
    console.log("redux messageGetMany");
    const response = await messageService.messageGetMany();
    console.log("redux messageGetMany response", response);
    return response.data;
  }
);

export const messageGetByProject = createAsyncThunk(
  "message/getByProject",
  async (projectId) => {
    console.log("redux messageGetByProject projectId", projectId);
    const response = await messageService.messageGetByProject(projectId);
    console.log("redux messageGetByProject response", response);
    return response.data;
  }
);

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Message create
      .addCase(messageCreate.pending, (state, action) => {
        console.log("messagesSlice messageCreate.pending", action.payload);
        state.loading = true;
      })
      .addCase(messageCreate.fulfilled, (state, action) => {
        console.log("messagesSlice messageCreate.fulfilled", action.payload);
        state.loading = false;
        if (action.payload.data) {
          state.messages.unshift(action.payload.data);
        }
      })
      .addCase(messageCreate.rejected, (state, action) => {
        console.log("messagesSlice messageCreate.rejected", action.payload);
        state.loading = false;
      })

      // Messages get many
      .addCase(messageGetMany.pending, (state, action) => {
        console.log("messagesSlice messageGetMany.pending", action.payload);
        state.loading = true;
      })
      .addCase(messageGetMany.fulfilled, (state, action) => {
        console.log("messagesSlice messageGetMany.fulfilled", action.payload);
        state.loading = false;
        state.messages = action.payload.messages || [];
      })
      .addCase(messageGetMany.rejected, (state, action) => {
        console.log("messagesSlice messageGetMany.rejected", action.payload);
        state.loading = false;
      })

      // Messages get by project
      .addCase(messageGetByProject.pending, (state, action) => {
        console.log("messagesSlice messageGetByProject.pending", action.payload);
        state.loading = true;
      })
      .addCase(messageGetByProject.fulfilled, (state, action) => {
        console.log("messagesSlice messageGetByProject.fulfilled", action.payload);
        state.loading = false;
        state.messages = action.payload.messages || [];
      })
      .addCase(messageGetByProject.rejected, (state, action) => {
        console.log("messagesSlice messageGetByProject.rejected", action.payload);
        state.loading = false;
      });
  },
});

export default messagesSlice.reducer;
