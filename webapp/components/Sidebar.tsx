"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/services";
export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    
      const handleLogout = () => {
        logout(); // Call the logout function
        router.push("/login"); // Redirect to the sign-in page after logging out
      };
  return (
    <aside
      className={cn(
        "fixed z-20 md:static bg-white h-full transition-all duration-300 md:w-64",
        isOpen ? "w-64" : "w-0 overflow-hidden"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 md:hidden">
        <span className="text-lg font-bold">Menu</span>
        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Open"}
        </Button>
      </div>

      {/* Sidebar Links */}
      <nav className="mt-4 p-4 space-y-2">
        <a
          href="/"
          className="block px-4 py-2 rounded-lg hover:bg-gray-200 text-gray-800 font-medium"
        >
          Home
        </a>
        <a
          href="/my-tickets"
          className="block px-4 py-2 rounded-lg hover:bg-gray-200 text-gray-800 font-medium"
        >
          My Tickets
        </a>
        <a
          href="/profile"
          className="block px-4 py-2 rounded-lg hover:bg-gray-200 text-gray-800 font-medium"
        >
          Profile
        </a>
       
        <Button onClick={handleLogout} className="mt-1">Logout</Button>
        
      </nav>
    </aside>
  );
}
