// types.ts (or your types file)
export interface TicketStat {
    status: string;
    count: number;
  }
  
  export interface TicketStats {
    created_by_user: {
      tickets_by_status: TicketStat[];
      tickets_per_month: { month: string; count: number }[];
      tickets_by_priority: TicketStat[];
      total_tickets: number;
    };
    assigned_to_user: {
      tickets_by_status: TicketStat[];
      tickets_per_month: { month: string; count: number }[];
      tickets_by_priority: TicketStat[];
      total_tickets: number;
    };
  }
  