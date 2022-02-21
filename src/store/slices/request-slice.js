import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isRegisterNeeded: false,
    result: {
        isWinner: null,
        isSucces: null,
    },
    isShowResult: null,
};

const requestSlice = createSlice({
    name: "request",
    initialState: initialState,
    reducers: {
        setRegister(state, action) {
            state.isRegisterNeeded = action.payload;
        },
        setSuccesRequest(state, action) {
            state.result.isWinner = action.payload;
            state.result.isSucces = true;
        },
        setIsShowResult(state, action) {
            state.isShowResult = action.payload;
        },
    },
});

export const requestAction = requestSlice.actions;

export default requestSlice;
