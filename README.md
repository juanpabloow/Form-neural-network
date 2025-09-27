# Digit Recognition App

A React TypeScript application for handwritten digit recognition using a neural network API.

## Features

- **Image Upload**: Upload 28x28 pixel images of handwritten digits
- **Invert Option**: Checkbox to invert colors for images with black backgrounds
- **Real-time Prediction**: Get instant predictions with accuracy and processing time
- **History Tracking**: View all previous predictions with timestamps
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Error Handling**: Comprehensive validation and error messages

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Storage**: localStorage for prediction history
- **Build Tool**: Vite
- **API Communication**: Fetch API

## Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## API Integration

The application connects to a neural network API endpoint:
- **URL**: `http://ec2-54-81-142-28.compute-1.amazonaws.com:8080/predict`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Fields**:
  - `image`: File (28x28 pixel image)
  - `invert`: string ("true" or "false")

## Application Structure

- `/` - Main form for image upload and prediction
- `/history` - View prediction history with clear option

## Image Requirements

- Format: Any image format (PNG, JPG, etc.)
- Size: Exactly 28x28 pixels
- Content: Handwritten digit (0-9)

## Features

### Validation
- File type validation (images only)
- Image size validation (28x28px)
- Required field validation

### Error Handling
- Network error handling
- API error responses
- User-friendly error messages

### History Management
- Automatic saving to localStorage
- Chronological display
- Clear all history option
