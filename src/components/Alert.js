import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const Alert = ({ children, variant = 'error', className = '' }) => {
    const variantClasses = {
        error: 'bg-red-100 border-red-300 text-red-700',
        success: 'bg-green-100 border-green-300 text-green-700'
    };
    return (_jsx("div", { className: `border rounded p-3 ${variantClasses[variant]} ${className}`, children: children }));
};
export default Alert;
//# sourceMappingURL=Alert.js.map