import { PredictionHistoryItem } from '../types';
const HISTORY_KEY = 'digit-recognition-history';
export class LocalStorageService {
    static getHistory() {
        const history = localStorage.getItem(HISTORY_KEY);
        return history ? JSON.parse(history) : [];
    }
    static addPrediction(prediction) {
        const history = this.getHistory();
        const newItem = {
            ...prediction,
            id: Date.now().toString(),
            timestamp: new Date().toLocaleString(),
        };
        history.unshift(newItem);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
    static clearHistory() {
        localStorage.removeItem(HISTORY_KEY);
    }
}
//# sourceMappingURL=localStorage.js.map