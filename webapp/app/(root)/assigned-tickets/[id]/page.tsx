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

const translateStatus = (status: Ticket["status"]) => {
  switch (status) {
    case "Open":
      return "Нээлттэй";
    case "Closed":
      return "Хаагдсан";
    case "In Progress":
      return "Явцтай";
    default:
      return status;
  }
};

const translatePriority = (priority: Ticket["priority"]) => {
  switch (priority) {
    case "Low":
      return "Бага";
    case "Medium":
      return "Дунд";
    case "High":
      return "Өндөр";
    default:
      return priority;
  }
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
        setError("Мэдээллийг татаж чадсангүй");
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
      setError("Тасалбарыг шинэчлэхэд алдаа гарлаа");
      console.error(err);
    }
  };

  if (loading)
    return <div className="loading text-center text-xl text-gray-500"><strong>Ачааллаж байна...</strong></div>;
  if (error)
    return <div className="error text-center text-xl text-red-500"><strong>{error}</strong></div>;

  return (
    <div className="ticket-container flex justify-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-50">
      <div className="max-w-4xl w-full p-6 bg-white shadow-lg rounded-lg transform -translate-x-1/2 absolute left-1/2 mt-20">
        {ticket ? (
          <div className="ticket-card space-y-6">
            {/* Header */}
            <div className="ticket-header flex justify-between items-center border-b pb-4">
              <h1 className="ticket-title text-3xl font-bold text-gray-900">
                <strong>{ticket.title}</strong>
              </h1>
              <span
                className={`ticket-status px-4 py-2 rounded-full text-white ${
                  ticket.status === "Open"
                    ? "bg-blue-500"
                    : ticket.status === "Closed"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              >
                <strong>{translateStatus(ticket.status)}</strong>
              </span>
            </div>

            {/* Details */}
            <div className="ticket-details space-y-4">
              <p className="text-lg">
                <strong>Тайлбар:</strong> <strong>{ticket.description}</strong>
              </p>
              <p className="text-lg">
                <strong>Чухал байдал:</strong>{" "}
                <span
                  className={`badge px-3 py-1 rounded ${
                    ticket.priority === "Low"
                      ? "bg-green-200 text-green-800"
                      : ticket.priority === "Medium"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  <strong>{translatePriority(ticket.priority)}</strong>
                </span>
              </p>
              <p className="text-lg">
                <strong>Үүсгэсэн огноо:</strong> <strong>{new Date(ticket.created_at).toLocaleString()}</strong>
              </p>
              <p className="text-lg flex items-center">
                <strong className="mr-2">Хариуцагч:</strong>{" "}
                {ticket.assigned_to ? (
                  <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded">
                    <strong>{ticket.assigned_to}</strong>
                  </span>
                ) : (
                  <span className="italic text-gray-500"><strong>Хариуцагч байхгүй</strong></span>
                )}
              </p>
              <p className="text-lg flex items-center">
                <strong className="mr-2">Үүсгэсэн:</strong>{" "}
                <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded">
                  <strong>{ticket.created_by}</strong>
                </span>
              </p>
              <p className="text-lg">
                <strong>Статус:</strong>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    setTicket({ ...ticket, status: e.target.value as "Open" | "Closed" | "In Progress" })
                  }
                  className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Open">Нээлттэй</option>
                  <option value="In Progress">Явцтай</option>
                  <option value="Closed">Хаагдсан</option>
                </select>
              </p>
            </div>

            {/* Actions */}
            <div className="ticket-actions space-x-4 flex justify-end">
              <Button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                <strong>Шинэчлэх</strong>
              </Button>
              <Button
                onClick={() => window.history.back()}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                <strong>Буцах</strong>
              </Button>
            </div>

            {/* Success Message */}
            {updatedTicket && (
              <div className="success text-green-500 text-center mt-4">
                <strong>Тасалбар амжилттай шинэчлэгдлээ</strong>
              </div>
            )}
          </div>
        ) : (
          <div className="not-found text-center text-xl text-gray-500">
            <strong>Тасалбар олдсонгүй</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
