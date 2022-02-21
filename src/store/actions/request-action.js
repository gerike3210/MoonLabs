import { requestAction } from "../slices/request-slice";
import sendRequest from "./fetch";

export const sendFormData = (configObj) => {
    return async (dispatch) => {
        try {
            const responseData = await sendRequest(configObj);

            const [[key, value]] = Object.entries(responseData);
            console.log(value);

            if (key === "errors" && value[0].code === "email:not_found") {
                dispatch(requestAction.setRegister(true));
            }
            if (key === "data") {
                if (Object.keys(value).length === 2) {
                    dispatch(requestAction.setSuccesRequest(value.won));
                }
                if (Object.keys(value).length === 1) {
                    dispatch(requestAction.setRegister(false));
                    dispatch(requestAction.setFetchRegistered(true));
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
};
