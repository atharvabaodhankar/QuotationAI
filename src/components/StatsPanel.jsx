import { useState, useEffect } from 'react';
import analytics from '../utils/analytics';

function StatsPanel() {
  const [stats, setStats] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadStats = () => {
      const usageStats = analytics.getUsageStats();
      setStats(usageStats);
    };

    loadStats();
    // Refresh stats every 5 seconds when panel is open
    const interval = isOpen ? setInterval(loadStats, 5000) : null;
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen]);

  if (!stats || stats.totalQuotations === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        title="View Usage Stats"
      >
        📊
      </button>

      {/* Stats Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-xl shadow-2xl p-4 w-64 border">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Usage Stats</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Quotations:</span>
              <span className="font-medium">{stats.totalQuotations}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg. Project Value:</span>
              <span className="font-medium">₹{Math.round(stats.averageCost).toLocaleString()}</span>
            </div>
            
            {stats.mostCommonProjectType && stats.mostCommonProjectType !== 'unknown' && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Popular Type:</span>
                <span className="font-medium capitalize text-xs">{stats.mostCommonProjectType}</span>
              </div>
            )}
            
            <div className="pt-2 border-t text-xs text-gray-500 text-center">
              Session analytics • Stored locally
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatsPanel;