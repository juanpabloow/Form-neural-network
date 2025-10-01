import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const Button = ({ children, variant = 'primary', disabled = false, type = 'button', className = '', }) => {
    const baseClasses = 'px-4 py-2 rounded';
    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400',
        secondary: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
    };
    return (_jsx("button", { type: type, disabled: disabled, className: `${baseClasses} ${variantClasses[variant]} ${className}`, children: children }));
};
export default Button;
//# sourceMappingURL=Button.js.map