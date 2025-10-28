// src/App.js
import React, { useState, useEffect } from 'react';
import TagInput from './components/TagInput';
import { saveAllergyData, getAllergyDataForDate } from './services/api';
import './App.css';

// Helper function to format date to YYYY-MM-DD
const getFormattedDate = (date) => {
  return date.toISOString().split('T')[0];
};

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hadAllergies, setHadAllergies] = useState(false);
  const [hadCough, setHadCough] = useState(false);
  const [foodEaten, setFoodEaten] = useState('');
  const [allergens, setAllergens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDataForDate = async () => {
      setIsLoading(true);
      const dateString = getFormattedDate(selectedDate);
      const data = await getAllergyDataForDate(dateString);
      console.log('Fetched data:', data);
      
      // Optionally populate form with fetched data if available
      setHadAllergies(data?.has_allergies || false);
      setHadCough(data?.has_cough || false);
      setFoodEaten(data?.food ? data.food.join(', ') : '');
      setAllergens(data?.allergens ? Object.keys(data.allergens) : []);
      
      setIsLoading(false);
    };

    fetchDataForDate();
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };
  
  // New function to go to previous day
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  // New function to go to next day
  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const allergyData = {
      hadAllergies,
      hadCough,
      foodEaten,
      allergens
    };
    
    const dateString = getFormattedDate(selectedDate);
    const response = await saveAllergyData(dateString, allergyData);
    alert(response.message); // Show a confirmation to the user
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className='eye' />
        <h1>Mushi's Allergy Tracker</h1>
        <div className="date-picker-container">
          <button onClick={goToPreviousDay} className="nav-arrow">&lt;</button>
          <input
            type="date"
            id="date-picker"
            value={getFormattedDate(selectedDate)}
            onChange={handleDateChange}
          />
          <button onClick={goToNextDay} className="nav-arrow">&gt;</button>
        </div>
      </header>
      
      <main>
        {isLoading ? (
          <p>Loading data for {getFormattedDate(selectedDate)}...</p>
        ) : (
          <form onSubmit={handleSubmit} className="allergy-form">
            <h2>Tracking for: {selectedDate.toDateString()}</h2>
            
            <div className="form-group toggle-group">
              <label>Did he have allergies?</label>
              <label className="switch">
                <input type="checkbox" checked={hadAllergies} onChange={() => setHadAllergies(!hadAllergies)} />
                <span className="slider round"></span>
              </label>
            </div>
            
            <div className="form-group toggle-group">
              <label>Did he have a cough?</label>
              <label className="switch">
                <input type="checkbox" checked={hadCough} onChange={() => setHadCough(!hadCough)} />
                <span className="slider round"></span>
              </label>
            </div>
            
            <div className="form-group">
              <label htmlFor="food-eaten">What food did he eat?</label>
              <input
                type="text"
                id="food-eaten"
                value={foodEaten}
                onChange={(e) => setFoodEaten(e.target.value)}
                placeholder="e.g., Chicken and Rice"
              />
            </div>
            
            <div className="form-group">
              <label>What allergens were present?</label>
              <TagInput tags={allergens} setTags={setAllergens} />
            </div>
            
            <button type="submit" className="submit-button">Save Today's Entry</button>
          </form>
        )}
      </main>
    </div>
  );
}

export default App;