import { PredictionHistoryItem } from '../types';

const HISTORY_KEY = 'digit-recognition-history';

export class LocalStorageService {
  static getHistory(): PredictionHistoryItem[] {
    try {
      const history = localStorage.getItem(HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error reading history from localStorage:', error);
      return [];
    }
  }

  static addPrediction(prediction: Omit<PredictionHistoryItem, 'id' | 'timestamp'>): void {
    try {
      const history = this.getHistory();
      const newItem: PredictionHistoryItem = {
        ...prediction,
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
      };

      history.unshift(newItem);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving prediction to localStorage:', error);
    }
  }

  static clearHistory(): void {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing history from localStorage:', error);
    }
  }
}