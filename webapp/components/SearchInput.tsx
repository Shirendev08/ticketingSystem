// "use client";
// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { searchTickets } from "@/lib/services";
// // Define a type for the search results
// interface Ticket {
//   id: number;
//   title: string;
//   description: string;
//   status: "Open" | "Closed" | "In Progress";
//   priority: "Low" | "Medium" | "High";
//   created_at: string; // ISO string for the datetime
//   updated_at: string; // ISO string for the datetime
//   created_by: string; // Username of the ticket creator
//   assigned_to: string | null; // Username of the assigned user, null if unassigned
// }

// interface SearchInputProps {
//   onSearchResults: (results: Ticket[]) => void; // Callback to pass the search results to the parent
// }

// export const SearchInput: React.FC<SearchInputProps> = ({ onSearchResults }) => {
//   const [searchQuery, setSearchQuery] = useState(""); // Local state for search query

//   // Handle change in search input
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   // Handle search button click
//   const handleSearch = async () => {
//     try {
//       const results = await searchTickets({ title: searchQuery }); // Search by title
//       onSearchResults(results); // Pass the results to the parent component
//     } catch (error) {
//       console.error("Search failed:", error);
//     }
//   };

//   return (
//     <div className="flex items-center space-x-2">
//       <Input
//         type="text"
//         value={searchQuery}
//         onChange={handleSearchChange} // Update the state when the input changes
//         placeholder="Search tickets..."
//         className="flex-grow"
//       />
//       <Button className="text-white" onClick={handleSearch}>
//         Search
//       </Button>
//     </div>
//   );
// };
