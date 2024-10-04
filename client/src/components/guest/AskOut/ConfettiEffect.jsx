import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/useWindowSize';

export default function ConfettiEffect() {
    const { width, height } = useWindowSize();

    const zincColors = [
        '#f4f4f5', // zinc-100
        '#e4e4e7', // zinc-200
        '#d4d4d8', // zinc-300
        '#a1a1aa', // zinc-500
        '#71717a', // zinc-700
        '#52525b', // zinc-600
        '#3f3f46', // zinc-800
    ];

    return (
        <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={300}
            colors={zincColors}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
}