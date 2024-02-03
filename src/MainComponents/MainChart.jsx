import React, {useEffect, useState} from 'react';
import Chart from 'chart.js/auto';
import { getHistoricalData } from '../API/GetAPI';


const MainChart = ({ activeTab }) => {
  const [historicalData, setHistoricalData] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const data = await getHistoricalData();
        setHistoricalData(data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData();
  }, []);

  useEffect(() => {
    let chart = null;

    if(historicalData) {

      const ctx = document.getElementById('main-chart').getContext('2d');
      if(chart) {
        chart.destroy();
      }

      const datasetLabel =
        activeTab === 'cases' ? 'Cases'
        : activeTab === 'recovered' ? 'Recovered'
        : 'Deaths';

      const filteredData =
        activeTab === 'recovered'
        ? Object.entries(historicalData[activeTab])
          .filter(([date, value]) => {
            return value != null && new Date(date) <= new Date('2021-04-08');
          }) 
          .reduce((acc, [date, value]) => {
            acc[date] = value;
            return acc;
          }, {})
          : historicalData[activeTab];

      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(filteredData),
          datasets: [
            {
              label: datasetLabel,
              data: Object.values(filteredData),
              borderColor: activeTab === 'cases' ? 'rgb(101, 152, 223)'
                : activeTab === 'recovered' ? 'rgb(59, 147, 42)'
                : 'grey',
              fill: true,
              backgroundColor: activeTab === 'cases' ? 'white'
                : activeTab === 'recovered' ? 'white'
                : 'white',
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [historicalData, activeTab]);
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas id="main-chart" />
    </div>
  );
};

export default MainChart;