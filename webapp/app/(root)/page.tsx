"use client"
import { useEffect, useState } from "react";
import { fetchTicketStats } from "@/lib/services";
import { TicketsSummary } from "@/components/TicketsSummary";
import { TicketsChart } from "@/components/TicketsChart";
import { TicketStats } from "@/lib/types";

const Home = () => {
  const [ticketStats, setTicketStats] = useState<TicketStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Fetch ticket statistics from the backend
  useEffect(() => {
    const getTicketStats = async () => {
      try {
        const data = await fetchTicketStats();
        setTicketStats(data);
      } catch (error) {
        console.error("Error fetching ticket stats", error);
      } finally {
        setLoading(false);
      }
    };

    getTicketStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ticketStats) {
    return <div>No data available</div>;
  }

  const { created_by_user, assigned_to_user } = ticketStats;

  return (
    <div className="container mx-auto px-4 py-6">
      
      <h1 className="text-2xl font-bold mb-4">My Tickets</h1>

      {/* Summary of tickets created by the user */}
      <TicketsSummary
  total={created_by_user.total_tickets}
  solved={created_by_user.tickets_by_status.find(
    (stat) => stat.status === "Closed"
  )?.count || 0}
  
  inProgress={created_by_user.tickets_by_status.find(
    (stat) => stat.status === "In Progress"
  )?.count || 0}
/>

{/* Chart for tickets created by the user */}
<TicketsChart tickets={created_by_user.tickets_per_month} />

{/* Summary of tickets assigned to the user */}
<TicketsSummary
  total={assigned_to_user.total_tickets}
  solved={assigned_to_user.tickets_by_status.find(
    (stat) => stat.status === "Closed"
  )?.count || 0}
  inProgress={assigned_to_user.tickets_by_status.find(
    (stat) => stat.status === "In Progress"
  )?.count || 0}
/>

      {/* Chart for tickets assigned to the user */}
      <TicketsChart tickets={assigned_to_user.tickets_per_month} />
      
    </div>

    
  );
};

export default Home;
