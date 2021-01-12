import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarCharts = () => {
  return (
    <>
      <Bar
        height={40}
        width={200}
        options={{
          // maintainAspectRatio: false,
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'No of Students',
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Score',
                },
              },
            ],
          },
        }}
        data={{
          labels: ['red', 'green', 'yellow', 'orange'],
          datasets: [
            {
              label: 'no of votes',
              data: [10, 20, 30, 40],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </>
  );
};

export default BarCharts;
