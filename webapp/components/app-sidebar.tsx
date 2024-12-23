"use client"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { Button } from "./ui/button"
import { logout } from "@/lib/services"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Assigned Tickets",
    url: "/assigned-tickets",
    icon: Inbox,
  },
  {
    title: "My Tickets",
    url: "/tickets",
    icon: Calendar,
  },
  {
    title: "Create Ticket",
    url: "/create-ticket",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const router = useRouter();
    
      const handleLogout = () => {
        logout(); // Call the logout function
        router.push("/login"); // Redirect to the sign-in page after logging out
      };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg mb-10">My ticketing website</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-md">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Button className="mb-5" onClick={handleLogout}>Logout</Button>
    </Sidebar>
  )
}
