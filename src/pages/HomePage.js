import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PredictionService } from '../services/predictionService';
import { LocalStorageService } from '../utils/localStorage';
import { PredictionResponse } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import Alert from '../components/Alert';
const HomePage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [invertImage, setInvertImage] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError('');
            setResult(null);
        }
    };
    const validateImage = (file) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const isValid = img.width === 28 && img.height === 28;
                resolve(isValid);
            };
            img.onerror = () => resolve(false);
            img.src = URL.createObjectURL(file);
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('Please select an image');
            return;
        }
        if (!selectedFile.type.startsWith('image/')) {
            setError('Please select a valid image file');
            return;
        }
        const isValidSize = await validateImage(selectedFile);
        if (!isValidSize) {
            setError('Image must be exactly 28x28 pixels');
            return;
        }
        setError('');
        setResult(null);
        try {
            const response = await PredictionService.predictDigit({
                image: selectedFile,
                invert: invertImage ? 'true' : 'false',
            });
            setResult(response);
            LocalStorageService.addPrediction({
                prediction: response.prediction,
                accuracy: response.accuracy,
                process_time: response.process_time,
            });
        }
        catch (err) {
            setError('Error making prediction. Please try again.');
        }
    };
    return (_jsxs(Card, { children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Final Project" }), _jsx("p", { className: "text-sm", children: "Upload a 28x28 pixel image of a handwritten digit" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Select Image (28x28px)" }), _jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "w-full text-sm border rounded p-2", required: true })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: invertImage, onChange: (e) => setInvertImage(e.target.checked), className: "mr-2" }), _jsx("label", { className: "text-sm", children: "Black background?" })] }), error && (_jsx(Alert, { variant: "error", children: error })), _jsx(Button, { type: "submit", disabled: !selectedFile, className: "w-full", children: "Submit image" })] }), result && (_jsx(Alert, { variant: "success", className: "mt-6", children: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Predicted Digit:" }), _jsx("span", { children: result.prediction })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Accuracy:" }), _jsxs("span", { children: [(result.accuracy).toFixed(2), "%"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Process Time:" }), _jsx("span", { children: result.process_time })] })] }) })), _jsx("div", { className: "mt-6 text-center", children: _jsx(Link, { to: "/history", children: _jsx(Button, { variant: "secondary", children: "View History" }) }) })] }));
};
export default HomePage;
//# sourceMappingURL=HomePage.js.map