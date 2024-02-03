const getTotalData = async () => {
    try {
      const totalResponse = await fetch('https://disease.sh/v3/covid-19/all');
      const totalData = await totalResponse.json();
      return totalData;
    } catch (error) {
      console.error('Error fetching total data:', error);
      throw new Error('Failed to fetch total data');
    }
  };
  
  const getCountryData = async () => {
    try {
      const countriesResponse = await fetch('https://disease.sh/v3/covid-19/countries');
      const countriesData = await countriesResponse.json();
      return countriesData;
    } catch (error) {
      console.error('Error fetching country data:', error);
      throw new Error('Failed to fetch country data');
    }
  };
  
  const getHistoricalData = async () => {
    try {
      const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw new Error('Failed to fetch historical data');
    }
  };

  const getVaccineData = async () => {
    try {
      const response = await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1115`);
      const vaccineData = await response.json();
      return vaccineData;
    } catch (error) {
      console.error('Error fetching vaccine data:', error);
      throw new Error('Failed to fetch vaccine data');
    }
  };
  
  export { getTotalData, getCountryData, getHistoricalData, getVaccineData };
  