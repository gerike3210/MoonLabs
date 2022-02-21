import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isRegister: null,
    isFetchRegistered: null,
    result: {
        isWinner: null,
        isSucces: null,
    },
};

const requestSlice = createSlice({
    name: "request",
    initialState: initialState,
    reducers: {
        setRegister(state, action) {
            state.isRegister = action.payload;
        },
        setInitial(state) {
            state.isRegister = initialState.isRegister;
        },
        setSuccesRequest(state, action) {
            state.result.isWinner = action.payload;
            state.result.isSucces = true;
        },
        setFetchRegistered(state, action) {
            state.isFetchRegistered = action.payload;
        },
    },
});

export const requestAction = requestSlice.actions;

export default requestSlice;
