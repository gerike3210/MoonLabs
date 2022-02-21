import { requestAction } from "../slices/request-slice";
import sendRequest from "./fetch";

export const sendFormData = (configObj) => {
    return async (dispatch) => {
        try {
            const responseData = await sendRequest(configObj);

            const [[key, value]] = Object.entries(responseData);

            if (key === "errors" && value[0].code === "email:not_found") {
                dispatch(requestAction.setRegister(true));
            }
            if (key === "data") {
                if (responseData.data.hasOwnProperty("won")) {
                    dispatch(requestAction.setSuccesRequest(value.won));
                    dispatch(requestAction.setIsShowResult(true));
                }
                dispatch(requestAction.setRegister(false));
            }
        } catch (error) {
            console.log(error.message);
        }
    };
};
