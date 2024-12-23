"use client"
import React, { useEffect, useState } from 'react'
import { fetchTicketDetails, updateAssignedTicket } from '@/lib/services';
import { Button } from '@/components/ui/button';

type Ticket = {
  id: number;
  title: string;
  description: string;
  status: "Open" | "Closed";
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
      status: ticket.status, // Only status is being updated here
    };

    try {
      const updated = await updateAssignedTicket(ticket.id, ticketData);
      setUpdatedTicket(updated); // Optionally store the updated ticket data
      setError(null);
    } catch (err) {
      setError("Failed to update ticket");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="ticket-container">
      {ticket ? (
        <div className="ticket-card">
          <div className="ticket-header">
            <h1 className="ticket-title">{ticket.title}</h1>
            <span className={`ticket-status ${ticket.status.toLowerCase()}`}>
              {ticket.status}
            </span>
          </div>
          <div className="ticket-details">
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Created At:</strong> {new Date(ticket.created_at).toLocaleString()}</p>
            <p><strong>Assigned To:</strong> {ticket.assigned_to || "Not assigned"}</p>
            <p><strong>Created By:</strong> {ticket.created_by}</p>
            <p><strong>Status:</strong>
              <select
                value={ticket.status}
                onChange={(e) => setTicket({ ...ticket, status: e.target.value as "Open" | "Closed" })}
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </p>
          </div>
          <div className="ticket-actions">
            <Button onClick={handleUpdate}>Update Status</Button>
            <Button onClick={() => window.history.back()}>Back</Button>
          </div>
          {updatedTicket && <div className="success">Ticket updated successfully</div>}
        </div>
      ) : (
        <div className="not-found">Ticket not found</div>
      )}
    </div>
  );
};

export default Page;
