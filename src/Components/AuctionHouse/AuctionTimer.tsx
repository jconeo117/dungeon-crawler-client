import React, { useState, useEffect } from 'react';

interface AuctionTimerProps {
  endTime: Date | string;
}

const formatTime = (ms: number) => {
    if (ms <= 0) return { text: 'Finalizado', color: 'text-red-500' };

    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;

    let text = '';
    if (days > 0) text = `${days}d ${hours}h`;
    else if (hours > 0) text = `${hours}h ${minutes}m`;
    else if (minutes > 0) text = `${minutes}m ${seconds}s`;
    else text = `${seconds}s`;

    let color = 'text-gray-400';
    if (minutes < 5 && hours === 0 && days === 0) color = 'text-yellow-500';
    if (minutes < 1 && hours === 0 && days === 0) color = 'text-red-500';

    return { text, color };
};

const AuctionTimer: React.FC<AuctionTimerProps> = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState(new Date(endTime).getTime() - new Date().getTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(new Date(endTime).getTime() - new Date().getTime());
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    const { text, color } = formatTime(timeLeft);

    return (
        <span className={`font-semibold text-sm px-2 py-1 rounded ${color}`}>
            {text}
        </span>
    );
};

export default AuctionTimer;

