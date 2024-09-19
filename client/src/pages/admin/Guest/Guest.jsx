import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Projector, Gamepad } from "lucide-react";

const Guest = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Guest Configuration</h1>
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Projector className="mr-2" />
                            Slideshow Configuration
                        </CardTitle>
                        <CardDescription>
                            Manage and customize the slideshow for guests
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link to="/dashboard/guest/slideshow">
                                Go to Slideshow Configuration
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Gamepad className="mr-2" />
                            Maze Configuration
                        </CardTitle>
                        <CardDescription>
                            Set up and modify the Maze experience for guests
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link to="/dashboard/guest/maze-config">
                                Go to Maze Configuration
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Guest;