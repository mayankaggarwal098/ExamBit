import React from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';

const DoughnutChart = ({ DoughnutData }) => {
  return (
    <Doughnut
      width={200}
      height={70}
      options={{
        // maintainAspectRatio: true,
        responsive: true,
      }}
      data={DoughnutData}
    />
  );
};

export default DoughnutChart;
