import classes from "./Input.module.css";

const Input = ({
    children,
    className,
    placeholder,
    onChange,
    name,
    type,
    value,
    defaultValue,
    defaultChecked,
}) => {
    return (
        <input
            className={`${classes["input"]} ${className}`}
            onChange={onChange}
            name={name}
            value={value}
            defaultChecked={defaultChecked}
            defaultValue={defaultValue}
            placeholder={placeholder}
            type={type}
        >
            {children}
        </input>
    );
};

export default Input;
