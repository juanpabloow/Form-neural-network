import { PredictionResponse, PredictionRequest } from '../types';

const API_URL = 'http://ec2-54-81-142-28.compute-1.amazonaws.com:8080/predict';

export class PredictionService {
  static async predictDigit(request: PredictionRequest): Promise<PredictionResponse> {
    const formData = new FormData();
    formData.append('image', request.image);
    formData.append('invert', request.invert);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PredictionResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Prediction failed: ${error.message}`);
      }
      throw new Error('Prediction failed: Unknown error');
    }
  }
}