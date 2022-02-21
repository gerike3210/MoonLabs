import { configureStore } from "@reduxjs/toolkit";
import requestSlice from "./slices/request-slice";
import uploadSlice from "./slices/upload-slice";

const store = configureStore({
    reducer: { upload: uploadSlice.reducer, request: requestSlice.reducer },
});

export default store;
