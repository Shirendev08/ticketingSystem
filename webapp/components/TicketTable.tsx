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

  // Function to return color class based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-green-200 text-green-800";  // Light green background with dark green text
      case "Medium":
        return "bg-yellow-200 text-yellow-800";  // Light yellow background with dark yellow text
      case "High":
        return "bg-red-200 text-red-800";  // Light red background with dark red text
      default:
        return "bg-gray-200 text-gray-800";  // Default color for unknown priority
    }
  };

  // Function to return color class based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-200 text-blue-800";  // Light blue background with dark blue text
      case "Closed":
        return "bg-gray-200 text-gray-800";  // Light gray background with dark gray text
      case "In Progress":
        return "bg-yellow-200 text-yellow-800";  // Light yellow background with dark yellow text
      default:
        return "bg-gray-200 text-gray-800";  // Default color for unknown status
    }
  };

  // Function to return color class based on the time passed since creation
  const getTimeColor = (date: string) => {
    const now = new Date();
    const createdDate = new Date(date);
    const timeDiff = now.getTime() - createdDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

    if (daysDiff < 1) {
      return "bg-green-200 text-green-800";  // Created today
    } else if (daysDiff < 7) {
      return "bg-yellow-200 text-yellow-800";  // Created within the last week
    } else {
      return "bg-red-200 text-red-800";  // Older than a week
    }
  };

  // Function to highlight user created by
  const getCreatedByColor = (createdBy: string) => {
    // You can use a custom logic based on roles or use simple color assignment
    return createdBy === "admin" ? "bg-blue-200 text-blue-800" : "bg-gray-200 text-gray-800";
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead> {/* Add Number column header */}
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
          {tickets.map((ticket, index) => (
            <TableRow key={ticket.id}>
              <TableCell>{index + 1}</TableCell> {/* Display row number */}
              <TableCell>{ticket.title}</TableCell>
              <TableCell>{ticket.description}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded ${getTimeColor(ticket.created_at)}`}>
                  {new Date(ticket.created_at).toLocaleString()}
                </span>
              </TableCell>
              <TableCell>{new Date(ticket.updated_at).toLocaleString()}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded ${getCreatedByColor(ticket.created_by)}`}>
                  {ticket.created_by}
                </span>
              </TableCell>
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
