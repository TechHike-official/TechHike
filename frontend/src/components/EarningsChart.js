import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const EarningsChart = ({ myEarnings, partnerEarnings, jointEarnings }) => {
  const data = {
    labels: ['My Earnings', 'Partner Earnings', 'Joint Earnings'],
    datasets: [
      {
        data: [myEarnings, partnerEarnings, jointEarnings],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(16, 185, 129, 0.7)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ₹${context.raw}`;
          }
        }
      }
    },
  };

  return <Pie data={data} options={options} />;
};

export default EarningsChart;