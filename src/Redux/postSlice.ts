import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getApi } from "./API";
import { PostInfo } from "../component/PostInfo";

enum PromiseStatus {
    None = 0,
    Loading = 1,
    Success = 2,
    Failed = 3,
}

export interface postState {
    postStatus: PromiseStatus;
    postData: PostInfo[];
}

export const getApiAsync = createAsyncThunk("getApi", async () => {
    const response = await getApi();

    return response;
})

const initialState: postState = {
    postStatus: PromiseStatus.None,
    postData: [],
}

export const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {
        setPostStatus: (state, action) => {
            state.postStatus = action.payload;
        }
    },
    extraReducers(builder) {
        builder

            .addCase(getApiAsync.pending, (state) => {
                state.postStatus = PromiseStatus.Loading;
            })
            .addCase(getApiAsync.fulfilled, (state, action) => {
                state.postStatus = PromiseStatus.Success;
                state.postData = action.payload;
            })
            .addCase(getApiAsync.rejected, (state, action) => {
                state.postStatus = PromiseStatus.Failed;
            });
    },
})

const postReducer = postSlice.reducer;
export const { setPostStatus } = postSlice.actions;
export default postReducer;