"use client";
import React, { useEffect, useState } from "react";
import { fetchTicketDetails, updateAssignedTicket } from "@/lib/services";
import { Button } from "@/components/ui/button";

type Ticket = {
  id: number;
  title: string;
  description: string;
  status: "Open" | "Closed" | "In Progress";
  priority: "Low" | "Medium" | "High";
  created_at: string; // ISO string for the datetime
  updated_at: string; // ISO string for the datetime
  created_by: string; // Username of the ticket creator
  assigned_to: string | null; // Username of the assigned user, null if unassigned
};

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedTicket, setUpdatedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const getTicketDetails = async () => {
      try {
        const ticketData = await fetchTicketDetails(Number(id));
        setTicket(ticketData);
      } catch (err) {
        setError("Failed to fetch ticket details");
      } finally {
        setLoading(false);
      }
    };

    getTicketDetails();
  }, [id]);

  const handleUpdate = async () => {
    if (!ticket) return;

    const ticketData = {
      ...ticket,
      status: ticket.status,
    };

    try {
      const updated = await updateAssignedTicket(ticket.id, ticketData);
      setUpdatedTicket(updated);
      setError(null);
    } catch (err) {
      setError("Failed to update ticket");
      console.error(err);
    }
  };

  if (loading)
    return <div className="loading text-center text-xl text-gray-500">Loading...</div>;
  if (error)
    return <div className="error text-center text-xl text-red-500">{error}</div>;

  return (
    <div className="ticket-container flex justify-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-50">
      <div className="max-w-4xl w-full p-6 bg-white shadow-lg rounded-lg transform -translate-x-1/2 absolute left-1/2 mt-20">
        {ticket ? (
          <div className="ticket-card space-y-6">
            {/* Header */}
            <div className="ticket-header flex justify-between items-center border-b pb-4">
              <h1 className="ticket-title text-3xl font-bold text-gray-900">{ticket.title}</h1>
              <span
                className={`ticket-status px-4 py-2 rounded-full text-white ${
                  ticket.status === "Open"
                    ? "bg-blue-500"
                    : ticket.status === "Closed"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              >
                {ticket.status}
              </span>
            </div>

            {/* Details */}
            <div className="ticket-details space-y-4">
              <p className="text-lg">
                <strong>Description:</strong> {ticket.description}
              </p>
              <p className="text-lg">
                <strong>Priority:</strong>{" "}
                <span
                  className={`badge px-3 py-1 rounded ${
                    ticket.priority === "Low"
                      ? "bg-green-200 text-green-800"
                      : ticket.priority === "Medium"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {ticket.priority}
                </span>
              </p>
              <p className="text-lg">
                <strong>Created At:</strong> {new Date(ticket.created_at).toLocaleString()}
              </p>
              <p className="text-lg flex items-center">
                <strong className="mr-2">Assigned To:</strong>{" "}
                {ticket.assigned_to ? (
                  <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded">
                    {ticket.assigned_to}
                  </span>
                ) : (
                  <span className="italic text-gray-500">Not assigned</span>
                )}
              </p>
              <p className="text-lg flex items-center">
                <strong className="mr-2">Created By:</strong>{" "}
                <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded">
                  {ticket.created_by}
                </span>
              </p>
              <p className="text-lg">
                <strong>Status:</strong>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    setTicket({ ...ticket, status: e.target.value as "Open" | "Closed" | "In Progress" })
                  }
                  className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </p>
            </div>

            {/* Actions */}
            <div className="ticket-actions space-x-4 flex justify-end">
              <Button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Update Status
              </Button>
              <Button
                onClick={() => window.history.back()}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Back
              </Button>
            </div>

            {/* Success Message */}
            {updatedTicket && (
              <div className="success text-green-500 text-center mt-4">
                Ticket updated successfully
              </div>
            )}
          </div>
        ) : (
          <div className="not-found text-center text-xl text-gray-500">
            Ticket not found
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
