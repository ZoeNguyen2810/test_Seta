import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostInfo } from "../component/PostInfo";
import { FormData } from "../component/addPost/AddPost";
import { postAPI } from "./API";

export enum PromiseStatus {
    None = 0,
    Loading = 1,
    Success = 2,
    Failed = 3,
}

export interface postState {
    postStatus: PromiseStatus;
    postData: FormData[];
}

export const createPostAsync = createAsyncThunk("getApi", async (data: FormData) => {
    const response = await postAPI(data);

    return response;
})

const initialState: postState = {
    postStatus: PromiseStatus.None,
    postData: [],
};

export const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {
        setPostStatus: (state, action) => {
            state.postStatus = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createPostAsync.pending, (state) => {
                state.postStatus = PromiseStatus.Loading;
            })
            .addCase(createPostAsync.fulfilled, (state) => {
                state.postStatus = PromiseStatus.Success;
            })
            .addCase(createPostAsync.rejected, (state) => {
                state.postStatus = PromiseStatus.Failed;
            });
    },
});

const putPostReducer = postSlice.reducer;
export const { setPostStatus } = postSlice.actions;
export default putPostReducer;
