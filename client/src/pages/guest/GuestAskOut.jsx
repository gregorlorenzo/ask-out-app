import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import AskOutMessage from '@/components/guest/AskOut/AskOutMessage';
import AskOutActions from '@/components/guest/AskOut/AskOutActions';
import ConfettiEffect from '@/components/guest/AskOut/ConfettiEffect';

export default function GuestAskOut() {
    const [isAccepted, setIsAccepted] = useState(false);
    const [isDeclined, setIsDeclined] = useState(false);

    const handleAccept = () => {
        setIsAccepted(true);
    };

    const handleDecline = () => {
        setIsDeclined(true);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Card className="w-full max-w-md bg-zinc-800/90 backdrop-blur-lg border-none shadow-lg p-6 rounded-lg">
                <CardContent className="flex flex-col items-center relative">
                    <AnimatePresence>
                        {isAccepted && <ConfettiEffect />}
                    </AnimatePresence>
                    
                    <AskOutMessage isAccepted={isAccepted} isDeclined={isDeclined} />
                    <AnimatePresence>
                        {!isAccepted && !isDeclined && (
                            <AskOutActions onAccept={handleAccept} onDecline={handleDecline} />
                        )}
                        {isDeclined && (
                            <p className="mt-4 text-zinc-400 text-center">
                                Oh no! Maybe next time! 😢
                            </p>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}