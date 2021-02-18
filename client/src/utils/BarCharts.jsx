import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarCharts = ({ barData }) => {
  return (
    <>
      <Bar
        height={70}
        width={200}
        options={{
          // maintainAspectRatio: false,
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  userCallback: function (label, index, labels) {
                    // when the floored value is the same as the value we have a whole number
                    if (Math.floor(label) === label) {
                      return label;
                    }
                  },
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
        data={barData}
      />
    </>
  );
};

export default BarCharts;
