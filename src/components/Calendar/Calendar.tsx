'use client'
import React, { useState } from 'react'
import CalendarHeader from './CalendarHeader'
import CalendarDay from './CalendarDay'

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <div className="relative grid w-[500px] transform grid-cols-7 gap-5 rounded-lg bg-white p-4 shadow-xl transition-transform duration-700 ease-out hover:scale-105">
      <CalendarHeader
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      {Array.from(
        {
          length: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            0,
          ).getDate(),
        },
        (_, i) => i + 1,
      ).map((day) => (
        <CalendarDay
          key={day}
          day={day}
          month={selectedDate.getMonth()}
          year={selectedDate.getFullYear()}
        />
      ))}
    </div>
  )
}
