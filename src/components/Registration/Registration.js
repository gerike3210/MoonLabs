import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendFormData } from "../../store/actions/request-action";
import useForm from "../../hooks/useForm";
import validation from "../../hooks/validationRulesRegister";
import Modal from "../UI/Modal";
import Input from "../UI/Input";

import classes from "./Registration.module.css";
import Button from "../UI/Button";

const Registration = ({ onClose }) => {
    const dispatch = useDispatch();
    const { email } = useSelector((state) => state.upload.formData);
    const {
        changeInputHandler,
        inputData,
        submitInputHandler,
        errors,
        isSubmitted,
    } = useForm(validation);
    const { name, checkbox } = inputData;

    useEffect(() => {
        if (isSubmitted && Object.keys(errors).length === 0) {
            dispatch(
                sendFormData({
                    url: "https://ncp.staging.moonproject.io/api/fulop-gergely/user/register",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        email,
                        name,
                    },
                })
            );
        }
    }, [dispatch, errors, email, name, isSubmitted]);

    const nameClass = `${classes["section"]} ${classes["name"]} ${
        errors.name ? classes["error"] : ""
    }`;
    const checkboxClass = `${classes["section"]} ${classes["checkbox"]} ${
        errors.checkbox ? classes["error"] : ""
    }`;

    return (
        <Modal onClose={onClose}>
            <form
                onSubmit={submitInputHandler}
                className={classes["container--registration"]}
            >
                <h2 className={classes["title"]}>Regisztráció</h2>
                <hr />
                <div>
                    <div className={classes["section"]}>
                        <label htmlFor="email">E-MAIL CIM:</label>
                        <Input name="email" value={email} readOnly />
                    </div>
                    <div className={nameClass}>
                        <label htmlFor="name">NÉV:</label>
                        <Input
                            name="name"
                            type="text"
                            onChange={changeInputHandler}
                            placeholder="Szabó János"
                        />
                        {errors.name && (
                            <p className={classes["error-text"]}>
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className={checkboxClass}>
                        <div className={classes["container--checkbox"]}>
                            <Input
                                type="checkbox"
                                name="checkbox"
                                onChange={changeInputHandler}
                                checked={checkbox}
                            />
                            <p>Elolvastam és elfogadom a játékszabályzatot!</p>
                        </div>
                        {errors.checkbox && (
                            <p className={classes["error-text"]}>
                                {errors.checkbox}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        disabled={!checkbox}
                        className={classes["btn"]}
                    >
                        Regisztrálok
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default Registration;
