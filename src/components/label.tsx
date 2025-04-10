export function Label({ children, className = "", ...props }) {
    return (
        <label
            className={`cursor-pointer border border-gray-300 rounded px-3 py-2 w-full ${className}`}{...props}>
            {children}
        </label>
    );
}