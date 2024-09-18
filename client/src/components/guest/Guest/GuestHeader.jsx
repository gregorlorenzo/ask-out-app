import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';

const GuestHeader = () => {
    const { logout } = useAuth();

    return (
        <header className="absolute top-0 right-0 p-2 sm:p-4 z-10">
            <Button
                variant="ghost"
                onClick={logout}
                className="text-white hover:bg-white/20 text-sm sm:text-base"
            >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                Logout
            </Button>
        </header>
    );
};

export default GuestHeader;