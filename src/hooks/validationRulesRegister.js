export default function validationRulesRegister(inputData) {
    let errors = {};

    console.log(errors);
    if (!inputData.name || !inputData.name.trim().length >= 2) {
        errors.name = "Helytelen név!";
    }

    console.log(inputData.checkbox);
    if (!inputData.checkbox) {
        errors.checkbox = "Részvétel esetén kötelező elfogadni a szabályzatot!";
    }

    return errors;
}
