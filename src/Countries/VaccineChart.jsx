import { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import { getVaccineData } from "../API/GetAPI";

const VaccineChart = ({ selectedCountry }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {

        const fetchVaccineData = async () => {
            let selectedCountryVaccineData;
            try {
                const vaccineData = await getVaccineData();
                selectedCountryVaccineData = vaccineData.find(
                    (data) => data.country === selectedCountry
                );

            if(selectedCountryVaccineData) {
                const dates = Object.keys(selectedCountryVaccineData.timeline);
                const vaccinationData = Object.values(selectedCountryVaccineData.timeline);

                const ctx = chartRef.current.getContext('2d');

                if(ctx) {
                    if (chartInstance.current) {
                        chartInstance.current.destroy();
                    }

                    chartInstance.current = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: dates,
                            datasets: [
                                {
                                    label: 'Vaccination',
                                    data: vaccinationData,
                                    borderColor: 'blue',
                                    borderWidth: 1,
                                    fill: true,
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
            }
        } catch (error) {
            console.error('Error fetching vaccine data:', error);
        }
    };

    fetchVaccineData();

    return () => {
        if(chartInstance.current) {
            chartInstance.current.destroy();
        }
    };
}, [selectedCountry]);

return (
    <div>
        <h1>Vaccination Coverage Chart</h1>
        <canvas ref={chartRef} width={200} height={100}></canvas>
    </div>
);
};

export default VaccineChart;