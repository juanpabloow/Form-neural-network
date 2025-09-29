# Technical Documentation - Digit Recognition App

## Overview
This is a React-based web application that uses a neural network API to recognize handwritten digits from uploaded images. The app follows a clean architecture with TypeScript for type safety.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Alert.tsx       # Error/Success message component
│   ├── Button.tsx      # Reusable button component
│   └── Card.tsx        # Layout container component
├── pages/              # Application pages
│   ├── HomePage.tsx    # Main prediction interface
│   └── HistoryPage.tsx # Prediction history viewer
├── services/           # External API communication
│   └── predictionService.ts
├── utils/              # Utility functions
│   └── localStorage.ts # Local storage management
└── types/              # TypeScript type definitions
    └── index.ts
```

## Type Definitions

### Core Interfaces

```typescript
// API Response from neural network
interface PredictionResponse {
  process_time: string;    // Time taken for prediction
  prediction: number;      // Predicted digit (0-9)
  accuracy: number;        // Confidence level (0-1)
}

// Request payload sent to API
interface PredictionRequest {
  image: File;            // Image file (28x28px)
  invert: string;         // "true" or "false" for color inversion
}

// Local storage history item
interface PredictionHistoryItem {
  id: string;             // Unique identifier (timestamp)
  timestamp: string;      // Human-readable date/time
  prediction: number;     // Predicted digit
  accuracy: number;       // Confidence level
  process_time: string;   // Processing time
}
```

## State Management

### HomePage State Variables

```typescript
const HomePage: React.FC = () => {
  // File handling
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // UI configuration
  const [invertImage, setInvertImage] = useState<boolean>(false);

  // Results and errors
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string>('');
};
```

### HistoryPage State Variables

```typescript
const HistoryPage: React.FC = () => {
  // History data from localStorage
  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);
};
```

## Service Layer

### PredictionService

Handles communication with the neural network API:

```typescript
class PredictionService {
  static async predictDigit(request: PredictionRequest): Promise<PredictionResponse> {
    // 1. Create FormData with image and invert flag
    const formData = new FormData();
    formData.append('image', request.image);
    formData.append('invert', request.invert);

    // 2. Send POST request to AWS EC2 instance
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    // 3. Handle errors and return JSON response
    if (!response.ok) {
      throw new Error('Failed to get prediction');
    }
    return await response.json();
  }
}
```

**API Endpoint:** `http://ec2-54-81-142-28.compute-1.amazonaws.com:8080/predict`

### LocalStorageService

Manages prediction history persistence:

```typescript
class LocalStorageService {
  // Retrieve all stored predictions
  static getHistory(): PredictionHistoryItem[] {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  }

  // Add new prediction to history
  static addPrediction(prediction: Omit<PredictionHistoryItem, 'id' | 'timestamp'>): void {
    const history = this.getHistory();
    const newItem: PredictionHistoryItem = {
      ...prediction,
      id: Date.now().toString(),           // Generate unique ID
      timestamp: new Date().toLocaleString(), // Human-readable timestamp
    };
    history.unshift(newItem);  // Add to beginning of array
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
}
```

## Component Architecture

### Reusable Components

#### Card Component
```typescript
interface CardProps {
  children: React.ReactNode;
  large?: boolean;  // false = max-w-md, true = max-w-4xl
}
```
- Provides consistent layout container
- Handles responsive centering and background
- Two size variants: normal and large

#### Button Component
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';  // Blue vs gray styling
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}
```
- Reusable button with consistent styling
- Disabled state handling

#### Alert Component
```typescript
interface AlertProps {
  children: React.ReactNode;
  variant?: 'error' | 'success';  // Red vs green styling
  className?: string;
}
```
- Displays error and success messages
- Consistent color coding and spacing

## Page-Level Integration

### HomePage Flow

1. **Initial State Setup**
   ```typescript
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [invertImage, setInvertImage] = useState<boolean>(false);
   const [result, setResult] = useState<PredictionResponse | null>(null);
   const [error, setError] = useState<string>('');
   ```

2. **File Selection Handler**
   ```typescript
   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const file = event.target.files?.[0];
     if (file) {
       setSelectedFile(file);  // Store selected file
       setError('');           // Clear previous errors
       setResult(null);        // Clear previous results
     }
   };
   ```

3. **Image Validation**
   ```typescript
   const validateImage = (file: File): Promise<boolean> => {
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
   ```

4. **Form Submission Handler**
   ```typescript
   const handleSubmit = async (event: React.FormEvent) => {
     event.preventDefault();

     // Validation checks
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

     // API call
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

     } catch (err) {
       setError('Error making prediction. Please try again.');
     }
   };
   ```

### HistoryPage Flow

1. **Data Loading**
   ```typescript
   const [history, setHistory] = useState<PredictionHistoryItem[]>([]);

   useEffect(() => {
     const historyData = LocalStorageService.getHistory();
     setHistory(historyData);
   }, []);
   ```

2. **Data Display**
   - Empty state when no predictions exist
   - Table format with prediction details
   - Chronological order (newest first)

## Data Flow Summary

```
1. User uploads 28x28 image file
   ↓
2. File validation (size, type, dimensions)
   ↓
3. FormData creation with image + invert flag
   ↓
4. POST request to neural network API
   ↓
5. Response with prediction, accuracy, process_time
   ↓
6. Display results to user
   ↓
7. Save to localStorage for history
   ↓
8. History page displays all past predictions
```

## Key Features

- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive validation and error states
- **Local Persistence**: Prediction history stored in localStorage
- **Responsive Design**: Tailwind CSS for mobile-friendly UI
- **Component Reusability**: Modular, reusable UI components
- **Clean Architecture**: Separation of concerns (services, utils, components)

## API Integration

The app connects to a neural network model hosted on AWS EC2 that:
- Accepts 28x28 pixel images of handwritten digits
- Supports color inversion for images with black backgrounds
- Returns predictions with confidence scores and processing times
- Expects multipart/form-data requests with 'image' and 'invert' fields