import React, { useState } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarDaysIcon } from '../Icons'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthPickerProps {
  selectedDate: Date
  handleDateChange: (date: Date) => void
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default function MonthPicker({
  selectedDate,
  handleDateChange,
}: MonthPickerProps) {
  const [year, setYear] = useState(selectedDate.getFullYear())
  const [isOpen, setIsOpen] = useState(false)

  const handleMonthSelect = (monthIndex: number) => {
    handleDateChange(new Date(year, monthIndex, 1))
    setIsOpen(false) // Close the popover after selection
  }

  const handleYearChange = (increment: number) => {
    setYear((prevYear) => prevYear + increment)
  }

  return (
    <div className="col-span-7 mb-2 flex items-center justify-between rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-white">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-100"
          >
            <CalendarDaysIcon className="h-4 w-4" />
            {selectedDate.toLocaleString('default', { month: 'long' })}{' '}
            {selectedDate.getFullYear()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-4">
          <div className="mb-4 flex items-center justify-between">
            <Button onClick={() => handleYearChange(-1)} size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-bold">{year}</span>
            <Button onClick={() => handleYearChange(1)} size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <Button
                key={month}
                onClick={() => handleMonthSelect(index)}
                variant={
                  selectedDate.getMonth() === index &&
                  selectedDate.getFullYear() === year
                    ? 'default'
                    : 'outline'
                }
                className="w-full"
              >
                {month.slice(0, 3)}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
