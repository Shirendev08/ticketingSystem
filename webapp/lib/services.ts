
import Cookies from "js-cookie";
export async function login(username: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (res.ok) {
    const data = await res.json();
    // Store tokens in cookies
    Cookies.set("accessToken", data.access);
    Cookies.set("refreshToken", data.refresh);

    return data;
  } else {
    throw new Error("Login failed");
  }
}
export async function register(username: string, email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username,email,password }),
  });

  if (res.ok) {
    const data = await res.json();
    // Store tokens in cookies
    return data;
  } else {
    throw new Error("register failed");
  }
}


export async function logout() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }



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
  
  type TicketStats = {
    solved: number; // Count of solved tickets
    total: number; // Total tickets
    tickets: Ticket[]; // List of tickets
  };

  export async function fetchTicketStats() {
    const token = Cookies.get("accessToken");
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diagrams/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to fetch ticket stats");
    }
  }

  
  export async function fetchCreatedTickets() {
    const token = Cookies.get("accessToken");
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to fetch created tickets");
    }
  }
  
  // Fetch tickets assigned to the user
  export async function fetchAssignedTickets() {
    const token = Cookies.get("accessToken");
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/assigned/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to fetch assigned tickets");
    }
  } 


  export async function fetchUserList() {
    const token = Cookies.get("accessToken");
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to fetch user list");
    }
  }
  
  export async function createTicket(ticketData: {
    title: string;
    description: string;
    status: string;
    priority: string;
    assigned_to: number | null;
  }) {
    const token = Cookies.get("accessToken");
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ticketData),
    });
  
    if (res.ok) {
      const data = await res.json();
      return data; // Return the created ticket data
    } else {
      throw new Error("Failed to create ticket");
    }
  }  

  

  export async function updateAssignedTicket(ticketId: number, ticketData: {
    title: string;
    description: string;
    status: "Open" | "Closed" | "In Progress";
    priority: "Low" | "Medium" | "High";
    assigned_to: string | null;
  }) {
    const token = Cookies.get("accessToken");
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/assigned/${ticketId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ticketData),
    });
  
    if (res.ok) {
      const data = await res.json();
      return data; // Return the updated ticket data
    } else {
      throw new Error("Failed to update ticket");
    }
  }  

  export async function fetchTicketDetails(ticketId: number) {
    const token = Cookies.get("accessToken");
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/assigned/${ticketId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (res.ok) {
      const data = await res.json();
      return data; // Return the ticket data
    } else {
      throw new Error("Failed to fetch ticket details");
    }
  }  

  export async function searchTickets(queryParams: {
    assigned_to?: string;
    created_by?: string;
    title?: string;
  }) {
    const token = Cookies.get("accessToken");
    
    // Build query string from queryParams object
    const queryString = new URLSearchParams(queryParams).toString();
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (res.ok) {
      const data = await res.json();
      return data; // Return the list of tickets
    } else {
      throw new Error("Failed to search tickets");
    }
  }
  