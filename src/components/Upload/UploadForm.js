import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadActions } from "../../store/slices/upload-slice";
import { requestAction } from "../../store/slices/request-slice";
import useForm from "../../hooks/useForm";
import validation from "../../hooks/validationRulesForm";
import {
    HOURS,
    MINUTES,
    ORDERED_DAYS,
    formDateLabel,
    formDateValue,
} from "./DateConstants";

import classes from "./UploadForm.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";

const UploadForm = () => {
    const dispatch = useDispatch();
    const {
        changeInputHandler,
        inputData,
        submitInputHandler,
        errors,
        isFormValid,
    } = useForm(validation);

    const {
        email: emailError,
        code: codeError,
        hour: hourError,
        min: minError,
    } = errors;

    const submitForm = (event) => {
        submitInputHandler(event);
        dispatch(requestAction.setIsShowResult(false));
    };

    useEffect(() => {
        if (isFormValid) {
            const validData = {
                email: inputData.email,
                code: inputData.code,
                purchase_time: formDateValue(
                    +inputData.day +
                        inputData.hour * 60 * 60 * 1000 +
                        inputData.min * 60 * 1000
                ),
            };
            dispatch(uploadActions.setValidInputData(validData));
            dispatch(uploadActions.setIsValidForm(true));
            inputData.code = "";
        }
    }, [dispatch, inputData, isFormValid]);

    const emailClass = `${classes["section"]} ${classes["email"]} ${
        emailError ? classes["error"] : ""
    }`;

    const codeClass = `${classes["section"]} ${classes["code"]} ${
        codeError ? classes["error"] : ""
    }`;

    const hourClass = `${classes["option"]} ${classes["hour"]} ${
        hourError ? classes["error"] : ""
    }`;

    const minClass = `${classes["option"]} ${classes["min"]} ${
        minError ? classes["error"] : ""
    }`;
    return (
        <div className={classes["container--upload"]}>
            <form onSubmit={submitForm}>
                <h1 className={classes["title"]}>Kódfeltöltés</h1>
                <div className={emailClass}>
                    <label htmlFor="email">E-MAIL CIM:</label>
                    <Input
                        type="text"
                        name="email"
                        placeholder="példa@példa.com"
                        onChange={changeInputHandler}
                    />
                    {emailError && <h5>{emailError}</h5>}
                </div>
                <div className={codeClass}>
                    <label htmlFor="code">KÓD:</label>
                    <Input
                        type="text"
                        name="code"
                        placeholder="A01234567"
                        value={inputData.code || ""}
                        onChange={changeInputHandler}
                    />
                    {errors.code && <h5>{errors.code}</h5>}
                </div>
                <div className={`${classes["section"]} ${classes["date"]}`}>
                    <label>VÁSÁRLÁS DÁTUMA:</label>
                    <div className={classes["date--sections"]}>
                        <div>
                            <h3>Nap</h3>
                            <select
                                name="day"
                                onChange={changeInputHandler}
                                className={classes["date--day"]}
                            >
                                {ORDERED_DAYS.map((day) => (
                                    <option key={day} value={day.getTime()}>
                                        {formDateLabel(day)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={hourClass}>
                            <h3>ÓRA:</h3>
                            <select
                                name="hour"
                                onChange={changeInputHandler}
                                className={classes["date--hour"]}
                            >
                                {HOURS.map((hour) => (
                                    <option key={hour} value={hour}>
                                        {hour !== "empty"
                                            ? hour.toString().padStart(2, "0")
                                            : ""}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={minClass}>
                            <h3>PERC:</h3>
                            <select
                                name="min"
                                onChange={changeInputHandler}
                                className={classes["date--min"]}
                            >
                                {MINUTES.map((minute) => (
                                    <option key={minute} value={minute}>
                                        {minute !== "empty"
                                            ? minute.toString().padStart(2, "0")
                                            : ""}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <Button type="submit" className={classes["btn"]}>
                    Kódfeltöltés
                </Button>
            </form>
        </div>
    );
};

export default UploadForm;
