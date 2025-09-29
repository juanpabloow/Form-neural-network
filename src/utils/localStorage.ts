import { PredictionHistoryItem } from '../types';

const HISTORY_KEY = 'digit-recognition-history';

export class LocalStorageService {
  static getHistory(): PredictionHistoryItem[] {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  }

  static addPrediction(prediction: Omit<PredictionHistoryItem, 'id' | 'timestamp'>): void {
    const history = this.getHistory();
    const newItem: PredictionHistoryItem = {
      ...prediction,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
    };

    history.unshift(newItem);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }

  static clearHistory(): void {
    localStorage.removeItem(HISTORY_KEY);
  }
}