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
    const response = await projectService.projectCreate(createdProject);
    return response.data;
  }
);
export const projectUpdate = createAsyncThunk(
  "project/update",
  async (projectInfo) => {
    const { projectId, project } = projectInfo;
    const response = await projectService.projectUpdate(projectId, project);
    return response.data;
  }
);

export const projectGetMany = createAsyncThunk(
  "project/getMany",
  async (email) => {
    const response = await projectService.projectGetMany(email);
    return response.data;
  }
);
export const projectGetOne = createAsyncThunk(
  "project/getOne",
  async (projectId) => {
    const response = await projectService.projectGetOne(projectId);
    return response.data;
  }
);

export const projectTaskCreate = createAsyncThunk(
  "project/taskCreate",
  async (taskInfo) => {
    const { projectId, task } = taskInfo;
    const response = await projectService.projectTaskCreate(projectId, task);
    return response.data;
  }
);

export const projectTaskUpdate = createAsyncThunk(
  "project/taskUpdate",
  async (taskInfo) => {
    const { projectId, task } = taskInfo;
    const response = await projectService.projectTaskUpdate(projectId, task);
    return response.data;
  }
);

export const projectTaskDelete = createAsyncThunk(
  "project/taskDelete",
  async (taskInfo) => {
    const { projectId, taskId } = taskInfo;
    const response = await projectService.projectTaskDelete(projectId, taskId);
    return response.data;
  }
);

export const projectDonationUpdate = createAsyncThunk(
  "project/donationUpdate",
  async (donationInfo) => {
    const { projectId, donationData } = donationInfo;
    const response = await projectService.projectDonationUpdate(projectId, donationData);
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
        state.loading = true;
      })
      .addCase(projectCreate.fulfilled, (state, action) => {
        state.loading = false;
        // state.projects= action.payload.project
      })
      .addCase(projectCreate.rejected, (state, action) => {
        state.loading = false;
      })

      // Project Update
      .addCase(projectUpdate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(projectUpdate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(projectUpdate.rejected, (state, action) => {
        state.loading = false;
      })

      // Projects get many
      .addCase(projectGetMany.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(projectGetMany.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects;
      })
      .addCase(projectGetMany.rejected, (state, action) => {
        state.loading = false;
      })
      // Projects get one
      .addCase(projectGetOne.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(projectGetOne.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload.project;
      })
      .addCase(projectGetOne.rejected, (state, action) => {
        state.loading = false;
      })

      // Project task create
      .addCase(projectTaskCreate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(projectTaskCreate.fulfilled, (state, action) => {
        state.loading = false;
        // state.project = action.payload.project
      })
      .addCase(projectTaskCreate.rejected, (state, action) => {
        state.loading = false;
      })

      // Project task update one
      .addCase(projectTaskUpdate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(projectTaskUpdate.fulfilled, (state, action) => {
        state.loading = false;
        // state.project = action.payload.project
      })
      .addCase(projectTaskUpdate.rejected, (state, action) => {
        state.loading = false;
      })

      // Project task delete one
      .addCase(projectTaskDelete.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(projectTaskDelete.fulfilled, (state, action) => {
        state.loading = false;
        // state.project = action.payload.project
      })
      .addCase(projectTaskDelete.rejected, (state, action) => {
        state.loading = false;
      })

      // Project donation update
      .addCase(projectDonationUpdate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(projectDonationUpdate.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.project) {
          state.project = action.payload.project;
        }
      })
      .addCase(projectDonationUpdate.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default projectSlice.reducer;
