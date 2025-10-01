import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const Card = ({ children, large = false }) => {
    return (_jsx("div", { className: "min-h-screen bg-gray-100 p-8", children: _jsx("div", { className: `${large ? 'max-w-4xl' : 'max-w-md'} mx-auto bg-white rounded p-6`, children: children }) }));
};
export default Card;
//# sourceMappingURL=Card.js.map