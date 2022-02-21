import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadActions } from "../../store/slices/upload-slice";
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

    useEffect(() => {
        if (isFormValid) {
            dispatch(
                uploadActions.setValidInputData({
                    email: inputData.email,
                    code: inputData.code,
                    date: formDateValue(
                        +inputData.day +
                            inputData.hour * 60 * 60 * 1000 +
                            inputData.min * 60 * 1000
                    ),
                })
            );
            dispatch(uploadActions.setIsValidForm(true));
        } else {
            dispatch(uploadActions.setIsValidForm(false));
        }
    }, [isFormValid, inputData]);

    const emailClass = emailError
        ? `${classes["section"]} ${classes["email"]} ${classes["error"]}`
        : `${classes["section"]} ${classes["email"]}`;

    const codeClass = codeError
        ? `${classes["section"]} ${classes["code"]} ${classes["error"]}`
        : `${classes["section"]} ${classes["code"]}`;

    const hourClass = hourError
        ? `${classes["option"]} ${classes["hour"]} ${classes["error"]}`
        : `${classes["option"]} ${classes["hour"]}`;

    const minClass = minError
        ? `${classes["option"]} ${classes["min"]} ${classes["error"]}`
        : `${classes["option"]} ${classes["min"]}`;

    return (
        <div className={classes["container--upload"]}>
            <form onSubmit={(e) => submitInputHandler(e)}>
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
                                        {hour >= 0
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
                                        {minute >= 0
                                            ? minute.toString().padStart(2, "0")
                                            : ""}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" className={classes["btn"]}>
                    Kódfeltöltés
                </button>
            </form>
        </div>
    );
};

export default UploadForm;
