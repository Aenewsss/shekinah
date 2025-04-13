export function Button({ children, className = "", color = "#155dfc", disabled = false, ...props }) {
    return (
        <button
            disabled={disabled}
            style={{ backgroundColor: disabled ? "gray" : color, color: color == "#F0F0F0" ? "#000" : "#fff", cursor: disabled? "not-allowed" : "pointer", ...props.style  }}
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition hover:scale-105 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
