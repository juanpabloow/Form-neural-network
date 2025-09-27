import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PredictionService } from '../services/predictionService';
import { LocalStorageService } from '../utils/localStorage';
import { PredictionResponse } from '../types';

const HomePage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [invertImage, setInvertImage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      setResult(null);
    }
  };

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setError('Please select an image file');
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

    setIsLoading(true);
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Digit Recognition</h1>
          <p className="mt-2 text-gray-600">Upload a 28x28 pixel image of a handwritten digit</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
              Select Image (28x28px)
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="invert-checkbox"
              type="checkbox"
              checked={invertImage}
              onChange={(e) => setInvertImage(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="invert-checkbox" className="ml-2 block text-sm text-gray-900">
              Image has black background (invert colors)
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !selectedFile}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Predict Digit'}
          </button>
        </form>

        {result && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-md p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-3">Prediction Result</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Predicted Digit:</span>
                <span className="text-2xl font-bold text-green-600">{result.prediction}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Accuracy:</span>
                <span>{(result.accuracy * 100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Process Time:</span>
                <span>{result.process_time}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/history"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;