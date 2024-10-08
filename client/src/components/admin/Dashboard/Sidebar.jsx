import React, { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LayoutDashboard,
  FileQuestion,
  FileText,
  Presentation,
  Menu,
  LogOut,
  User,
  Settings,
  Projector,
} from "lucide-react";
import { useAuth } from '@/hooks/useAuth';

const SidebarItem = ({ icon: Icon, children, to, onClick, isCollapsed }) => {
  const location = useLocation();
  const isActive = to === '/dashboard'
    ? location.pathname === '/dashboard'
    : location.pathname.startsWith(to) && to !== '/dashboard';

  const content = (
    <>
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span className="ml-2 transition-opacity duration-200">{children}</span>}
    </>
  );
  const buttonClass = cn(
    "w-full justify-start transition-colors hover:bg-zinc-700/50 dark:hover:bg-zinc-700/50 hover:text-zinc-50 dark:hover:text-zinc-50",
    isActive && "bg-zinc-700/70 text-zinc-50 dark:bg-zinc-700/70 dark:text-zinc-50",
    isCollapsed ? "px-2" : "px-4"
  );
  if (to) {
    return (
      <Button asChild variant="ghost" className={buttonClass}>
        <Link to={to} className="flex items-center">
          {content}
        </Link>
      </Button>
    );
  }
  return (
    <Button variant="ghost" className={buttonClass} onClick={onClick}>
      <div className="flex items-center">
        {content}
      </div>
    </Button>
  );
};

const GuestAccordionItem = ({ isCollapsed }) => {
  if (isCollapsed) {
    return (
      <SidebarItem icon={User} to="/dashboard/guest" isCollapsed={isCollapsed} title="Guest (has sub-items)">
        Guest
      </SidebarItem>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="guest" className="border-b-0">
        <AccordionTrigger
          className={cn(
            "flex items-center py-2 px-4 w-full justify-between transition-colors hover:bg-zinc-700/50 dark:hover:bg-zinc-700/50 hover:text-zinc-50 dark:hover:text-zinc-50",
            "[&>svg]:ml-auto [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
            "hover:no-underline"
          )}
        >
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            <span>Guest</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pl-6 space-y-1">
            <SidebarItem icon={Settings} to="/dashboard/guest/maze-config" isCollapsed={isCollapsed}>
              Maze Configuration
            </SidebarItem>
            <SidebarItem icon={Projector} to="/dashboard/guest/slideshow" isCollapsed={isCollapsed}>
              Slideshow
            </SidebarItem>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();

  return (
    <div className={cn(
      "bg-zinc-800 text-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 h-screen border-r border-zinc-700 dark:border-zinc-700 transition-all duration-300 ease-in-out flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 space-y-4 flex-grow">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && <h2 className="text-2xl font-bold text-zinc-100 dark:text-zinc-100">Dashboard</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hover:bg-zinc-700/50 hover:text-zinc-50 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <nav className="space-y-1">
          <SidebarItem icon={LayoutDashboard} to="/dashboard" isCollapsed={isCollapsed}>
            Home
          </SidebarItem>
          <SidebarItem icon={FileQuestion} to="/dashboard/quiz" isCollapsed={isCollapsed}>
            Quiz
          </SidebarItem>
          <SidebarItem icon={FileText} to="/dashboard/letter" isCollapsed={isCollapsed}>
            Letter
          </SidebarItem>
          <SidebarItem icon={Presentation} to="/dashboard/slide" isCollapsed={isCollapsed}>
            Slide
          </SidebarItem>
          <GuestAccordionItem isCollapsed={isCollapsed} />
        </nav>
      </div>
      <div className="p-4">
        <SidebarItem icon={LogOut} onClick={logout} isCollapsed={isCollapsed}>
          Logout
        </SidebarItem>
      </div>
    </div>
  );
};

export default Sidebar;