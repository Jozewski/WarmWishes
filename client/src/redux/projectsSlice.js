import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService";

const initialState = {
  loading: false,
  project: {
    projectName: "",
    projectDescription: "",
    projectType: "",
    startDate: "",
    endDate: "",
    status: "",   
    tasks: [""],
    users: [
      {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        roles: [""],
      },
    ],
    user:  {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      roles: [""],
    },
  },
  projects: [],
};

export const projectCreate = createAsyncThunk(
  "project/create",
  async (createdProject) => {
    console.log("redux projectCreate project", createdProject);
    const response = await projectService.projectCreate(createdProject);
    console.log(response);
    return response.data;
  }
);
export const projectUpdate = createAsyncThunk(
  "project/update",
  async (projectInfo) => {
    const { projectId, project } = projectInfo;
    console.log("redux projectCreate project", project);
    const response = await projectService.projectUpdate(projectId, project);
    console.log(response);
    return response.data;
  }
);

export const projectGetMany = createAsyncThunk(
  "project/getMany",
  async (email) => {
    console.log("redux projectGetMany project", email);
    const response = await projectService.projectGetMany(email);
    console.log("redux projectGetMany project response", response);
    return response.data;
  }
);
export const projectGetOne = createAsyncThunk(
  "project/getOne",
  async (projectId) => {
    console.log("redux projectGetOne project", projectId);
    const response = await projectService.projectGetOne(projectId);
    console.log("redux projectGetOne project response", response);
    return response.data;
  }
);

export const projectTaskCreate = createAsyncThunk(
  "project/taskCreate",
  async (taskInfo) => {
    console.log("redux projectTaskUpdate project task", taskInfo);
    const { projectId, task } = taskInfo;
    const response = await projectService.projectTaskCreate(projectId, task);
    console.log("redux projectTaskCreate project response", response);
    return response.data;
  }
);

export const projectTaskUpdate = createAsyncThunk(
  "project/taskUpdate",
  async (taskInfo) => {
    console.log("redux projectTaskUpdate project task", taskInfo);
    const { projectId, task } = taskInfo;
    const response = await projectService.projectTaskUpdate(projectId, task);
    console.log("redux projectTaskUpdate project response", response);
    return response.data;
  }
);

export const projectTaskDelete = createAsyncThunk(
  "project/taskDelete",
  async (taskInfo) => {
    console.log("redux projectTaskDelete project task", taskInfo);
    const { projectId, taskId } = taskInfo;
    const response = await projectService.projectTaskDelete(projectId, taskId);
    console.log("redux projectTaskDelete project response", response);
    return response.data;
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Projects create one
      .addCase(projectCreate.pending, (state, action) => {
        console.log("projectSlice projectCreate.pending", action.payload);
        state.loading = true;
      })
      .addCase(projectCreate.fulfilled, (state, action) => {
        console.log("projectSlice projectCreate.fulfilled", action.payload);
        state.loading = false;
        // state.projects= action.payload.project
      })
      .addCase(projectCreate.rejected, (state, action) => {
        console.log("projectSlice projectCreate.rejected", action.payload);
        state.loading = false;
      })

      // Project Update
      .addCase(projectUpdate.pending, (state, action) => {
        console.log("projectSlice projectUpdate.pending", action.payload);
        state.loading = true;
      })
      .addCase(projectUpdate.fulfilled, (state, action) => {
        console.log("projectSlice projectUpdate.fulfilled", action.payload);
        state.loading = false;
      })
      .addCase(projectUpdate.rejected, (state, action) => {
        console.log("projectSlice projectUpdate.rejected", action.payload);
        state.loading = false;
      })

      // Projects get many
      .addCase(projectGetMany.pending, (state, action) => {
        console.log("projectSlice projectGetMany.pending", action.payload);
        state.loading = true;
      })
      .addCase(projectGetMany.fulfilled, (state, action) => {
        console.log("projectSlice projectGetMany.fulfilled", action.payload);
        state.loading = false;
        state.projects = action.payload.projects;
      })
      .addCase(projectGetMany.rejected, (state, action) => {
        console.log("projectSlice projectGetMany.rejected", action.payload);
        state.loading = false;
      })
      // Projects get one
      .addCase(projectGetOne.pending, (state, action) => {
        console.log("projectSlice projectGetOne.pending", action.payload);
        state.loading = true;
      })
      .addCase(projectGetOne.fulfilled, (state, action) => {
        console.log("projectSlice projectGetOne.fulfilled", action.payload);
        state.loading = false;
        state.project = action.payload.project;
      })
      .addCase(projectGetOne.rejected, (state, action) => {
        console.log("projectSlice projectGetOne.rejected", action.payload);
        state.loading = false;
      })

      // Project task create
      .addCase(projectTaskCreate.pending, (state, action) => {
        console.log("projectSlice projectTaskCreate.pending", action.payload);
        state.loading = true;
      })
      .addCase(projectTaskCreate.fulfilled, (state, action) => {
        console.log("projectSlice projectTaskCreate.fulfilled", action.payload);
        state.loading = false;
        // state.project = action.payload.project
      })
      .addCase(projectTaskCreate.rejected, (state, action) => {
        console.log("projectSlice projectTaskCreate.rejected", action.payload);
        state.loading = false;
      })

      // Project task update one
      .addCase(projectTaskUpdate.pending, (state, action) => {
        console.log("projectSlice projectTaskUpdate.pending", action.payload);
        state.loading = true;
      })
      .addCase(projectTaskUpdate.fulfilled, (state, action) => {
        console.log("projectSlice projectTaskUpdate.fulfilled", action.payload);
        state.loading = false;
        // state.project = action.payload.project
      })
      .addCase(projectTaskUpdate.rejected, (state, action) => {
        console.log("projectSlice projectTaskUpdate.rejected", action.payload);
        state.loading = false;
      })

      // Project task delete one
      .addCase(projectTaskDelete.pending, (state, action) => {
        console.log("projectSlice projectTaskDelete.pending", action.payload);
        state.loading = true;
      })
      .addCase(projectTaskDelete.fulfilled, (state, action) => {
        console.log("projectSlice projectTaskDelete.fulfilled", action.payload);
        state.loading = false;
        // state.project = action.payload.project
      })
      .addCase(projectTaskDelete.rejected, (state, action) => {
        console.log("projectSlice projectTaskDelete.rejected", action.payload);
        state.loading = false;
      });
  },
});

export default projectSlice.reducer;
