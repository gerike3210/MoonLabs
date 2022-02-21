import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData: {
        email: "",
        code: "",
        date: "",
    },
    isValidForm: false,
};

const uploadSlice = createSlice({
    name: "upload",
    initialState: initialState,
    reducers: {
        setValidInputData(state, action) {
            state.formData = { ...action.payload };
        },
        setIsValidForm(state, action) {
            state.isValidForm = action.payload;
        },
    },
});

export const uploadActions = uploadSlice.actions;

export default uploadSlice;
