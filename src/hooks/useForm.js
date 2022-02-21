import { useState } from "react";
import { TODAY } from "../components/Upload/DateConstants";

const useForm = (validation) => {
    const [inputData, setInputData] = useState({
        email: "",
        code: "",
        day: TODAY,
        hour: "",
        min: "",
        name: "",
        checkbox: false,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const changeInputHandler = (event) => {
        const { name, value, checked } = event.target;
        console.log(name, value);
        setInputData({ ...inputData, [name]: value || checked });
        setIsSubmitted(false);
    };

    const submitInputHandler = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        setErrors(validation(inputData));
    };

    const isFormValid = Object.keys(errors).length === 0 && isSubmitted;

    return {
        changeInputHandler,
        inputData,
        submitInputHandler,
        errors,
        isFormValid,
        isSubmitted,
    };
};

export default useForm;
