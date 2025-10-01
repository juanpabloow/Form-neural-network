import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LocalStorageService } from '../utils/localStorage';
import { PredictionHistoryItem } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);

  useEffect(() => {
    const historyData = LocalStorageService.getHistory();
    setHistory(historyData);
  }, []);


  return (
    <Card large>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Prediction History</h1>
        <Link to="/">
          <Button variant="secondary">
            Back to Form
          </Button>
        </Link>
      </div>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No predictions done</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border-b">Date & Time</th>
                  <th className="px-4 py-2 text-left border-b">Prediction</th>
                  <th className="px-4 py-2 text-left border-b">Accuracy</th>
                  <th className="px-4 py-2 text-left border-b">Process Time</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-2">{item.timestamp}</td>
                    <td className="px-4 py-2">{item.prediction}</td>
                    <td className="px-4 py-2">{(item.accuracy * 100).toFixed(2)}%</td>
                    <td className="px-4 py-2">{item.process_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </Card>
  );
};

export default HistoryPage;