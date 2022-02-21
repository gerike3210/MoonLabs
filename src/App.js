import UploadForm from "./components/Upload/UploadForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { sendFormData } from "./store/actions/request-action";
import Registration from "./components/Registration/Registration";
import { uploadActions } from "./store/slices/upload-slice";
import { requestAction } from "./store/slices/request-slice";

import classes from "./App.module.css";

function App() {
    const dispatch = useDispatch();
    const isValidForm = useSelector((state) => state.upload.isValidForm);
    const formData = useSelector((state) => state.upload.formData);
    const isRegisterNeeded = useSelector((state) => state.request.isRegister);
    const result = useSelector((state) => state.request.result);
    const isFetchRegistered = useSelector(
        (state) => state.request.isFetchRegistered
    );

    const resultText = result.isWinner
        ? "Gratulálunk, nyertél!"
        : "Sajnos most nem nyertél!";

    const resultClass = result.isWinner
        ? `${classes["result"]} ${classes["win"]}`
        : `${classes["result"]} ${classes["lose"]}`;

    useEffect(() => {
        if (isValidForm && !isFetchRegistered) {
            dispatch(
                sendFormData({
                    url: "https://ncp.staging.moonproject.io/api/fulop-gergely/code/upload",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        email: formData.email,
                        code: formData.code,
                        purchase_time: formData.date,
                    },
                })
            );
        }
    }, [isValidForm, dispatch]);

    useEffect(() => {
        if (isValidForm && isFetchRegistered) {
            const sendReq = async () => {
                dispatch(
                    sendFormData({
                        url: "https://ncp.staging.moonproject.io/api/fulop-gergely/code/upload",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: {
                            email: formData.email,
                            code: formData.code,
                            purchase_time: formData.date,
                        },
                    })
                );
            };
            sendReq();
            dispatch(requestAction.setFetchRegistered(false));
        }
    });

    const closeRegistrationHandler = () => {
        dispatch(requestAction.setInitial());
        dispatch(uploadActions.setInitial());
    };

    return (
        <div className={classes["App"]}>
            {isRegisterNeeded && (
                <Registration onClose={closeRegistrationHandler} />
            )}
            {result.isSucces && (
                <div className={resultClass}>
                    <h2>{resultText}</h2>
                </div>
            )}
            <div className={classes["container--upload"]}>
                <UploadForm />
            </div>
        </div>
    );
}

export default App;
