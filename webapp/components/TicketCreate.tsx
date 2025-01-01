"use client";
import React, { useState, useEffect } from "react";
import { fetchUserList, createTicket } from "@/lib/services";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: number;
  username: string;
}

const TicketCreate: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Нээлттэй",
    priority: "Бага",
    assigned_to: null as number | null,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = await fetchUserList();
        setUsers(usersList);
      } catch (error) {
        setError("Хэрэглэгчдийн жагсаалтыг татахад алдаа гарлаа.");
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await createTicket(formData);
      alert("Санал хүсэлт амжилттай үүсгэгдлээ!");
      setFormData({
        title: "",
        description: "",
        status: "Нээлттэй",
        priority: "Бага",
        assigned_to: null,
      });
    } catch (error) {
      setError("Санал хүсэлт үүсгэхэд алдаа гарлаа.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl w-full p-6 bg-white rounded-lg shadow-lg w-[800px] ml-[400px] mt-[120px]">
      <h2 className="text-3xl font-semibold mb-6 text-center">Санал хүсэлт үүсгэх</h2>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium mb-2">Гарчиг</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-medium mb-2">Тайлбар</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="text-lg font-medium mb-2">Төлөв</label>
          <Select
            value={formData.status}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger disabled className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Төлөв сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Төлөв</SelectLabel> */}
                <SelectItem value="Нээлттэй">Нээлттэй</SelectItem>
                {/* <SelectItem value="Хаагдсан">Хаагдсан</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="priority" className="text-lg font-medium mb-2">Чухал байдал</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Бага">Бага</option>
            <option value="Дундаж">Дундаж</option>
            <option value="Өндөр">Өндөр</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="assigned_to" className="text-lg font-medium mb-2">Хариуцагч</label>
          <select
            name="assigned_to"
            value={formData.assigned_to || ""}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Сонгоогүй</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-4 text-white rounded-md shadow-md transition duration-300"
        >
          {isSubmitting ? "Үүсгэж байна..." : "Үүсгэх"}
        </Button>
      </form>
    </div>
  );
};

export default TicketCreate;
