export default function validationRulesRegister(inputData) {
    const errors = {};

    if (!inputData.name || !inputData.name.trim().length >= 2) {
        errors.name = "Helytelen név!";
    }

    if (!inputData.checkbox) {
        errors.checkbox = "Részvétel esetén kötelező elfogadni a szabályzatot!";
    }

    return errors;
}
