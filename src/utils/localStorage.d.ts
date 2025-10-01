import { PredictionHistoryItem } from '../types';
export declare class LocalStorageService {
    static getHistory(): PredictionHistoryItem[];
    static addPrediction(prediction: Omit<PredictionHistoryItem, 'id' | 'timestamp'>): void;
    static clearHistory(): void;
}
//# sourceMappingURL=localStorage.d.ts.map