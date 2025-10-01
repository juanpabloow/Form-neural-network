import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LocalStorageService } from '../utils/localStorage';
import { PredictionHistoryItem } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    useEffect(() => {
        const historyData = LocalStorageService.getHistory();
        setHistory(historyData);
    }, []);
    return (_jsxs(Card, { large: true, children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Prediction History" }), _jsx(Link, { to: "/", children: _jsx(Button, { variant: "secondary", children: "Back to Form" }) })] }), history.length === 0 ? (_jsx("div", { className: "text-center py-12", children: _jsx("div", { className: "text-gray-500 text-lg", children: "No predictions done" }) })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full border border-gray-300", children: [_jsx("thead", { className: "bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2 text-left border-b", children: "Date & Time" }), _jsx("th", { className: "px-4 py-2 text-left border-b", children: "Prediction" }), _jsx("th", { className: "px-4 py-2 text-left border-b", children: "Accuracy" }), _jsx("th", { className: "px-4 py-2 text-left border-b", children: "Process Time" })] }) }), _jsx("tbody", { children: history.map((item) => (_jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "px-4 py-2", children: item.timestamp }), _jsx("td", { className: "px-4 py-2", children: item.prediction }), _jsxs("td", { className: "px-4 py-2", children: [(item.accuracy * 100).toFixed(2), "%"] }), _jsx("td", { className: "px-4 py-2", children: item.process_time })] }, item.id))) })] }) }))] }));
};
export default HistoryPage;
//# sourceMappingURL=HistoryPage.js.map