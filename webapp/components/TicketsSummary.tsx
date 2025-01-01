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
  title?: string; // Optional title prop
}

export const TicketsSummary = ({ total, solved, inProgress, title = "Ticket Summary" }: TicketsSummaryProps) => {
  // Calculate unsolved tickets
  const unsolved = total - solved - inProgress;

  // Data for the pie chart
  const data = {
    labels: ['Solved', 'Unsolved', 'In Progress'],
    datasets: [
      {
        label: 'Хүсэлтийн Төлөв',
        data: [solved, unsolved, inProgress],
        backgroundColor: ['#34D399', '#F87171', '#FBBF24'], // Green for solved, Red for unsolved, Yellow for in progress
      },
    ],
  };

  return (
    <div className="mb-4">
      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="mb-4">
          <p>Нийт Хүсэлтүүд: {total}</p>
          <p>Шийдвэрлэгдсэн Хүсэлт: {solved}</p>
          <p>Хүлээгдэж байгаа хүсэлт: {inProgress}</p>
        </div>
        <div className="w-full h-64">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};
