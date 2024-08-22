'use client'

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/utils/cn.utils" 

const initialTodos = [
  { id: "1", text: "Set up Supabase in your Next.js project" },
  { id: "2", text: "Add Supabase environment variables" },
  { id: "3", text: "Edit the login and signup pages if needed" },
  { id: "4", text: "Implement OAuth authentication with Supabase" },
  { id: "5", text: "Add user profile information" },
  { id: "6", text: "Test the authentication flow" },
  { id: "7", text: "Deploy the application with Supabase authentication" },
]

export default function Todo() {
  const [completedTodos, setCompletedTodos] = useState([])

  const toggleTodo = (id) => {
    setCompletedTodos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md p-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Supabase Auth Setup Checklist</h2>
        <ul className="space-y-4">
          {initialTodos.map((todo) => (
            <li key={todo.id} className="flex items-center space-x-4">
              <Checkbox
                id={todo.id}
                checked={completedTodos.includes(todo.id)}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <label
                htmlFor={todo.id}
                className={cn(
                  "text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  completedTodos.includes(todo.id) && "line-through text-gray-400"
                )}
              >
                {todo.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
