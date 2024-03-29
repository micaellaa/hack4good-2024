"use client";

import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import getActivityCountByCause from "../../utils/reports/getActivityCountByCause";
import causes from "../../utils/reports/causes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CauseActivities = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          causeCountArrayVolunteering,
          causeCountArrayWorkshop,
          causeCountArrayTraining,
          causeCountArray,
        ] = await getActivityCountByCause();

        setChartData({
          labels: causes,
          datasets: [
            {
              label: "# Volunteerinig",
              data: causeCountArrayVolunteering,
              backgroundColor: "rgb(255, 99, 132, 0.4)",
            },
            {
              label: "# Workshops",
              data: causeCountArrayWorkshop,
              backgroundColor: "rgb(75, 192, 192, 0.4)",
            },
            {
              label: "# Trainings",
              data: causeCountArrayTraining,
              backgroundColor: "rgb(53, 162, 235, 0.4)",
            },
          ],
        });
        setChartOptions({
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Number of activities held for each cause",
            },
          },
          maintainAspectRatio: false,
          responsive: true,
          scale: {
            ticks: {
              precision: 0,
            },
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "white", height: "400px" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default CauseActivities;
