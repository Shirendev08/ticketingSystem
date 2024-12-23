"use client"
import React from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  created_by: string; // Username
  assigned_to: string | null; // Username or null
}

interface TicketTableProps {
  tickets: Ticket[];
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets }) => {
  const router = useRouter();
  

  const handleViewClick = (ticketId: number) => {
    
      router.push(`/assigned-tickets/${ticketId}`); // Navigate to the ticket detail page
   
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>{ticket.description}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>{ticket.priority}</TableCell>
              <TableCell>{new Date(ticket.created_at).toLocaleString()}</TableCell>
              <TableCell>{new Date(ticket.updated_at).toLocaleString()}</TableCell>
              <TableCell>{ticket.created_by}</TableCell>
              <TableCell>{ticket.assigned_to || "Unassigned"}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleViewClick(ticket.id)}
                  className="text-blue-500 hover:underline"
                >
                  View
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketTable;
