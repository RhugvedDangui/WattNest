import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LightBulbIcon, 
  BoltIcon, 
  HomeIcon, 
  SunIcon, 
  DeviceTabletIcon,
  ArrowTopRightOnSquareIcon,
  BookmarkIcon,
  ExclamationCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { FloatingNav } from '../components/ui/floating-navbar';

const Tips = () => {
  const [savedTips, setSavedTips] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [consumptionPatterns, setConsumptionPatterns] = useState({
    highUsageAppliances: [],
    peakHours: [],
    inefficientRooms: [],
    seasonalTrends: null
  });
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'lighting', name: 'Lighting', icon: LightBulbIcon, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'appliances', name: 'Appliances', icon: BoltIcon, color: 'bg-orange-100 text-orange-600' },
    { id: 'hvac', name: 'HVAC', icon: SunIcon, color: 'bg-red-100 text-red-600' },
    { id: 'smart-home', name: 'Smart Home', icon: DeviceTabletIcon, color: 'bg-blue-100 text-blue-600' },
    { id: 'general', name: 'General', icon: HomeIcon, color: 'bg-green-100 text-green-600' },
  ];
  
  const tips = [
    {
      id: 1,
      category: 'lighting',
      title: 'Switch to LED Lighting',
      description: 'Replace traditional incandescent bulbs with LED lights to save up to 75% of lighting energy costs.',
      impact: 'High',
      difficulty: 'Easy',
      savings: '$100-150 annually',
      source: 'https://www.energy.gov/energysaver/led-lighting'
    },
    {
      id: 2,
      category: 'lighting',
      title: 'Use Natural Light',
      description: 'Open curtains and blinds during the day to utilize natural light instead of artificial lighting.',
      impact: 'Medium',
      difficulty: 'Easy',
      savings: '$30-50 annually',
      source: 'https://www.energy.gov/energysaver/daylighting'
    },
    {
      id: 3,
      category: 'appliances',
      title: 'Unplug Idle Electronics',
      description: 'Unplug chargers and electronics when not in use to eliminate phantom energy usage.',
      impact: 'Medium',
      difficulty: 'Medium',
      savings: '$50-100 annually',
      source: 'https://www.energy.gov/energysaver/articles/3-easy-tips-reduce-your-standby-power-loads'
    },
    {
      id: 4,
      category: 'appliances',
      title: 'Use Energy Star Appliances',
      description: 'When replacing appliances, choose Energy Star certified models that use 10-50% less energy.',
      impact: 'High',
      difficulty: 'Medium',
      savings: '$100-300 annually',
      source: 'https://www.energystar.gov/'
    },
    {
      id: 5,
      category: 'hvac',
      title: 'Optimize Thermostat Settings',
      description: 'Set your thermostat to 78°F (26°C) in summer and 68°F (20°C) in winter when home, and adjust by 7-10°F when away.',
      impact: 'High',
      difficulty: 'Easy',
      savings: '$180-250 annually',
      source: 'https://www.energy.gov/energysaver/thermostats'
    },
    {
      id: 6,
      category: 'hvac',
      title: 'Regular HVAC Maintenance',
      description: 'Schedule regular maintenance for your HVAC system to ensure optimal efficiency.',
      impact: 'Medium',
      difficulty: 'Medium',
      savings: '$80-120 annually',
      source: 'https://www.energy.gov/energysaver/maintaining-your-air-conditioner'
    },
    {
      id: 7,
      category: 'smart-home',
      title: 'Install Smart Thermostats',
      description: 'Use programmable or smart thermostats to automatically adjust temperature settings based on your schedule.',
      impact: 'High',
      difficulty: 'Medium',
      savings: '$140-200 annually',
      source: 'https://www.energy.gov/energysaver/programmable-thermostats'
    },
    {
      id: 8,
      category: 'smart-home',
      title: 'Smart Power Strips',
      description: 'Use smart power strips to automatically cut power to devices when they\'re not in use.',
      impact: 'Medium',
      difficulty: 'Easy',
      savings: '$60-100 annually',
      source: 'https://www.energy.gov/energysaver/articles/choose-right-advanced-power-strip-you'
    },
    {
      id: 9,
      category: 'general',
      title: 'Conduct an Energy Audit',
      description: 'Perform a home energy audit to identify areas where you can improve energy efficiency.',
      impact: 'High',
      difficulty: 'Medium',
      savings: 'Varies',
      source: 'https://www.energy.gov/energysaver/home-energy-audits'
    },
    {
      id: 10,
      category: 'general',
      title: 'Seal Air Leaks',
      description: 'Seal air leaks around windows, doors, and other openings to prevent energy waste.',
      impact: 'Medium',
      difficulty: 'Medium',
      savings: '$80-120 annually',
      source: 'https://www.energy.gov/energysaver/air-sealing-your-home'
    },
    {
      id: 11,
      category: 'lighting',
      title: 'Install Motion Sensors',
      description: 'Use motion sensors for lights in less frequently used areas to ensure they\'re only on when needed.',
      impact: 'Medium',
      difficulty: 'Easy',
      savings: '$50-75 annually',
      source: 'https://www.energy.gov/energysaver/lighting-controls'
    },
    {
      id: 12,
      category: 'appliances',
      title: 'Full Loads Only',
      description: 'Only run dishwashers and washing machines with full loads to maximize efficiency.',
      impact: 'Low',
      difficulty: 'Easy',
      savings: '$30-50 annually',
      source: 'https://www.energy.gov/energysaver/appliances'
    },
    {
      id: 13,
      category: 'hvac',
      title: 'Use Ceiling Fans',
      description: 'Use ceiling fans to circulate air and reduce the need for air conditioning.',
      impact: 'Medium',
      difficulty: 'Easy',
      savings: '$50-80 annually',
      source: 'https://www.energy.gov/energysaver/fans-cooling'
    },
    {
      id: 14,
      category: 'smart-home',
      title: 'Smart Lighting Controls',
      description: 'Implement smart lighting systems that can be controlled remotely and scheduled.',
      impact: 'Medium',
      difficulty: 'Medium',
      savings: '$70-100 annually',
      source: 'https://www.energy.gov/energysaver/lighting-choices-save-you-money'
    },
    {
      id: 15,
      category: 'general',
      title: 'Insulate Your Home',
      description: 'Ensure proper insulation in walls, attic, and floors to maintain temperature and reduce energy usage.',
      impact: 'High',
      difficulty: 'Hard',
      savings: '$150-250 annually',
      source: 'https://www.energy.gov/energysaver/insulation'
    }
  ];
  
  const filteredTips = tips.filter(tip => {
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tip.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const getImpactColor = (impact) => {
    switch(impact) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  // Load CSV data
  useEffect(() => {
    const loadCSVData = async () => {
      try {
        setLoading(true);
        
        // Load monthly consumption data
        const monthlyResponse = await fetch('/monthly_consumption_prediction.csv');
        const monthlyText = await monthlyResponse.text();
        const parsedMonthlyData = parseCSV(monthlyText);
        setMonthlyData(parsedMonthlyData);
        
        // Load hourly predictions data
        const hourlyResponse = await fetch('/hourly_predictions.csv');
        const hourlyText = await hourlyResponse.text();
        const parsedHourlyData = parseCSV(hourlyText);
        setHourlyData(parsedHourlyData);
        
        // Analyze consumption patterns
        analyzeConsumptionPatterns(parsedMonthlyData, parsedHourlyData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading CSV data:', err);
        setError('Failed to load energy consumption data');
        setLoading(false);
      }
    };
    
    loadCSVData();
  }, []);
  
  // Parse CSV data
  const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).filter(line => line.trim()).map(line => {
      const values = line.split(',');
      const entry = {};
      
      headers.forEach((header, index) => {
        // Try to convert to number if possible
        const value = values[index] ? values[index].trim() : '';
        entry[header.trim()] = isNaN(value) ? value : Number(value);
      });
      
      return entry;
    });
  };
  
  // Analyze consumption patterns from the data
  const analyzeConsumptionPatterns = (monthlyData, hourlyData) => {
    // Skip if data is not loaded
    if (!monthlyData.length || !hourlyData.length) return;
    
    // 1. Identify high usage appliances
    const applianceUsage = {};
    const applianceColumns = ['Light', 'Fan', 'AC', 'TV'];
    
    monthlyData.forEach(entry => {
      applianceColumns.forEach(appliance => {
        if (entry[appliance] !== undefined) {
          applianceUsage[appliance] = (applianceUsage[appliance] || 0) + entry[appliance];
        }
      });
    });
    
    // Sort appliances by usage
    const highUsageAppliances = Object.entries(applianceUsage)
      .sort((a, b) => b[1] - a[1])
      .map(([appliance, usage]) => ({ appliance, usage }));
    
    // 2. Identify peak usage hours
    const hourlyUsage = {};
    
    hourlyData.forEach(entry => {
      const hour = entry.hour !== undefined ? entry.hour : 
                  (entry.timestamp && typeof entry.timestamp === 'string' ? 
                   new Date(entry.timestamp).getHours() : null);
      
      if (hour !== null) {
        const total = entry.Total || 
                    (entry.Light + entry.Fan + entry.AC + entry.TV);
        
        hourlyUsage[hour] = (hourlyUsage[hour] || 0) + total;
      }
    });
    
    // Get top 3 peak hours
    const peakHours = Object.entries(hourlyUsage)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([hour, usage]) => ({ hour: parseInt(hour), usage }));
    
    // 3. Identify inefficient rooms
    const roomEfficiency = {};
    
    monthlyData.forEach(entry => {
      if (entry.roomId !== undefined && entry.Total !== undefined) {
        const roomId = entry.roomId;
        if (!roomEfficiency[roomId]) {
          roomEfficiency[roomId] = { total: 0, count: 0 };
        }
        roomEfficiency[roomId].total += entry.Total;
        roomEfficiency[roomId].count += 1;
      }
    });
    
    // Calculate average consumption per room
    const inefficientRooms = Object.entries(roomEfficiency)
      .map(([roomId, data]) => ({
        roomId,
        average: data.total / data.count
      }))
      .sort((a, b) => b.average - a.average);
    
    // 4. Determine seasonal trends (simplified)
    let seasonalTrends = null;
    
    if (monthlyData.length > 0 && monthlyData[0].month_year) {
      const monthlyTotals = {};
      
      monthlyData.forEach(entry => {
        if (entry.month_year && entry.Total) {
          const month = entry.month_year.split('-')[1]; // Extract month from YYYY-MM
          monthlyTotals[month] = (monthlyTotals[month] || 0) + entry.Total;
        }
      });
      
      const summerMonths = ['05', '06', '07', '08'];
      const winterMonths = ['11', '12', '01', '02'];
      
      let summerTotal = 0;
      let summerCount = 0;
      let winterTotal = 0;
      let winterCount = 0;
      
      Object.entries(monthlyTotals).forEach(([month, total]) => {
        if (summerMonths.includes(month)) {
          summerTotal += total;
          summerCount++;
        } else if (winterMonths.includes(month)) {
          winterTotal += total;
          winterCount++;
        }
      });
      
      const summerAvg = summerCount > 0 ? summerTotal / summerCount : 0;
      const winterAvg = winterCount > 0 ? winterTotal / winterCount : 0;
      
      if (summerAvg > winterAvg * 1.2) {
        seasonalTrends = 'summer';
      } else if (winterAvg > summerAvg * 1.2) {
        seasonalTrends = 'winter';
      }
    }
    
    // Update state with analyzed patterns
    setConsumptionPatterns({
      highUsageAppliances,
      peakHours,
      inefficientRooms,
      seasonalTrends
    });
  };
  
  const toggleSaveTip = (tipId) => {
    if (savedTips.includes(tipId)) {
      setSavedTips(savedTips.filter(id => id !== tipId));
    } else {
      setSavedTips([...savedTips, tipId]);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <FloatingNav navItems={[
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Reports', path: '/reports' },
        { name: 'Tips', path: '/tips' },
        { name: 'Predictions', path: '/predictions' },
        { name: 'Bookings', path: '/bookings' },
      ]} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Energy Saving Tips</h1>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                Discover practical ways to reduce energy consumption and save money
              </p>
            </div>
          </div>
          
          {/* Personalized Recommendations Based on Consumption Patterns */}
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex items-center justify-center">
              <ArrowPathIcon className="h-8 w-8 animate-spin text-orange-500" />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Analyzing your energy usage patterns...</span>
            </div>
          ) : error ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex items-center justify-center">
              <ExclamationCircleIcon className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-gray-700 dark:text-gray-300">{error}</span>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Personalized Recommendations
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Based on your energy consumption patterns
                </p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* High Usage Appliances */}
                {consumptionPatterns.highUsageAppliances.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Appliance-Specific Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {consumptionPatterns.highUsageAppliances.slice(0, 2).map((item, index) => {
                        const appliance = item.appliance;
                        let recommendations = [];
                        
                        // Lighting recommendations
                        if (appliance === 'Light') {
                          recommendations = [
                            "Replace traditional bulbs with LED lighting to save up to 75% energy",
                            "Install motion sensors in less frequently used areas",
                            "Utilize natural light during daytime hours",
                            "Consider smart lighting systems with scheduling capabilities"
                          ];
                        }
                        // AC recommendations
                        else if (appliance === 'AC') {
                          recommendations = [
                            "Set your AC to 24-26°C (75-78°F) for optimal efficiency",
                            "Clean AC filters monthly to maintain efficiency",
                            "Use ceiling fans along with AC to distribute cool air better",
                            "Consider upgrading to an energy-efficient inverter AC"
                          ];
                        }
                        // Fan recommendations
                        else if (appliance === 'Fan') {
                          recommendations = [
                            "Use ceiling fans instead of AC when possible",
                            "Run fans counterclockwise in summer for better cooling",
                            "Turn off fans when leaving the room",
                            "Consider energy-efficient BLDC fans"
                          ];
                        }
                        // TV recommendations
                        else if (appliance === 'TV') {
                          recommendations = [
                            "Enable power-saving mode on your TV",
                            "Reduce screen brightness to save energy",
                            "Unplug TV when not in use to avoid phantom power",
                            "Consider upgrading to an ENERGY STAR certified model"
                          ];
                        }
                        
                        return (
                          <div key={appliance} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                            <div className="flex items-center mb-3">
                              {appliance === 'Light' && <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2" />}
                              {appliance === 'AC' && <SunIcon className="h-6 w-6 text-red-500 mr-2" />}
                              {appliance === 'Fan' && <BoltIcon className="h-6 w-6 text-blue-500 mr-2" />}
                              {appliance === 'TV' && <DeviceTabletIcon className="h-6 w-6 text-purple-500 mr-2" />}
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {appliance} (High Usage)
                              </h4>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                              {recommendations.map((rec, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-orange-500 mr-2">•</span>
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* Peak Hour Recommendations */}
                {consumptionPatterns.peakHours.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Peak Usage Time Recommendations
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <p className="mb-3 text-gray-700 dark:text-gray-300">
                        Your peak energy usage hours are: 
                        <span className="font-medium text-orange-600 dark:text-orange-400">
                          {consumptionPatterns.peakHours.map(item => 
                            ` ${item.hour}:00${item.hour < 12 ? 'AM' : 'PM'}`
                          ).join(', ')}
                        </span>
                      </p>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          Schedule high-energy tasks outside these peak hours
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          Use timers to automatically turn off devices during these hours
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          Consider installing a smart energy management system to optimize usage
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          Unplug non-essential devices during peak hours
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {/* Room-Specific Recommendations */}
                {consumptionPatterns.inefficientRooms.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Room-Specific Recommendations
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <p className="mb-3 text-gray-700 dark:text-gray-300">
                        Room {consumptionPatterns.inefficientRooms[0].roomId} has the highest energy consumption
                      </p>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          Check for air leaks around windows and doors in this room
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          Ensure proper insulation to reduce heating/cooling needs
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          Install energy-efficient window treatments
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          Consider a room-specific energy monitor to track improvements
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {/* Seasonal Recommendations */}
                {consumptionPatterns.seasonalTrends && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Seasonal Recommendations
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <p className="mb-3 text-gray-700 dark:text-gray-300">
                        Your energy usage is higher during {consumptionPatterns.seasonalTrends === 'summer' ? 'summer' : 'winter'} months
                      </p>
                      {consumptionPatterns.seasonalTrends === 'summer' ? (
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            Use window coverings to block heat during the day
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            Set AC temperature to 24-26°C (75-78°F) for optimal efficiency
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            Use ceiling fans to improve air circulation
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            Consider installing reflective roof coating or materials
                          </li>
                        </ul>
                      ) : (
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            Seal drafts around windows and doors
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            Use a programmable thermostat to reduce heating when away
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            Open curtains during the day to let in sunlight and heat
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            Consider adding extra insulation to your home
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for tips..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedCategory === 'all' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                }`}
                onClick={() => setSelectedCategory('all')}
              >
                All Tips
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                    selectedCategory === category.id 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              ))}
              
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                  selectedCategory === 'saved' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                }`}
                onClick={() => setSelectedCategory('saved')}
              >
                <BookmarkIcon className="h-4 w-4 mr-2" />
                Saved Tips ({savedTips.length})
              </button>
            </div>
          </div>
          
          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips
              .filter(tip => selectedCategory !== 'saved' || savedTips.includes(tip.id))
              .map((tip) => {
                const category = categories.find(c => c.id === tip.category);
                
                return (
                  <motion.div
                    key={tip.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className={`p-4 ${category.color} dark:bg-opacity-20`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <category.icon className="h-6 w-6 mr-2" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <button 
                          onClick={() => toggleSaveTip(tip.id)}
                          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <BookmarkIcon 
                            className={`h-5 w-5 ${
                              savedTips.includes(tip.id) 
                                ? 'text-orange-500 fill-orange-500' 
                                : 'text-gray-400 dark:text-gray-500'
                            }`} 
                          />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {tip.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getImpactColor(tip.impact)}`}>
                          Impact: {tip.impact}
                        </span>
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getDifficultyColor(tip.difficulty)}`}>
                          Difficulty: {tip.difficulty}
                        </span>
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-600">
                          Savings: {tip.savings}
                        </span>
                      </div>
                      
                      <a 
                        href={tip.source} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-orange-500 hover:text-orange-600"
                      >
                        Learn more
                        <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
          </div>
          
          {/* Empty State */}
          {filteredTips.filter(tip => selectedCategory !== 'saved' || savedTips.includes(tip.id)).length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
              <LightBulbIcon className="h-16 w-16 mx-auto text-gray-400" />
              <h3 className="mt-4 text-xl font-medium text-gray-800 dark:text-white">
                No tips found
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {selectedCategory === 'saved' 
                  ? "You haven't saved any tips yet. Browse the categories and bookmark tips you find useful."
                  : "Try adjusting your search or filter criteria to find energy saving tips."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tips;
