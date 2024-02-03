import { useEffect, useRef } from "react";
import { Chart } from "chart.js";


const DoughnutChart = ({cases, recovered, deaths, height}) => {
    const chartRef = useRef(null);
    let chartInstance = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const recoveredValue = recovered || 0;

        if(ctx) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        chartInstance.current = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Cases", "Recovered", "Deaths"],
                datasets: [
                    {
                        label: "COVID-19 Cases",
                        data: [cases, recoveredValue, deaths],
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, 
                width: 500,
                height: height || 500,
            },
        });

    }

        return () => {
            if(chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [cases, recovered, deaths]);

    return (
        <div> 
            <canvas ref= {chartRef}></canvas>
        </div>
    );
};

export default DoughnutChart;