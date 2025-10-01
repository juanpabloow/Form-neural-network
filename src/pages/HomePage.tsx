import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PredictionService } from '../services/predictionService';
import { LocalStorageService } from '../utils/localStorage';
import { PredictionResponse } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import Alert from '../components/Alert';

const HomePage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [invertImage, setInvertImage] = useState<boolean>(false);
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

    } catch (err) {
      setError('Error making prediction. Please try again.');
    }
  };

  return (
    <Card>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Final Project</h1>
        <p className="text-sm">Upload a 28x28 pixel image of a handwritten digit</p>
      </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Image (28x28px)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm border rounded p-2"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={invertImage}
              onChange={(e) => setInvertImage(e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm">
              Black background?
            </label>
          </div>

          {error && (
            <Alert variant="error">
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            disabled={!selectedFile}
            className="w-full"
          >
            Submit image
          </Button>
        </form>

        {result && (
          <Alert variant="success" className="mt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Predicted Digit:</span>
                <span>{result.prediction}</span>
              </div>
              <div className="flex justify-between">
                <span>Accuracy:</span>
                <span>{(result.accuracy).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Process Time:</span>
                <span>{result.process_time}</span>
              </div>
            </div>
          </Alert>
        )}

      <div className="mt-6 text-center">
        <Link to="/history">
          <Button variant="secondary">
            View History
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default HomePage;