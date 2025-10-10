
export const saveAllergyData = async (date, data) => {
    console.log(`[API MOCK] Saving data for date: ${date}`);
    console.log('Data:', data);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true, message: `Data for ${date} saved successfully.` };
  };

  export const getAllergyDataForDate = async (date) => {
    console.log(`[API MOCK] Fetching data for date: ${date}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      date,
      hadAllergies: Math.random() > 0.5,
      hadCough: Math.random() > 0.5,
      foodEaten: 'Tuna & Salmon Mix',
      allergens: ['Pollen', 'Dust Mites']
    };
  };
  

  export const getAllergyDataForDateRange = async (startDate, endDate) => {
    console.log(`[API MOCK] Fetching data from ${startDate} to ${endDate}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return some dummy data for demonstration
    return [
      { date: startDate, hadAllergies: true, hadCough: false, foodEaten: 'Chicken Feast', allergens: ['Grass'] },
      { date: endDate, hadAllergies: false, hadCough: true, foodEaten: 'Turkey Giblets', allergens: ['Mold'] }
    ];
  };