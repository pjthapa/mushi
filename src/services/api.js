const API_BASE_URL = 'https://vercel-backend-ten-amber.vercel.app/api'; // Replace with your actual backend URL

export const saveAllergyData = async (date, data) => {
  console.log(`[API] Saving data for date: ${date}`);
  console.log('Data:', data);

  const payload = {
    date: date,
    hasAllergies: data.hadAllergies,
    hasCough: data.hadCough,
    allergens: data.allergens.reduce((acc, allergen) => {
      acc[allergen] = true; // Assuming all listed allergens are present
      return acc;
    }, {}),
    food: data.foodEaten.split(',').map(item => item.trim()).filter(item => item !== ''),
    overwrite: false // Or handle this based on your application logic
  };

  try {
    const response = await fetch(`${API_BASE_URL}/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save allergy data');
    }

    const result = await response.json();
    return { success: true, message: result.message || `Data for ${date} saved successfully.` };
  } catch (error) {
    console.error('Error saving allergy data:', error);
    return { success: false, message: error.message || 'An unexpected error occurred.' };
  }
};

export const getAllergyDataForDate = async (date) => {
  console.log(`[API] Fetching data for date: ${date}`);

  try {
    const response = await fetch(`${API_BASE_URL}/data/${date}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null; // No data found for this date
      }
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch allergy data for ${date}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching allergy data:', error);
    return null; // Return null or an empty object in case of an error
  }
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