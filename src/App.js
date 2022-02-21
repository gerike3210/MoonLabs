import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendFormData } from "./store/actions/request-action";
import UploadForm from "./components/Upload/UploadForm";
import Registration from "./components/Registration/Registration";

import classes from "./App.module.css";

function App() {
    const dispatch = useDispatch();
    const { isValidForm, formData } = useSelector((state) => state.upload);
    const { isRegisterNeeded, result, isShowResult } = useSelector(
        (state) => state.request
    );

    const resultText = result.isWinner
        ? "Gratulálunk, nyertél!"
        : "Sajnos most nem nyertél!";

    const resultClass = `${classes["result"]} ${
        result.isWinner ? classes["win"] : classes["lose"]
    }`;

    useEffect(() => {
        if (isValidForm && !isRegisterNeeded)
            dispatch(
                sendFormData({
                    url: "https://ncp.staging.moonproject.io/api/fulop-gergely/code/upload",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: formData,
                })
            );
    }, [dispatch, formData, isRegisterNeeded, isValidForm]);

    return (
        <div className={classes["App"]}>
            {isRegisterNeeded && <Registration />}
            {isShowResult && (
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
