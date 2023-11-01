import React, { useState, useEffect } from 'react';

const TopHeader = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const formattedDate = date.toLocaleDateString('en-PH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
    });

    const formattedTime = date.toLocaleTimeString('en-PH', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    return (
        <div className='flex justify-center items-center font-medium py-2 z-50 bg-[#295141] uppercase text-white text-sm text-center md:text-sm lg:text-base 2xl:text-xl'>
            <h1 >{formattedDate} | {formattedTime} Philippine Standard Time (PMT)</h1>
        </div>
    );
}

export default TopHeader