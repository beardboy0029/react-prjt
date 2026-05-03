import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: null,
    error: undefined,
    plantsDtls: null,
    plantsDtlsLoading: false,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchUserRequest(state) {
            state.loading = true;
            state.error = undefined;
        },
        fetchUserSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
        },
        fetchUserFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export const {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure,
    fetchPlantsDtlsRequest,
    fetchPlantsDtlsSuccess,
    fetchPlantsDtlsFailure,
} = appSlice.actions;

export default appSlice.reducer;