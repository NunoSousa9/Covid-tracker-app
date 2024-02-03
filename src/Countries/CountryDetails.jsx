import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCountryData } from '../API/GetAPI';
import VaccineChart from "./VaccineChart";
import DoughnutChart from "./DoughnutChart";
import { formatNumberWithSpaces } from "../utils";


const CountryDetails = () => {
    const {countryName} = useParams();
    const [countryData, setCountryData] = useState(null);
    

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const data = await getCountryData();
                const selectedCoutry = data.find(country => country.country === countryName);

                setCountryData(selectedCoutry);
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
        };

        fetchCountryData();
    }, [countryName]);



    if (!countryData) {
        return <div>Loading...</div>
    }

    const {country, countryInfo, population, continent, cases, recovered, deaths} = countryData;
    
    const formatedPopulation = formatNumberWithSpaces(population);
    const formatedCases = formatNumberWithSpaces(cases);
    const formatedRecovered = recovered ? formatNumberWithSpaces(recovered) : "Data not available";
    const formatedDeaths = formatNumberWithSpaces(deaths);


    return (
        <div className="content">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '20px' }}>
              <img src={countryInfo?.flag} alt={`${country} Flag`} />
              <h1>{country}</h1>
              <p>Continent: {continent}</p>
              <p>Population: {formatedPopulation}</p>
              <br></br>
              <h2>COVID-19 Stats</h2>
            <p>Cases: {formatedCases}</p>
            <p>Recovered: {formatedRecovered}</p>
            <p>Deaths: {formatedDeaths}</p>
            </div>
            <div style={{ flex: 1 }}>
            <DoughnutChart cases={cases} recovered={recovered || 0} deaths={deaths} height={500} />

            </div>
          </div>
          <div>
            <VaccineChart selectedCountry={countryName} />
          </div>
          <div>
            <Link to="/">BACK</Link>
          </div>
        </div>
      );
    };
    
    export default CountryDetails;