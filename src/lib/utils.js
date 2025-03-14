import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const fetcher = async (url) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
  const response = await fetch(`${baseUrl}${url}`)
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  return response.json()
} 