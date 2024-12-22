"use client"
import React, { useState, useEffect } from "react";
import { fetchUserList, createTicket } from "@/lib/services";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
// import {
//     Select,å
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select"
interface User {
  id: number;
  username: string;
}

const TicketCreate: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Low",
    assigned_to: null as number | null,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch users for the select input when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = await fetchUserList();
        setUsers(usersList);
      } catch (error) {
        setError(`${error}`);
      }
    };

    fetchUsers();
  }, []);

  // Handle form input changes (for all input types)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // Reset previous error if any

    try {
      // Call the createTicket function from service.ts
      await createTicket(formData);
      alert("Ticket created successfully!");
      setFormData({
        title: "",
        description: "",
        status: "Open",
        priority: "Low",
        assigned_to: null,
      });
    } catch (error) {
      setError("Error creating ticket.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create Ticket</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
           {/* <Select name="status" value={formData.status} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type</SelectLabel>
          <SelectItem value="Open">Open</SelectItem>
          <SelectItem value="Closed">Closed</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select> */}
        </div>

        <div>
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label>Assigned To</label>
          <select
            name="assigned_to"
            value={formData.assigned_to || ""}
            onChange={handleChange}
          >
            <option value="">None</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Ticket"}
        </Button>
      </form>
    </div>
  );
};

export default TicketCreate;
