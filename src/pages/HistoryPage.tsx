import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LocalStorageService } from '../utils/localStorage';
import { PredictionHistoryItem } from '../types';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);

  useEffect(() => {
    const loadHistory = () => {
      const historyData = LocalStorageService.getHistory();
      setHistory(historyData);
    };

    loadHistory();
  }, []);

  const handleClearHistory = () => {
    const confirmClear = window.confirm('Are you sure you want to clear all history?');
    if (confirmClear) {
      LocalStorageService.clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Prediction History</h1>
              <div className="flex space-x-3">
                <button
                  onClick={handleClearHistory}
                  disabled={history.length === 0}
                  className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Clear History
                </button>
                <Link
                  to="/"
                  className="px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back to Form
                </Link>
              </div>
            </div>
          </div>

          <div className="px-6 py-4">
            {history.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No predictions yet</div>
                <p className="text-gray-400 mt-2">Make your first prediction to see it here!</p>
                <Link
                  to="/"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Make Prediction
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prediction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Accuracy
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Process Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {history.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-2xl font-bold text-blue-600">
                            {item.prediction}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {(item.accuracy * 100).toFixed(2)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.process_time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;