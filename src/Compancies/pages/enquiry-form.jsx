"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { useToast } from "../../../hooks/use-toast"

export default function EnquiryForm({ title = "Get in Touch", businessId }) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success message
      toast({
        title: "Enquiry Sent!",
        description: "We'll get back to you as soon as possible.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your enquiry couldn't be sent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>We'll get back to you within 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
          </div>
          <div className="space-y-2">
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              type="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone"
              type="tel"
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              required
            />
          </div>
          <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
            <Send className="h-4 w-4" />
            {isSubmitting ? "Sending..." : "Send Enquiry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

