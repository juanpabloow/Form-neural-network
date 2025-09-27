export interface PredictionResponse {
  process_time: string;
  prediction: number;
  accuracy: number;
}

export interface PredictionRequest {
  image: File;
  invert: string;
}

export interface PredictionHistoryItem {
  id: string;
  timestamp: string;
  prediction: number;
  accuracy: number;
  process_time: string;
}