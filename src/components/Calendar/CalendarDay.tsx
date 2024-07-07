import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CalendarDayProps {
  day: number
  month: number
  year: number
}

interface DiaryEntry {
  title: string
  content: string
  mood: string
  tags: string[]
}

const moodOptions = [
  '😊 Happy',
  '😐 Neutral',
  '😢 Sad',
  '😠 Angry',
  '😌 Relaxed',
]

export default function CalendarDay({ day, month, year }: CalendarDayProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [diaryEntry, setDiaryEntry] = useState<DiaryEntry>({
    title: '',
    content: '',
    mood: '',
    tags: [],
  })
  const [hasEntry, setHasEntry] = useState(false)
  const [tagInput, setTagInput] = useState('')

  const dateKey = `diary-${year}-${month + 1}-${day}`

  useEffect(() => {
    const savedEntry = localStorage.getItem(dateKey)
    if (savedEntry) {
      setDiaryEntry(JSON.parse(savedEntry))
      setHasEntry(true)
    }
  }, [dateKey])

  const handleSave = () => {
    localStorage.setItem(dateKey, JSON.stringify(diaryEntry))
    setHasEntry(true)
    setIsOpen(false)
  }

  const handleAddTag = () => {
    if (tagInput && !diaryEntry.tags.includes(tagInput)) {
      setDiaryEntry((prev) => ({ ...prev, tags: [...prev.tags, tagInput] }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setDiaryEntry((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`flex aspect-square transform items-center justify-center rounded-md bg-white text-gray-700 shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_15px_rgba(0,0,0,0.2)] ${
          hasEntry
            ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white'
            : 'from-blue-400 to-purple-500 hover:bg-gradient-to-br hover:text-white'
        } group relative cursor-pointer overflow-hidden`}
      >
        <span className="relative z-10">{day}</span>
        <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-30"></div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="rounded-lg bg-white shadow-2xl sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="mb-4 text-3xl font-bold text-gray-800">
              {`${month + 1}/${day}/${year}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label
                htmlFor="title"
                className="text-lg font-semibold text-gray-700"
              >
                Title
              </Label>
              <Input
                id="title"
                value={diaryEntry.title}
                onChange={(e) =>
                  setDiaryEntry((prev) => ({ ...prev, title: e.target.value }))
                }
                className="mt-1"
                placeholder="Give your entry a title..."
              />
            </div>
            <div>
              <Label
                htmlFor="content"
                className="text-lg font-semibold text-gray-700"
              >
                Entry
              </Label>
              <Textarea
                id="content"
                value={diaryEntry.content}
                onChange={(e) =>
                  setDiaryEntry((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                placeholder="Write your thoughts for the day..."
                className="mt-1 min-h-[150px]"
              />
            </div>
            <div>
              <Label
                htmlFor="mood"
                className="text-lg font-semibold text-gray-700"
              >
                Mood
              </Label>
              <Select
                value={diaryEntry.mood}
                onValueChange={(value) =>
                  setDiaryEntry((prev) => ({ ...prev, mood: value }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your mood" />
                </SelectTrigger>
                <SelectContent>
                  {moodOptions.map((mood) => (
                    <SelectItem key={mood} value={mood}>
                      {mood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="tags"
                className="text-lg font-semibold text-gray-700"
              >
                Tags
              </Label>
              <div className="mt-1 flex">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag..."
                  className="flex-grow"
                />
                <Button onClick={handleAddTag} className="ml-2">
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {diaryEntry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-blue-800 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSave}
              className="rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 text-white transition-all duration-300 ease-out hover:from-blue-600 hover:to-purple-700"
            >
              Save Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
