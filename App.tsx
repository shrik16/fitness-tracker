import { useState, useEffect } from 'react';
import { Activity, Calendar, Moon, ScrollText, Settings, User, Users, Utensils, TrendingUp, Award, Home, LogIn, UserPlus } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Layout from './components/common/Layout';
import StepCounter from './components/dashboard/StepCounter';
import GoalProgress from './components/dashboard/GoalProgress';
import CalorieTracker from './components/dashboard/CalorieTracker';
import ActivityCard from './components/dashboard/ActivityCard';
import WaterIntake from './components/nutrition/WaterIntake';
import NutritionSummary from './components/nutrition/NutritionSummary';
import { SleepAnalysis } from './components/sleep analysis/SleepAnalysis';
import { ChartBarIcon, FireIcon, HeartIcon } from '@heroicons/react/24/outline';

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  
  // Mock data for demonstration
  const mockData = {
    steps: {
      goal: 10000,
      current: 7520,
      weekly: [
        { day: "Mon", steps: 9123 },
        { day: "Tue", steps: 7890 },
        { day: "Wed", steps: 10245 },
        { day: "Thu", steps: 8765 },
        { day: "Fri", steps: 7520 },
        { day: "Sat", steps: 0 },
        { day: "Sun", steps: 0 }
      ]
    },
    calories: {
      burned: 1850,
      consumed: 1600,
      goal: 2200,
      breakdown: [
        { name: 'Breakfast', value: 450 },
        { name: 'Lunch', value: 650 },
        { name: 'Dinner', value: 500 },
      ]
    },
    active: {
      minutes: 85,
      goal: 120,
      hourly: [
        { hour: '6am', active: 5 },
        { hour: '8am', active: 15 },
        { hour: '10am', active: 10 },
        { hour: '12pm', active: 20 },
        { hour: '2pm', active: 5 },
        { hour: '4pm', active: 25 },
        { hour: '6pm', active: 5 },
      ]
    },
    sleep: {
      hours: 7.5,
      quality: 85,
      weekly: [
        { day: "Mon", hours: 7.2 },
        { day: "Tue", hours: 6.8 },
        { day: "Wed", hours: 8.1 },
        { day: "Thu", hours: 7.5 },
        { day: "Fri", hours: 7.5 },
        { day: "Sat", hours: 0 },
        { day: "Sun", hours: 0 }
      ]
    },
    weight: {
      current: 158,
      goal: 150,
      weekly: [
        { date: "Apr 10", weight: 160 },
        { date: "Apr 11", weight: 159.5 },
        { date: "Apr 12", weight: 159 },
        { date: "Apr 13", weight: 158.5 },
        { date: "Apr 14", weight: 158 },
        { date: "Apr 15", weight: 158 },
        { date: "Apr 16", weight: 158 }
      ]
    },
    workouts: [
      { id: 1, type: "Running", duration: 32, calories: 320, date: "Apr 16" },
      { id: 2, type: "Strength", duration: 45, calories: 280, date: "Apr 15" },
      { id: 3, type: "Cycling", duration: 60, calories: 450, date: "Apr 14" }
    ],
    achievements: [
      { id: 1, name: "Step Master", description: "Reach 10,000 steps for 5 days straight", completed: true },
      { id: 2, name: "Early Bird", description: "Work out before 8am", completed: true },
      { id: 3, name: "Marathon Prep", description: "Run 50 miles total", completed: false, progress: 35 }
    ],
    leaderboard: [
      { id: 1, name: "Sarah M.", steps: 12456, rank: 1 },
      { id: 2, name: "John D.", steps: 10982, rank: 2 },
      { id: 3, name: "You", steps: 7520, rank: 3 },
      { id: 4, name: "Mike P.", steps: 7102, rank: 4 },
      { id: 5, name: "Lisa T.", steps: 6843, rank: 5 }
    ]
  };

  // Login function
  const handleLogin = () => {
    setUser({
      name: "Alex Smith",
      email: "alex@example.com",
      avatar: "/api/placeholder/40/40",
      joined: "March 2025"
    });
  };

  // Sign up function
  const handleSignUp = (e) => {
    e.preventDefault();
    handleLogin(); // Auto login after signup for demo
    setCurrentPage('dashboard');
  };

  // Log out function
  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  // Automatically navigate to login page if no user
  useEffect(() => {
    if (!user && currentPage !== 'signup') {
      setCurrentPage('login');
    }
  }, [user, currentPage]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Step data
  const [stepData] = useState({
    dailySteps: [
      { date: '2024-04-09', steps: 8432 },
      { date: '2024-04-10', steps: 10234 },
      { date: '2024-04-11', steps: 7648 },
      { date: '2024-04-12', steps: 9123 },
      { date: '2024-04-13', steps: 11456 },
      { date: '2024-04-14', steps: 8765 },
      { date: '2024-04-15', steps: 6543 },
    ],
    goalSteps: 10000
  });

  // Calorie data
  const calorieData = {
    consumed: 1800,
    burned: 2200,
    goal: 2000,
    meals: [
      { id: 1, name: 'Breakfast', calories: 400 },
      { id: 2, name: 'Lunch', calories: 600 },
      { id: 3, name: 'Dinner', calories: 800 }
    ]
  };

  // Goals data
  const goals = [
    {
      id: '1',
      name: 'Daily Steps',
      current: stepData.dailySteps[stepData.dailySteps.length - 1].steps,
      target: stepData.goalSteps,
      unit: 'steps',
      icon: <ChartBarIcon className="w-4 h-4 text-white" />,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Calories Burned',
      current: 1800,
      target: 2500,
      unit: 'kcal',
      icon: <FireIcon className="w-4 h-4 text-white" />,
      color: 'bg-orange-500'
    },
    {
      id: '3',
      name: 'Active Minutes',
      current: 45,
      target: 60,
      unit: 'min',
      icon: <HeartIcon className="w-4 h-4 text-white" />,
      color: 'bg-red-500'
    }
  ];

  // Activities data
  const activities = [
    { id: 1, name: 'Morning Run', duration: '30 min', calories: 320, time: '07:30 AM' },
    { id: 2, name: 'Yoga', duration: '45 min', calories: 150, time: '09:00 AM' },
    { id: 3, name: 'Weight Training', duration: '60 min', calories: 400, time: '05:30 PM' }
  ];

  // Nutrition data
  const nutritionData = {
    calories: 2100,
    protein: 150,
    carbs: 200,
    fat: 70,
    meals: [
      { name: 'Breakfast', calories: 450, time: '8:30 AM' },
      { name: 'Lunch', calories: 700, time: '12:30 PM' },
      { name: 'Snack', calories: 200, time: '3:30 PM' },
      { name: 'Dinner', calories: 750, time: '7:30 PM' },
    ]
  };

  // Sleep data
  const sleepData = {
    hoursSlept: 7.5,
    sleepQuality: 85,
    bedTime: '11:30 PM',
    wakeTime: '7:00 AM',
    deepSleep: 2.5,
    lightSleep: 3.5,
    remSleep: 1.5
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Fitness Dashboard</h1>
          <p className="text-gray-500">Track your daily progress</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Main Stats - Full Width */}
          <div className="md:col-span-2 xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <StepCounter 
              dailySteps={stepData.dailySteps}
              goalSteps={stepData.goalSteps}
            />
            <CalorieTracker 
              data={calorieData}
            />
          </div>

          {/* Secondary Stats */}
          <WaterIntake 
            dailyGoal={2500}
          />
          <NutritionSummary 
            data={nutritionData}
          />
          <SleepAnalysis 
            data={sleepData}
          />
          <GoalProgress 
            goals={goals}
          />
          <div className="xl:col-span-2">
            <ActivityCard 
              activities={activities}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Single default export
export default App;       
