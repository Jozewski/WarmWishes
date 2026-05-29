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
    const response = await messageService.messageCreate(messageData);
    return response.data;
  }
);

export const messageGetMany = createAsyncThunk(
  "message/getMany",
  async () => {
    const response = await messageService.messageGetMany();
    return response.data;
  }
);

export const messageGetByProject = createAsyncThunk(
  "message/getByProject",
  async (projectId) => {
    const response = await messageService.messageGetByProject(projectId);
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
        state.loading = true;
      })
      .addCase(messageCreate.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.messages.unshift(action.payload.data);
        }
      })
      .addCase(messageCreate.rejected, (state, action) => {
        state.loading = false;
      })

      // Messages get many
      .addCase(messageGetMany.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(messageGetMany.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.messages || [];
      })
      .addCase(messageGetMany.rejected, (state, action) => {
        state.loading = false;
      })

      // Messages get by project
      .addCase(messageGetByProject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(messageGetByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.messages || [];
      })
      .addCase(messageGetByProject.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default messagesSlice.reducer;
