"use client"
import React, { useEffect, useState } from "react";
import TicketTable from "@/components/TicketTable";
import { fetchCreatedTickets } from "@/lib/services";
import TicketSearchPage from "@/components/TicketSearchPage";
import TicketCreate from "@/components/TicketCreate";
const Page: React.FC = () => {
  

  return (
    <div className="p-6">
       <TicketCreate/>
    </div>
  );
};

export default Page;
