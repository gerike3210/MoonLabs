import classes from "./Button.module.css";

const Button = ({ children, onClick, type, disabled, className }) => {
    return (
        <button
            className={`${classes["btn"]} ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
export default Button;
