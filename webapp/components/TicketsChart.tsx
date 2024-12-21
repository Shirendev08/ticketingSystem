import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TicketsChartProps {
  tickets: { month: string; count: number }[];
}

export const TicketsChart = ({ tickets }: TicketsChartProps) => {
  // Prepare data for the chart
  const months = tickets.map(ticket => ticket.month);
  const counts = tickets.map(ticket => ticket.count);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Tickets per Month",
        data: counts,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Tickets per Month",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw} tickets`,
        },
      },
    },
  };

  return (
    <div className="mb-4">
      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-semibold">Tickets per Month</h2>
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};
