import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

interface TicketsSummaryProps {
  total: number;
  solved: number;
  inProgress: number;
}

export const TicketsSummary = ({ total, solved, inProgress }: TicketsSummaryProps) => {
  // Calculate unsolved tickets
  const unsolved = total - solved - inProgress;

  // Data for the pie chart
  const data = {
    labels: ['Solved', 'Unsolved', 'In Progress'],
    datasets: [
      {
        label: 'Tickets Status',
        data: [solved, unsolved, inProgress],
        backgroundColor: ['#34D399', '#F87171', '#FBBF24'], // Green for solved, Red for unsolved, Yellow for in progress
        hoverBackgroundColor: ['#2D6A4F', '#9B2C2C', '#F59E0B'],
      },
    ],
  };

  return (
    <div className="mb-4">
      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-semibold">Ticket Summary</h2>
        <div className="mb-4">
          <p>Total Tickets: {total}</p>
          <p>Solved Tickets: {solved}</p>
          <p>In Progress Tickets: {inProgress}</p>
        </div>
        <div className="w-full h-64">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};
