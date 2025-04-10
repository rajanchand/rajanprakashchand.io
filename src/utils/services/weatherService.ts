
/**
 * Gets current weather information based on coordinates
 * @param location Location string with coordinates
 * @returns Promise with weather information
 */
export const getWeatherInfo = async (location: string): Promise<string> => {
  try {
    // Extract coordinates if available
    const coordsMatch = location.match(/Latitude: ([\d.-]+), Longitude: ([\d.-]+)/);
    
    if (!coordsMatch) {
      return 'Weather unavailable';
    }
    
    const latitude = coordsMatch[1];
    const longitude = coordsMatch[2];
    
    // Use OpenMeteo free weather API
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Weather API error');
    }
    
    const data = await response.json();

    // Get the temperature and format it to show in Celsius
    const temperature = data.current?.temperature_2m;
    const weatherUnit = data.current_units?.temperature_2m || '°C';
    
    // Map the weather code to a condition
    const weatherCode = data.current?.weather_code;
    let weatherCondition = 'Unknown';
    
    // Weather code mapping based on WMO codes
    if (weatherCode !== undefined) {
      if (weatherCode === 0) weatherCondition = 'Clear sky';
      else if (weatherCode === 1) weatherCondition = 'Mainly clear';
      else if (weatherCode === 2) weatherCondition = 'Partly cloudy';
      else if (weatherCode === 3) weatherCondition = 'Overcast';
      else if ([45, 48].includes(weatherCode)) weatherCondition = 'Foggy';
      else if ([51, 53, 55, 56, 57].includes(weatherCode)) weatherCondition = 'Drizzle';
      else if ([61, 63, 65, 66, 67].includes(weatherCode)) weatherCondition = 'Rain';
      else if ([71, 73, 75, 77].includes(weatherCode)) weatherCondition = 'Snow';
      else if ([80, 81, 82].includes(weatherCode)) weatherCondition = 'Rain showers';
      else if ([85, 86].includes(weatherCode)) weatherCondition = 'Snow showers';
      else if ([95, 96, 99].includes(weatherCode)) weatherCondition = 'Thunderstorm';
      else weatherCondition = 'Unknown';
    }
    
    return `${weatherCondition}, ${temperature}${weatherUnit}`;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return 'Weather unavailable';
  }
};
