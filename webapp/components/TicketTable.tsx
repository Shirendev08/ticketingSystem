"use client";
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

  // Function to translate priority into Mongolian
  const translatePriority = (priority: string) => {
    switch (priority) {
      case "Low":
        return "Бага"; // Low
      case "Medium":
        return "Дундаж"; // Medium
      case "High":
        return "Өндөр"; // High
      default:
        return "Тодорхойгүй"; // Unknown
    }
  };

  // Function to translate status into Mongolian
  const translateStatus = (status: string) => {
    switch (status) {
      case "Open":
        return "Нээлттэй"; // Open
      case "Closed":
        return "Хаагдсан"; // Closed
      case "In Progress":
        return "Явагдаж байна"; // In Progress
      default:
        return "Тодорхойгүй"; // Unknown
    }
  };

  // Function to return color class based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-green-200 text-green-800"; // Light green background with dark green text
      case "Medium":
        return "bg-yellow-200 text-yellow-800"; // Light yellow background with dark yellow text
      case "High":
        return "bg-red-200 text-red-800"; // Light red background with dark red text
      default:
        return "bg-gray-200 text-gray-800"; // Default color for unknown priority
    }
  };

  // Function to return color class based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-200 text-blue-800"; // Light blue background with dark blue text
      case "Closed":
        return "bg-gray-200 text-gray-800"; // Light gray background with dark gray text
      case "In Progress":
        return "bg-yellow-200 text-yellow-800"; // Light yellow background with dark yellow text
      default:
        return "bg-gray-200 text-gray-800"; // Default color for unknown status
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Дугаар</TableHead> {/* Number */}
            <TableHead>Гарчиг</TableHead> {/* Title */}
            <TableHead>Тайлбар</TableHead> {/* Description */}
            <TableHead>Төлөв</TableHead> {/* Status */}
            <TableHead>Чухал байдал</TableHead> {/* Priority */}
            <TableHead>Үүсгэсэн огноо</TableHead> {/* Created At */}
            <TableHead>Шинэчилсэн огноо</TableHead> {/* Updated At */}
            <TableHead>Үүсгэсэн хэрэглэгч</TableHead> {/* Created By */}
            <TableHead>Хариуцах хүн</TableHead> {/* Assigned To */}
            <TableHead>Дэлгэрэнгүй</TableHead> {/* Detail */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TableRow key={ticket.id}>
              <TableCell>{index + 1}</TableCell> {/* Display row number */}
              <TableCell>{ticket.title}</TableCell>
              <TableCell>{ticket.description}</TableCell>
              <TableCell>
                <div className={`text-center px-2 py-1 rounded ${getStatusColor(ticket.status)}`}>

                  {translateStatus(ticket.status)}
               
                </div>
              </TableCell>
              <TableCell>
                <div className={`px-2 py-1 text-center rounded ${getPriorityColor(ticket.priority)}`}>
                  {translatePriority(ticket.priority)}
                </div>
              </TableCell>
              <TableCell>{new Date(ticket.created_at).toLocaleString()}</TableCell>
              <TableCell>{new Date(ticket.updated_at).toLocaleString()}</TableCell>
              <TableCell>{ticket.created_by}</TableCell>
              <TableCell>{ticket.assigned_to || "Хуваарилаагүй"}</TableCell> {/* Unassigned */}
              <TableCell>
                <button
                  onClick={() => handleViewClick(ticket.id)}
                  className="text-blue-500 hover:underline"
                >
                  Үзэх
                </button> {/* View */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketTable;
