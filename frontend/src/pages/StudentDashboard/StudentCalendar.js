import React, { useState } from 'react';
import './AttendanceCalendar.css';

const StudentCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const generateCalendar = (year, month) => {
        const calendar = [];
        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let firstDayOfWeek = firstDayOfMonth.getDay();
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

        for (let i = 0; i < firstDayOfWeek; i++) {
            calendar.push(<div key={`empty-${i}`} className="empty-date"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            let dateBlockClass = '';
            if (currentDate.toDateString() === date.toDateString()) {
                dateBlockClass += ' current-date';
            }
            if (selectedDate && selectedDate.toDateString() === date.toDateString()) {
                dateBlockClass += ' selected-date';
            }
            calendar.push(
                <div
                    key={day}
                    className={`date-block ${dateBlockClass}`}
                    onClick={() => handleDateClick(date)}
                >
                    {day}
                </div>
            );
        }
        return calendar;
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        // Add any other logic you need to handle date click
        console.log(`Date clicked: ${date.toDateString()}`);
    };

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const handleMonthChange = (offset) => {
        const newDate = new Date(currentYear, currentMonth + offset, 1);
        setCurrentDate(newDate);
    };

    const handleYearChange = (offset) => {
        const newDate = new Date(currentYear + offset, currentMonth, 1);
        setCurrentDate(newDate);
    };

    return (
        <div className="attendance-calendar">
            <div className='calendar-container'>
                <div className='calendar-header'>
                    <button
                        className="year-nav"
                        onClick={() => handleYearChange(-1)}
                    >
                        &lt;&lt;
                    </button>
                    <button
                        className="month-nav"
                        onClick={() => handleMonthChange(-1)}
                    >
                        &lt;
                    </button>
                    <h2 className='month-name'>{currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h2>
                    <button
                        className="month-nav"
                        onClick={() => handleMonthChange(1)}
                    >
                        &gt;
                    </button>
                    <button
                        className="year-nav"
                        onClick={() => handleYearChange(1)}
                    >
                        &gt;&gt;
                    </button>
                </div>
                <div className="header-blocks">
                    <div className="head-block">Mon</div>
                    <div className="head-block">Tue</div>
                    <div className="head-block">Wed</div>
                    <div className="head-block">Thu</div>
                    <div className="head-block">Fri</div>
                    <div className="head-block">Sat</div>
                    <div className="head-block">Sun</div>
                </div>
                <div className="calendar-grid">{generateCalendar(currentYear, currentMonth)}</div>
            </div>
        </div>
    );
};

export default StudentCalendar;
