const EMAIL_FORMAT =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const CODE_FORMAT = /^[A-Z0-9]\d{8}$/i;

export default function validationRulesForm(inputData) {
    const errors = {};

    if (!inputData.email || !inputData.email.match(EMAIL_FORMAT)) {
        errors.email = "Helytelen email formátum!";
    }

    if (!inputData.code || !inputData.code.match(CODE_FORMAT)) {
        errors.code = "Helytelen kód formátum!";
    }

    if (inputData.hour === "empty" || !inputData.hour) {
        errors.hour = "Hiányzó adat!";
    }

    if (inputData.min === "empty" || !inputData.min) {
        errors.min = "Hiányzó adat!";
    }

    return errors;
}
