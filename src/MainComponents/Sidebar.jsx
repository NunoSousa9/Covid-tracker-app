import React, {useEffect, useState} from 'react';
import { getTotalData, getCountryData } from '../API/GetAPI';
import SearchBox from './SearchBox';
import '../styles.css';
import CountryInfoItem from './CountryInfoItem';
import { formatNumberWithSpaces } from '../utils';


const Sidebar = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('cases');
  const [totalData, setTotalData] = useState(null);
  const [sortedCountryData, setSortedCountryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalData = await getTotalData();
        setTotalData(totalData);

        const countriesData = await getCountryData();
        const sortedData = countriesData.sort((a, b) => b[activeTab] - a[activeTab]);
        setSortedCountryData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    onTabChange(tab);
    setActiveTab(tab);
  };

  const getTabData = () => {
    if (activeTab === 'cases') {
      return {
        value: totalData ? totalData.cases : null,
        countryProperty:  'cases'
      };
    } else if (activeTab === 'recovered') {
      return {
        value: totalData ? totalData.recovered : null,
        countryProperty: 'recovered',
      };
    } else if (activeTab === 'deaths') {
      return {
        value: totalData ? totalData.deaths : null,
        countryProperty: 'deaths'
      }
    }
    return null;
  };

  const filterCountries = () => {
    return sortedCountryData.filter(
      (country) =>
        country.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredCountries = filterCountries();

  const tabData = getTabData();

  return (
    <div className="sidebar">
      <div className="tabs">
        <button onClick={() => handleTabChange('cases')}>CASES</button>
        <button onClick={() => handleTabChange('recovered')}>RECOVERED</button>
        <button onClick={() => handleTabChange('deaths')}>DEATHS</button>
      </div>
      <div className="world-total">
        <h2>{formatNumberWithSpaces(tabData.value)}</h2>
      </div>
      <div className="search-box">
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <br></br>
      <div className="country-list">
        <ul>
          {filteredCountries.map((country) => (
            <CountryInfoItem tabData={tabData} country={country} key={country.country} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
