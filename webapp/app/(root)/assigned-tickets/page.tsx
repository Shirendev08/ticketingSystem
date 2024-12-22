"use client"
import React, { useEffect, useState } from "react";
import TicketTable from "@/components/TicketTable";
import { fetchAssignedTickets } from "@/lib/services";
const Page: React.FC = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchAssignedTickets();
        // Set the fetched tickets data
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    loadTickets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Tickets</h1>
      {/* Pass the tickets to the TicketTable component */}
      <TicketTable tickets={tickets} />
    </div>
  );
};

export default Page;