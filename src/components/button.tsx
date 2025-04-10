export function Button({ children, className = "", color = "#155dfc", ...props }) {
    return (
        <button
            style={{ backgroundColor: color, color: color == "#F0F0F0" ? "#000" : "#fff"  }}
            className={`cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition hover:scale-105 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
