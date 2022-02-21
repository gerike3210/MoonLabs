const EMAIL_FORMAT =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const CODE_FORMAT = /^[A-Z0-9]\d{8}$/i;

export default function validationRulesForm(inputData) {
    let errors = {};

    if (!inputData.email.match(EMAIL_FORMAT)) {
        errors.email = "Helytelen email formátum!";
    }

    if (!inputData.code.match(CODE_FORMAT)) {
        errors.code = "Helytelen kód formátum!";
    }

    if (inputData.hour < 0 || !inputData.hour) {
        errors.hour = "Hiányzó adat!";
    }

    if (inputData.min < 0 || !inputData.min) {
        errors.min = "Hiányzó adat!";
    }

    return errors;
}
